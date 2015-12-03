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
        $scope.rating = "";
        
        var newPlace = function(place) {
            return {
                place : {
                    rainy: 0,
                    cloudy: 0,
                    sunny: 0
                }
            }
        };

        $scope.address = {}
        
        $scope.address.rainy = 0;
        $scope.address.cloudy = 0;
        $scope.address.sunny = 0;
        
        $scope.addressGet = function() {
            if ($scope.chosenPlace) {
                var ref = new Firebase("https://blazing-torch-6786.firebaseio.com/addresses");
                ref.once("value", function(snapshot) {
                    var valu = snapshot.child($scope.chosenPlace).val()
                    if (snapshot.child($scope.chosenPlace).exists()) {
                        // var addr = $firebaseObject(ref.child($scope.chosenPlace));
                        // addr.$bindTo($scope, 'address');
                        console.log(valu)

                        $scope.address.rainy = valu.rainy
                        $scope.address.cloudy = valu.cloudy
                        $scope.address.sunny = valu.sunny
                        $scope.$apply();
                    } else {
                        console.log("Not in database: " + $scope.chosenPlace)
                        ref.child($scope.chosenPlace).set($scope.chosenPlace)
                        ref.child($scope.chosenPlace).set({
                            rainy: 0,
                            cloudy: 0,
                            sunny: 0
                        })
                    }
                })
            }
        };
    });
