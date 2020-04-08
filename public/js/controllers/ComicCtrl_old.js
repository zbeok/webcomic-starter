angular.module('ComicCtrl', []).controller('ComicController', function($scope,$http,$routeParams) {

	$scope.chapter=$routeParams.chapter;
	$scope.page=$routeParams.page;
	$scope.pp = "";
	$scope.np = "";
	$scope.tagline = 'pages '+ $scope.chapter + $scope.page;	
	var img = document.createElement("img");
	var data = "";


	function URLify(ch,p){
		return "/comic?chapter="+ch+"&page="+p;
	}

	$scope.getpage = function (pflag=false){
		pch=$scope.chapter;
		if (pflag) {
			if ($scope.page==1) {
				if (pch==1) {
					return("");
				}
				pch--;
				$http.get("api/qp?chapter="+pch).then(function(res,req) {
					pp=res.data;
					return URLify(pch,pp);
				});
			} else {
				return URLify(pch,$scope.page-1);
			}
		}

		$http.get("api/qp?chapter="+pch).then(function(res,req) {
			pp=res.data;
			console.log(pch,pp);
			if ($scope.page<pp) {
				return URLify(pch,$scope.page+1);	
			} else {
				pch++;
				$http.get("api/qp?chapter="+pch+"&page=1").then(function(res,req) {
					if (res.data) {
						return URLify(pch,1);		
					} 
					return URLify(0,0);	
				});
			}
		});

	};
	if ($scope.chapter==null) {
		$http.get("api/qp").then(function(res,req) {
			$scope.chapter = res.data;

			$http.get("api/qp?chapter="+$scope.chapter).then(function(res,req) {
				$scope.page = res.data;
	var send =  "api/comic?chapter="+$scope.chapter+"&page="+$scope.page; 
	img.src = send;
				$scope.pp = $scope.getpage(true);
				$scope.np = $scope.getpage();
				console.log($scope.pp,$scope.np,"WOWOWOWO");
			});
		});
	} else {
		console.log("WOW");
		$scope.pp = $scope.getpage(true);
		$scope.np = $scope.getpage();
	}
	// $http.get(send).then( function(res,req) {
	// 	console.log(send);
	// 	data=res.data;
	// 	img.src = send;
	// 	var tgt = document.getElementById("img");
	// 	tgt.appendChild(img);
	// });
	// img.src = "assets/"+ $scope.chapter + "/"+$scope.page+".png";	
	var tgt = document.getElementById("img");
	tgt.appendChild(img);
	/**
	*  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
	*  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/
	/*
	var disqus_config = function () {
	this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
	this.page.identifier = launch; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
	};
	*/

	(function() { // DON'T EDIT BELOW THIS LINE
	var d = document;
	var s = d.createElement('script');
	s.src = '//snerkflerks.disqus.com/embed.js';
	s.setAttribute('data-timestamp', +new Date());
	(d.head || d.body).appendChild(s);
	})();
});