/**
 * Author: Nikolai Tschacher
 * Date: 28.12.2020
 * Website: incolumitas.com
 * 
 * Detecting uBlock Origin and Adblock Plus with JavaScript only.
 * 
 * How it works:
 * 
 * The requested baiting resource does not exist locally.
 * If no adblocker is available, the http status will be 404
 * If an adblocker is active, the send() / fetch() method will fail to begin with,
 * because the adblocker prevents the loading of the url
 */

function detectAdblock(callback) {
  var flaggedURL = 'pagead/js/adsbygoogle.js';

  if (window.fetch) {
    var request = new Request(flaggedURL, {
      method: 'HEAD',
      mode: 'no-cors',
    });
    fetch(request)
      .then(function(response) {
        if (response.status === 404) {
          callback(false);
        }
      })
      .catch(function(error) {
        callback(true);
      });
  } else {
    var http = new XMLHttpRequest();
    http.open('HEAD', flaggedURL, false);

    try {
      http.send();
    } catch (err) {
      callback(true);
    }

    if (http.status === 404) {
      callback(false);
    }
  }
}