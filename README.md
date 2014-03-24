Shopware AngularJs -- swAngular Simple Grid
=====================================

This is an Shopware-AngularJs Component, it can be installed via Bower.

## Installation

Via [bower](http://bower.io):

	bower install sw-angular-simple-grid

## How to Use the Component


###Show simple data table
Given you have an array of data objects stored in the scope object `$scope.exampleData`, you can easily display them like this:

    &lt;div sw-angular-simple-grid ng-model="exampleData"&gt;&lt;/div&gt;

In this case, the component will analyze the data and make an educated guess of which columns to be displayed.


###Define table columns
In most use cases, you want to define each column of the table one by one. Column definitions are defined in an object `$scope.options` and bound like this:
	
	&lt;sw-angular-simple-grid ng-model="exampleData" sw-options="options"&gt;&lt;/sw-angular-simple-grid&gt;

Besides column definitions as `fields` you are allowed to define `buttons` which are attached to each row of the table.

* Fields are defined by a `label`, `column` in the data set and optional horizontal `weight` and a `renderer` function.
* Buttons are defined by a `label`, `class`, `glyphicon`, `button` and an `onclick` handler.

Example options may look like this:

    $scope.options = {
        fields: [
            {label: 'Id', column: 'id', weight: '10'},
            {label: 'Vorname', column: 'firstname', weight: '20'},
            {label: 'Nachname', column: 'lastname', weight: '20'},
            {label: 'Alter', column: 'age', weight: '10'},
            {label: 'Qualitäten', column: 'qualities', weight: '40', renderer: function (input) {
                return input.join(', ');
            }}
        ],
        buttons: [
            {
                label: 'MyButton',
                class: '',
                glyphicon: 'edit',
                button: false,
                onclick: function (row) {
                    //..
                }
            }
        ]
    };

###Examples

Here are some [Examples](http://swangular.shopware.de.cloud2-vm153.de-nserver.de/#/simpleGrid)