angular.module('ContactCtrl', []).controller('ContactController', function($scope) {

	$scope.subForm= function (){
    $.ajax({
        url:'/email',
        type:'post',
        data:$('#myForm').serialize(),
        success:function(){
            console.log("worked");
        }
    });
}
});