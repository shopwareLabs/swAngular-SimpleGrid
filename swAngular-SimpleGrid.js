angular.module('swAngularSimpleGrid', [])
    .directive('swAngularSimpleGrid', function () {
        return {
            restrict: "A",
            replace: true,
            transclude: false,
            scope: {
                list: '=ngModel',
                options: '=swOptions'
            },
            templateUrl: "/directives/swAngular-SimpleGrid/swAngular-SimpleGrid.html",
            link: function ($scope, $element, $attrs) {
                for (var fieldKey in $scope.options.fields) {
                    if (typeof $scope.options.fields[fieldKey].renderer !== 'function') {
                        $scope.options.fields[fieldKey].renderer = function (input, row) {
                            return input;
                        }
                    }
                }
            }
        };
    })
;