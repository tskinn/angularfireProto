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

        var ref = new Firebase("https://blazing-torch-6786.firebaseio.com/addresses");

        $scope.logout = function() { Auth.$unauth(); };
        $scope.rating = "";

        $scope.address = {
            rainy: 0,
            cloudy: 0,
            sunny: 0
        }
        
        $scope.addressGet = function() {
            if ($scope.chosenPlace) {
                var address = $firebaseObject(ref.child($scope.chosenPlace));
                address.$bindTo($scope, 'address');
                $scope.rainys = address.rainy
                $scope.cloudys = address.cloudy
                $scope.sunnys = address.sunny
            }
        };
    });
