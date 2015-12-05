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
        $scope.updateUserRating = function() {
            console.log("updatinguserrating");
            
        };
        
        $scope.rating = "";
        $scope.address = {}
        
        $scope.address.rainy = 0;
        $scope.address.cloudy = 0;
        $scope.address.sunny = 0;


        var fbObj = $firebaseObject(Ref);
        var userAddress;// = Ref.child('users/'+user.uid+'/'+$scope.chosenPlace);
        $scope.addressGet = function() {
            fbObj.$destroy();
            console.log(user.uid)
            if ($scope.chosenPlace) {
                //var ref = new Firebase("https://blazing-torch-6786.firebaseio.com/addresses");
                var ref = Ref.child('addresses/' + $scope.chosenPlace)
                ref.once("value", function(snapshot) {
                    if (snapshot.exists()) {
                        $scope.address = snapshot.val()                        
                    } else {
                        ref.set({ rainy: 0, cloudy: 0, sunny: 0})
                    }

                    console.log(snapshot.val())
                });
                // ref.once("value", function(snapshot) {
                //     var valu = snapshot.child($scope.chosenPlace).val()
                //     if (snapshot.child($scope.chosenPlace).exists()) {
                //         $scope.address.rainy = valu.rainy
                //         $scope.address.cloudy = valu.cloudy
                //         $scope.address.sunny = valu.sunny
                //         $scope.$apply();
                //     } else {
                //         console.log("Not in database: " + $scope.chosenPlace)
                //         ref.child($scope.chosenPlace).transaction(function (ob) {
                //             return {
                //                 rainy: 0,
                //                 cloudy: 0,
                //                 sunny: 0
                //             }
                //         });
                //     }                    
                // });
                userAddress = Ref.child('users/'+user.uid+'/'+$scope.chosenPlace);
                console.log(userAddress);
                fbObj = $firebaseObject(userAddress);
                userAddress.once("value", function(snapshot) {
                    if (snapshot.exists()) {
                        fbObj.$bindTo($scope, 'userAddress').then(function() {
                            console.log($scope.userAddress);
                        });

                    } else {
                        userAddress.set({rating: "cloudy"});
                        fbObj.$bindTo($scope, 'userAddress').then(function() {
                            console.log($scope.userAddress);
                        });
                        
                    }
                });
            }
        };
    });
