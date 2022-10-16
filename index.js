/**
 * Author: Nikolai Tschacher
 * Updated: 16.10.2022
 * Website: https://incolumitas.com/
 * 
 * Detects uBlock Origin, Adblock Plus and AdBlocker Ultimate with JavaScript only.
 * 
 * Usage: detectAdblock().then((res) => { console.log(res) });
 * 
 */
function detectAdblock() {
  const adblockTests = {
    // https://github.com/uBlockOrigin/uAssets/blob/master/filters/filters-2022.txt
    uBlockOrigin: {
      url: 'https://incolumitas.com/data/pp34.js?sv=',
      id: '837jlaBksSjd9jh',
    },
    // https://github.com/easylist/easylist/blob/master/easylist/easylist_general_block.txt
    adblockPlus: {
      url: 'https://incolumitas.com/data/neutral.js?&adserver=',
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
        usingAdblock: (results[0] === true) || (results[1] === true),
      });
    }).catch((err) => {
      reject(err);
    });
  });
}