angular.module('treehouseCourse.controllers', [])
  // stageCtrl is ng-controller on body
  .controller('stageCtrl', function ($scope) {

    // Set the scope.step to 1
    $scope.step = 1;

    // Function to increase the scope.step
    $scope.advance = function () {
      $scope.step++;
    }

  })
  // userStepCtrl" is on the initial questions
  .controller('userStepCtrl', function ($scope, User) {

    // Gets the user info from the services
    $scope.user = User.get();

  })

  // Passing the User and Survey info in
  .controller('surveyStepCtrl', function ($scope, User, Survey) {

    // Passing info into variables
    $scope.user = User.get();
    $scope.survey = Survey.get();

    // Filtering the questions based on the function below 
    $scope.$watch('user', function () {
      $scope.questionsForUser = filterQuestions();
    }, true);

    $scope.$watch('survey.questions', function () {
      $scope.questionsForUser = filterQuestions();
    }, true);

    var filterQuestions = function () {

      // If user, survey or survey.questions don't exist then return
      if (!$scope.user || !$scope.survey || !$scope.survey.questions) {

        return;

      };

      // storing all questions into variable
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