angular.module('treehouseCourse.controllers', [])
  .controller('stageCtrl', function ($scope) {
    $scope.step = 1;

    $scope.advance = function () {
      $scope.step++;
    }
  })
  .controller('userStepCtrl', function ($scope, User) {
    $scope.user = User.get();
  })
  .controller('surveyStepCtrl', function ($scope, User, Survey) {
    $scope.user = User.get();
    $scope.survey = Survey.get();
    
    $scope.$watch('user', function () {
      $scope.questionsForUser = filterQuestions();
    }, true);

    $scope.$watch('survey.questions', function () {
      $scope.questionsForUser = filterQuestions();
    }, true);
    
    var filterQuestions = function () {
      if (!$scope.user || !$scope.survey || !$scope.survey.questions) {
        return;
      };
      var questions = $scope.survey.questions;
      var filtered = [];
      for (var i = 0, ii = questions.length; i < ii; i++) {
        var question = questions[i];
        // Example conditional: "user.ageRange == '20-29'"
        if (!question.conditional || $scope.$eval(question.conditional)) {
          filtered.push(question);
        };
      }
      return filtered;
    }

  })
  .controller('resultsStepCtrl', function ($scope, User, Results) {
    var user = User.get();
    var questionIds = _.keys(user.surveyAnswers);
    $scope.surveyResults = Results.forQuestions(questionIds);
  })
  .controller('debugCtrl', function ($scope, User, Results) {
    $scope.user = angular.isDefined(User.get) && User.get();

    $scope.$watch('user.surveyAnswers', function () {
      var questionIds = _.keys($scope.user.surveyAnswers);
      $scope.results = angular.isDefined(Results.forQuestions) && Results.forQuestions(questionIds);
    }, true);
  })