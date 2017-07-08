var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
        .when("/about", {
            templateUrl : "./about.html"
        })
        .when("/work", {
            templateUrl : "./work.html"
        })
        .when("/contact", {
            templateUrl : "./contact.html"
        })
        .when("/blue", {
            templateUrl : "blue.htm"
        });
});


app.controller('MainController', function($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
    console.log("Working");
});