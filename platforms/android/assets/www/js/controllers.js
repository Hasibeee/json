angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
	$scope.missingPhoto = "img/missing.png";
	

})


.controller('BarcodeCtrl', function($scope, $cordovaBarcodeScanner,$rootScope, $http, $state) {

 
		$scope.barcodeState = false;

		$scope.barcodeScan = function(){
			$cordovaBarcodeScanner
			.scan()
			.then(function(barcodeData) {
				$scope.barcodeContent = barcodeData;
				$scope.barcodeState = true;
				$state.go('app.sonuc', {aranacak: $scope.barcodeContent.text});
			   	
			   	$scope.barcodeState = true;
			 })
		}

	
})

.controller('SonucCtrl', function ($scope, $stateParams, $rootScope, $http, $state) {
	var aranacak = $stateParams.aranacak;
	$scope.myData = [];
	$http.get('./templates/palmiye.json').then(function (response) {
		var data = response.data;

		angular.forEach(data, function(value){
			if (value.tur.indexOf(aranacak) != -1) {
				$scope.myData.push(value);
			}
		});

		$scope.bitkilist = function () {
			if ($scope.$root.bitki.length != 0)
				return true;
			else
				return false;
		};
	});
})

.controller('SearchCtrl', function ($scope, $http) {
	$scope.arama = {
		kelime: ""
	};
	$scope.filtreliDeger = [];
	$scope.myData = [];
	$http.get('./templates/palmiye.json').then(function (response) {
		$scope.myData = response.data;
	});
	$scope.$watch("arama.kelime", function(eski, yeni) {
		$scope.filtreliDeger = [];
		for (var i = 0; i < $scope.myData.length; i++) {
			if ($scope.myData[i].tur.indexOf(yeni) != -1) {
				$scope.filtreliDeger.push($scope.myData[i]);
			}
		}
	});
})