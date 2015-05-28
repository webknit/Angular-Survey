angular.module('myApp', [ ])
	.controller('stageCtrl', function ($scope) {
		$scope.step = 1;

		$scope.advance = function () {
			$scope.step++;
		}
	})
	.controller('userStepCtrl', function ($scope, User) {

		$scope.user = User.get();

	})
	.controller('surveyStepCtrl', function ($scope) {

	})
	.controller('resultsStepCtrl', function ($scope) {

	})
	.controller('debugCtrl', function ($scope, User, Results) {
		$scope.user = angular.isDefined(User.get) && User.get();

		$scope.$watch('user.surveyAnswers', function () {
			var questionIds = _.keys($scope.user.surveyAnswers);
			$scope.results = angular.isDefined(Results.forQuestions) && Results.forQuestions(questionIds);
		}, true);
	})