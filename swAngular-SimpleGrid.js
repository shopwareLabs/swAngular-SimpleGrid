var scripts = document.getElementsByTagName("script");
var currentScriptPath = scripts[scripts.length-1].src;

angular.module('swAngularSimpleGrid', [])
    .directive('swAngularSimpleGrid', function () {
        return {
            restrict: "A",
            replace: true,
            transclude: false,
            scope: {
                list: '=ngModel',
                options: '=?swOptions'
            },
            templateUrl: currentScriptPath.substring(0, currentScriptPath.lastIndexOf('/') + 1) + "swAngular-SimpleGrid.html",
            link: function ($scope, $element, $attrs) {
                if (!$scope.options) {
                    $scope.options = {};
                }
                if (!$scope.options.fields && $scope.list.length>0) {
                    $scope.options.fields = [];
                    for (var key in $scope.list[0]) {
                        if ($scope.list[0].hasOwnProperty(key)) {
                            var item = $scope.list[key];
                            if (typeof item == 'function') {
                                continue;
                            }

                            $scope.options.fields.push({label: key, column: key});
                        }
                    }
                }

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