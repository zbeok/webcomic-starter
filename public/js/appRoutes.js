angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'HomeController'
		})

		.when('/mission', {
			templateUrl: 'views/mission.html',
			controller: 'MissionController'
		})

		.when('/products', {
			templateUrl: 'views/products.html',
			controller: 'ProductsController'	
		})

		.when('/careers', {
			templateUrl: 'views/careers.html',
			controller: 'CareersController'	
		})
  
		.when('/contact', {
			templateUrl: 'views/contact.html',
			controller: 'ContactController'	
		})
  ;

	$locationProvider.html5Mode(true);

}]);