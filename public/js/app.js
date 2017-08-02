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


app.run(function ($cookies, $rootScope,$http) {
    // if ($cookies.get('currentPostId')) {
    //     $rootScope.currentPostId = $cookies.get('currentPostId');
    //     console.log($cookies.get("currentPostId"));
    //
    //     $http.get('/get-me-my-post',{headers : {postId : $cookies.get("currentPostId")}}).then(function (response) {
    //         //$rootScope.currentPost = response.data;
    //         console.log(response);
    //
    //     },function (err) {
    //
    //     });
    // }else{
    //     console.log("No Cookie Present");
    // }
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
        //console.log("setting post"+ JSON.stringify(post));

        console.log("Setting cookies");
        $cookies.put("currentPostId",post._id);

        //$rootScope.currentPost = post;
    }
});

app.controller('ExpandController',function($scope,$rootScope,$cookies,$http){
    console.log("Loading Expand Controller");

    $http.get('/get-me-my-post',{headers : {postId : $cookies.get("currentPostId")}}).then(function (response) {
        //$rootScope.currentPost = response.data;
        console.log(response);
        $scope.body = response.data.body;
    },function (err) {

    });

});