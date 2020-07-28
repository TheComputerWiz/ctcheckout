document.addEventListener("deviceready", function () { // $ionicPlatform.ready(function() {
  cordova.plugins.unimag.swiper.activate();
  cordova.plugins.unimag.swiper.enableLogs(true);
  cordova.plugins.unimag.swiper.setReaderType('shuttle');
  
  var connected = false;

  var swipe = function () {
    if (connected) {
      cordova.plugins.unimag.swiper.swipe(function successCallback () {
        console.log('SUCCESS: Swipe started.');
        alert('SUCCESS: Swipe started.');
      }, function errorCallback () {
        console.log('ERROR: Could not start swipe.');
        alert('ERROR: Could not start swipe.');
      });
    } else console.log('ERROR: Reader is not connected.');
  }

  cordova.plugins.unimag.swiper.on('connected', function () {
    connected = true;
  });

  cordova.plugins.unimag.swiper.on('disconnected', function () {
    connected = false;
  });

  cordova.plugins.unimag.swiper.on('swipe_success', function (e) {
    var data = JSON.parse(e.detail);
    console.log('cardholder name: ' + data.first_name + ' ' + data.last_name);
    alert('cardholder name: ' + data.first_name + ' ' + data.last_name);
    console.log('card number:' + data.card_number);
    alert('card number:' + data.card_number);
    console.log('expiration:' + data.expiry_month + '/' + data.expiry_year);
  });

  cordova.plugins.unimag.swiper.on('swipe_error', function () {
    console.log('ERROR: Could not parse card data.');
  });

  cordova.plugins.unimag.swiper.on('timeout', function (e) {
    if (connected) {
      console.log('ERROR: Swipe timed out - ' + e.detail);
    } else {
      console.log('ERROR: Connection timed out - ' + e.detail);
    }
  });

}, false); // });
