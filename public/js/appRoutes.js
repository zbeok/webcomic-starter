angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/comic.html',
			controller: 'ComicController'
		})

		.when('/about', {
			templateUrl: 'views/about.html',
			controller: 'AboutController'
		})

		.when('/archive', {
			templateUrl: 'views/archive.html',
			controller: 'ArchiveController'	
		})

		.when('/comic', {
			templateUrl: 'views/comic.html',
			controller: 'ComicController',
		})

		.when('/support', {
			templateUrl: 'views/support.html',
			controller: 'SupportController'	
		});

	$locationProvider.html5Mode(true);

}]);