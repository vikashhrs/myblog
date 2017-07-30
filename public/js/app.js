var app = angular.module("myApp", ["ngRoute", "ngCookies"]);



app.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});


app.config(function ($routeProvider) {
    $routeProvider
        .when("/about", {
            templateUrl: "./about.html"
        })
        .when("/work", {
            templateUrl: "./work.html"
        })
        .when("/contact", {
            templateUrl: "./contact.html"
        })
        .when("/", {
            templateUrl: "./blogs.html",
            controller : "BlogsController"
        })
        .when("/expand", {
            templateUrl: "./single.html",
            controller : "ExpandController"
        });

});


app.run(function ($cookies, $rootScope) {
    if ($cookies.get('currentPost')) {
        $rootScope.currentPost = $cookies.getObject('currentPost');
    }
});


app.controller('MainController', function ($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";

    console.log("Working");
});

app.controller('BlogsController', function ($scope,$http,$rootScope,$cookies) {
    $http({
        method: 'GET',
        url: '/get/all/posts'
    }).then(function successCallback(response) {
        console.log(response.data.results);
        $scope.posts = response.data.results;
        $rootScope.posts = response.data.results;
    }, function errorCallback(response) {

    });

    $scope.setPost = function (post) {
        console.log("setting post"+ JSON.stringify(post));

        $cookies.put("currentPost",JSON.stringify(post));

        $rootScope.currentPost = post;

    }
});

app.controller('ExpandController',function($scope,$rootScope,$cookies){

    $scope.body = $rootScope.currentPost.body;

});