'use strict';

/**
 * @ngdoc directive
 * @name protoMnKApp.directive:googleplace
 * @description
 * # googleplace
 */
angular.module('protoMnKApp')
    .directive('googleplace', function () {
        return {
            require: 'ngModel',
            scopde: {
                ngModel: '=',
                details: '=?'
            },
            link: function(scope, element, attrs, model) {
                var options = {
                    types: [
                        'address',
//                        'establishment'
                    ],
                    componentRestrictions: {}
                };
                scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

                google.maps.event.addListener(scope.gPlace, 'place_changed', function(){
                    scope.$apply(function() {
                        scope.details = scope.gPlace.getPlace();
                        model.$setViewValue(element.val());
                    });
                });
            }
            // template: '<div></div>',
            // restrict: 'E',
            // link: function postLink(scope, element, attrs) {
            //     element.text('this is the googleplace directive');
            // }
        };
    });

// function MyCtrl($scope) {
//     $scope.gPlace;
// }
