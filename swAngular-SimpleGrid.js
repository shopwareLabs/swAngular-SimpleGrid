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
                '                <th data-ng-repeat="field in options.fields" style="width: {{field.weight}}%">',
                '                    <a data-ng-href="">{{field.label}}:</a>',
                '                </th>',
                '            </tr>',
                '        </thead>',
                '        <tbody>',
                '            <tr data-ng-repeat="entry in list">',
                '                <td data-ng-repeat="field in options.fields">',
                '                {{field.renderer(entry[field.column], entry)}}',
                '                </td>',
                '                <td data-ng-repeat="button in options.buttons">',
                '                    <div data-ng-if="!button.button">',
                '                        <div data-ng-if="button.glyphicon.length>0">',
                '                            <a data-ng-click="button.onclick(entry)">',
                '                                <i class="glyphicon glyphicon-{{button.glyphicon}}" title="{{button.label}}"></i>',
                '                            </a>',
                '                        </div>',
                '                        <div data-ng-if="button.iconPath.length>0">',
                '                            <img data-ng-src="button.iconPath" alt="{{button.label}}"/>',
                '                        </div>',
                '                    </div>',
                '                    <button data-ng-if="button.button" data-ng-click="button.onclick(entry)">',
                '                        <i data-ng-if="button.glyphicon.length>0" class="glyphicon glyphicon-{{button.glyphicon}}"',
                '                        title="{{button.label}}"></i>',
                '                        <img data-ng-if="button.iconPath.length>0" data-ng-src="button.iconPath" alt="{{button.label}}"/>',
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