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
            template: [
                '<div>',
                '    <table class="table table-condensed table-hover table-striped">',
                '        <thead>',
                '            <tr>',
                '                <th ng-repeat="field in options.fields" style="width: {{field.weight}}%">',
                '                    <a ng-href="">{{field.label}}:</a>',
                '                </th>',
                '            </tr>',
                '        </thead>',
                '        <tbody>',
                '            <tr ng-repeat="entry in list">',
                '                <td ng-repeat="field in options.fields">',
                '                {{field.renderer(entry[field.column], entry)}}',
                '                </td>',
                '                <td ng-repeat="button in options.buttons">',
                '                    <div ng-if="!button.button">',
                '                        <div ng-if="button.glyphicon.length>0">',
                '                            <a ng-click="button.onclick(entry)">',
                '                                <i class="glyphicon glyphicon-{{button.glyphicon}}" title="{{button.label}}"></i>',
                '                            </a>',
                '                        </div>',
                '                        <div ng-if="button.iconPath.length>0">',
                '                            <img ng-src="button.iconPath" alt="{{button.label}}"/>',
                '                        </div>',
                '                    </div>',
                '                    <button ng-if="button.button" ng-click="button.onclick(entry)">',
                '                        <i ng-if="button.glyphicon.length>0" class="glyphicon glyphicon-{{button.glyphicon}}"',
                '                        title="{{button.label}}"></i>',
                '                        <img ng-if="button.iconPath.length>0" ng-src="button.iconPath" alt="{{button.label}}"/>',
                '                        {{button.label}}',
                '                    </button>',
                '                </td>',
                '            </tr>',
                '        </tbody>',
                '    </table>',
                '</div>'
            ].join('\n'),
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