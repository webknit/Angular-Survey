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
			
			// Creates some random bar charts
			var calculateDynamics = function () {
			
				// Define total and colours
				$scope.total = 0;
				$scope.optionColors = {};
				
				
				_.each($scope.result.results, function (votes, option) {
					console.log(option);
					$scope.total += votes;
					$scope.optionColors[option] = 'rgba(' + _.random(0, 255) + ',' + _.random(0, 255) + ','+ _.random(0, 255) + ',1)';
				});
			}
		}
	}
})