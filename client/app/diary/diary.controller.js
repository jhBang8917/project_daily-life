'use strict';

angular.module('dailyLifeApp')
.controller('DiaryCtrl', function($scope, $http, socket){
  $scope.today = moment().format('L');
    $scope.allDiary = [];

    $http.get('/api/diary').success(function(allDiary) {
      $scope.allDiary = allDiary;
      socket.syncUpdates('diary', $scope.allDiary);//socket.io 통해 실시간 업데이트 가능
    });

    $scope.addDiary = function(){
      if($scope.diaryContent === '')
        return;
      $http.post('/api/diary', {
        content: $scope.diaryContent,
        todayPromise: $scope.diaryTodayPromise,
        date : $scope.today
      });
      $scope.diaryContent = '';
    }
});

