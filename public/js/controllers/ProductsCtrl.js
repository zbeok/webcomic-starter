angular.module('ArchiveCtrl', []).controller('ArchiveController', function($scope,$http) {
	
	var tgt = document.getElementById("tgt");
	$http.get("api/dict").then(function(res,req) {
		for (var i=0;i<res.data.length;i++) {
			var ch = document.createElement("div");
			ch.className="ch";
			var chref = document.createElement("a");
			chref.innerHTML="<p>CH "+i+"</p>";
			chref.href=URLify(i,1);
			ch.appendChild(chref);
			tgt.appendChild(ch);
			for (var j=0;j<res.data[i];j++){
				var pg = document.createElement("div");
				pg.className="pg";
				var pgref = document.createElement("a");
				pgref.innerHTML="<p>"+j+"</p>";
				pgref.href=URLify(i,j);
				pg.appendChild(pgref);
				ch.appendChild(pg);
			}
		} 
		//set the img 

	});
	function URLify(ch,p){
		return "/comic?chapter="+ch+"&page="+p;
	}

});