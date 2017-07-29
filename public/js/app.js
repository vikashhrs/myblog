var app = angular.module("myApp", ["ngRoute"]);
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
            templateUrl: "./single.html"
        });

});


app.controller('MainController', function ($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";

    console.log("Working");
});

app.controller('BlogsController', function ($scope,$http) {
    $http({
        method: 'GET',
        url: '/get/all/posts'
    }).then(function successCallback(response) {
        console.log(response.data.results);
        $scope.posts = response.data.results;
    }, function errorCallback(response) {

    });
});