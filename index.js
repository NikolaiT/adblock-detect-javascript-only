/**
 * Author: Nikolai Tschacher
 * Date: 28.12.2020
 * Updated: 16.08.2022
 * Website: https://incolumitas.com/
 * 
 * Detecting uBlock Origin and Adblock Plus with JavaScript only.
 * 
 * Usage: detectAdblock().then((res) => { console.log(res) });
 * 
 */
function detectAdblock() {
  const adblockTests = {
    uBlockOrigin: {
      url: 'https://incolumitas.com/data/pp34.js?sv=',
      id: '837jlaBksSjd9jh',
    },
    adblockPlus: {
      url: 'https://incolumitas.com/data/neutral.js?&ad_height=',
      id: 'hfuBadsf3hFAk',
    },
  };

  function canLoadRemoteScript(obj) {
    return new Promise(function (resolve, reject) {
      var script = document.createElement('script');

      script.onload = function () {
        if (document.getElementById(obj.id)) {
          resolve(false);
        } else {
          resolve(true);
        }
      }

      script.onerror = function () {
        resolve(true);
      }

      script.src = obj.url;
      document.body.appendChild(script);
    });
  }

  return new Promise(function (resolve, reject) {
    let promises = [
      canLoadRemoteScript(adblockTests.uBlockOrigin),
      canLoadRemoteScript(adblockTests.adblockPlus),
    ];

    Promise.all(promises).then((results) => {
      resolve({
        uBlockOrigin: results[0],
        adblockPlus: results[1],
      });
    }).catch((err) => {
      reject(err);
    });
  });
}