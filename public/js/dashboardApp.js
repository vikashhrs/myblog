var app = angular.module("myApp", ["ngRoute","ui.tinymce"]);

app.controller('MainController', function ($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";

    $scope.getContent = function() {
        console.log('Editor content:', $scope.tinymceModel);
        //console.log($scope.tinymceModel.activeEditor.getContent())
    };

    $scope.setContent = function() {
        $scope.tinymceModel = 'Time: ' + (new Date());
    };

    $scope.tinymceOptions = {
        plugins: 'link image code',
        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
    };

    tinyMCE.init({
        // General options
        mode : "specific_textareas",
        editor_selector : "tinymce"
    });

    $scope.content = function() {
// Get the HTML contents of the currently active editor
        console.debug(tinyMCE.activeEditor.getContent());
//method1 getting the content of the active editor
        alert(tinyMCE.activeEditor.getContent());
//method2 getting the content by id of a particular textarea
        alert(tinyMCE.get('myarea1').getContent());
    }
});