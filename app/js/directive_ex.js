angular.module('app', ['ui.bootstrap'])
    .directive('confirmClick', function ($modal) {

        return {
          link:  function (scope, element, attrs){
              var clickHandler = attrs.ngClick;
              attrs.ngClick='';

              element.on('click', function (event) {
                  var modal = $modal.open({
                      template:'<div>\n    <h3>Are you sure ?</h3>\n    \n    <div class="modal-footer">\n        <button class="btn btn-success" ng-click="$close()">Yes</button>\n        <button class="btn btn-success" ng-click="$dismiss()">No</button>\n    </div>\n</div>'
                  });

                  modal.result.then(function(){
                      scope.$eval(clickHandler);
                  });
              });

          }
        }
    });
