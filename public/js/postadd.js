var app = angular.module("PostAddApp", []);

app.controller('PostAddController', function ($scope) {

    $scope.addPost = function (post) {
        console.log(post);
    };
    console.log("Working")
});/**
 * Created by Vikash Kumar Sharma on 25-07-2017.
 */
