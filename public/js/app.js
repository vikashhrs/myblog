var app = angular.module("myApp", ["ngRoute", "ngCookies"]);



app.filter('unsafe', function ($sce) {
    return function (val) {
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
            templateUrl: "./contact.html",
            controller: "ContactController"
        })
        .when("/", {
            templateUrl: "./blogs.html",
            controller: "BlogsController"
        })
        .when("/expand", {
            templateUrl: "./single.html",
            controller: "ExpandController"
        });

});


app.run(function ($cookies, $rootScope, $http) {
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

app.controller('BlogsController', function ($scope, $http, $rootScope, $cookies) {
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
        $cookies.put("currentPostId", post._id);

        //$rootScope.currentPost = post;
    }
});

app.controller('ExpandController', function ($scope, $rootScope, $cookies, $http) {
    console.log("Loading Expand Controller");

    $http.get('/get-me-my-post', { headers: { postId: $cookies.get("currentPostId") } }).then(function (response) {
        //$rootScope.cur rentPost = response.data;
        console.log(response);
        $scope.body = response.data.body;
    }, function (err) {

    });

});

app.controller('ContactController', function ($scope,$http) {
    
    console.log("Contact Controller loaded");
    
    $scope.saveMessage = function () {
        $scope.alertDisplay = false;
        $scope.alertSuccess = false;
        var user = {
            email: $scope.email,
            name: $scope.name,
            message: $scope.message
        };
        console.log(user);
        if (!user.name && !user.email && !user.message) {
            $scope.alertDisplay = true;
            $scope.alertMessage = "All Fields Required to Send a Message";
        }else if(!user.email){
            $scope.alertDisplay = true;
            $scope.alertMessage = "Please Enter a Valid Email";
        }else if(!user.message){
            $scope.alertDisplay = true;
            $scope.alertMessage = "Message Cannot be Empty";
        }
        else if(!user.name){
            $scope.alertDisplay = true;
            $scope.alertMessage = "Please Enter Your Good Name";
        }
         else {
            if (!validateEmail(user.email)) {
                console.log("Wrong email");
                $scope.alertDisplay = true;
                $scope.alertMessage = "Please Enter a Valid Email";
            } else {
                $scope.alertDisplay = false;
                $scope.alertSuccess = true;
                $http.post('/save-user-message', { data: user }).then(
                    function (response) {
                        console.log(response);
                        $scope.alertSuccessMessage = response.data.message;
                    }, function (err) {
                        console.log(err);
                    });
            }
        }


        function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    }
    
})