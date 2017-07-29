var app = angular.module("PostAddApp", []);

app.controller('PostAddController', function ($scope,$http) {

    $scope.addPost = function (post) {
        var timeString = new Date().toString("MMM dd yyyy").split(" ");
        post.dateofcreation = timeString[0]+" "+timeString[1]+" "+timeString[2]+" "+timeString[3];
        $http.post('/postadd/add-a-new-post', {data : post}).then(
            function (response) {
                console.log(response);
        },  function (err) {
                console.log(err);
        });
        console.log(post);
    };
    console.log("Working")
});/**
 * Created by Vikash Kumar Sharma on 25-07-2017.
 */
