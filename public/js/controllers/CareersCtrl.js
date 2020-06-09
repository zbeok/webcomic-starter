angular.module('ComicCtrl', []).controller('ComicController', function($scope,$http,$routeParams) {

	$scope.chapter=Number($routeParams.chapter);
	$scope.page=Number($routeParams.page);
	$scope.pp = "";
	$scope.np = "";
	$scope.tagline = 'pages '+ $scope.chapter + $scope.page;	
	var img = document.createElement("img");
	var data = "";
	var tgt = document.getElementById("img");
	tgt.appendChild(img);


	$http.get("api/dict").then(function(res,req) {
		if (isNaN($scope.chapter)) { //set to the last page if this is the home comic host
			$scope.chapter = res.data.length-1;
			$scope.page = res.data[$scope.chapter]-1;
		} 
		//set the img 
		var send =  "api/comic?chapter="+$scope.chapter+"&page="+$scope.page; 
		img.src = send;
		// set prev pagination
		var pch = $scope.chapter;
		var pp = $scope.page-1;
		if (pp<0) { //first page of chapter, go to prev chapter
			pch = $scope.chapter-1;
			pp = res.data[pch]-1;
			if (pch<0) { // first page of comic, go back to first page
				pch=0;
				pp=0; 
			}
		}
		$scope.pp =URLify(pch,pp); 
		//set next pagination
		var nch = $scope.chapter;
		var np = $scope.page+1;
		if (np>=res.data[nch]) { //next chapter!
			nch = $scope.chapter+1;
			np = 1;
			if (res.data.length<=nch) { //no more pages,set to the last page
				nch = $scope.chapter;
				np = $scope.page;
			}
		}
		$scope.np =URLify(nch,np); 

		document.addEventListener('keydown', (event) => {
			// alert("yeah!");
	    	if (event.keyCode == 37) { // left arrow
				window.location.replace($scope.pp);
	    	} else if (event.keyCode == 39) { // right arrow
				window.location.replace($scope.np);
	    	}
		})

	});
	function URLify(ch,p){
		return "/comic?chapter="+ch+"&page="+p;
	}
	

	(function() { // DON'T EDIT BELOW THIS LINE
	var d = document;
	var s = d.createElement('script');
	s.src = '//snerkflerks.disqus.com/embed.js';
	s.setAttribute('data-timestamp', +new Date());
	(d.head || d.body).appendChild(s);
	})();

});