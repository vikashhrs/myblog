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
            templateUrl: "./blogs.html"
        })
        .when("/expand", {
            templateUrl: "./single.html"
        })
        .when("/dashboard", {
        templateUrl: "./dashboard.html"
    });

});


app.controller('MainController', function ($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
    console.log("Working");
});