'use strict';

/**
 * @ngdoc function
 * @name protoMnKApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the protoMnKApp
 */
angular.module('protoMnKApp')
    .controller('MainCtrl', function ($scope, user, Auth, Ref, $firebaseObject, $timeout) {
        $scope.gPlace;
        $scope.user = user.google.displayName;

        $scope.logout = function() { Auth.$unauth(); };
//        $scope.rating = "";
    });
