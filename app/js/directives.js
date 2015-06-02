angular.module('treehouseCourse.directives', [])
.directive('barChart', function () {
    return {
      templateUrl: 'barChart.html',
      replace: true,
      scope: {
        'result': '=barChart'
      },
      link: function ($scope, $element, $attrs) {
        $scope.$watch('result', function () {
          calculateDynamics();
        }, true);

        var calculateDynamics = function () {
          $scope.total = 0;
          $scope.optionColors = {};
          _.each($scope.result.results, function (votes, option) {
            $scope.total += votes;
            $scope.optionColors[option] = 'rgba(' + _.random(0, 255) + ',' + _.random(0, 255) + ','+ _.random(0, 255) + ',1)';
          });
        }
      }
    }
  })