# Adblock Detection with JavaScript only

[![npm](https://img.shields.io/npm/v/adblock-detect-javascript-only)](https://www.npmjs.com/package/adblock-detect-javascript-only)

Install NPM Package:

```bash
npm i adblock-detect-javascript-only
```

[**Click here for a DEMO.**](https://incolumitas.com/2020/12/27/detecting-uBlock-Origin-and-Adblock-Plus-with-JavaScript-only/)

This tiny library allows you to detect uBlock Origin, Adblock Plus and AdBlocker Ultimate with JavaScript only. Other Adblocker software is very likely also supported, since many Adblockers use the same blocking lists.

Currently, the following two adblock lists are detected:

1. Adblock Plus EasyList: [https://github.com/easylist/easylist](https://github.com/easylist/easylist), the following sub list: [easylist_general_block.txt](https://github.com/easylist/easylist/blob/master/easylist/easylist_general_block.txt)
2. uBlock Origin uAssets: [https://github.com/uBlockOrigin/uAssets](https://github.com/uBlockOrigin/uAssets), the following sub list: [filters-2022.txt](https://github.com/uBlockOrigin/uAssets/blob/master/filters/filters-2022.txt)

Only JavaScript is required.

The library has a tiny size of only 591 bytes and was last tested with the following browsers and Adblock software:

| Browser             | Adblock Software      | Last Tested   | Detection Works? |
|---------------------|-----------------------|---------------|------------------|
| Chrome/106.0.0.0    | uBlock Origin v1.44.4 | 16th Oct 2022 | ✓                |
| Firefox/105.0       | uBlock Origin v1.44.4 | 16th Oct 2022 | ✓                |
| Chrome/106.0.0.0    | Adblock Plus v5.1.3   | 16th Oct 2022 | ✓                |
| Firefox/105.0       | AdBlocker Ultimate v3.7.19  | 16th Oct 2022 | ✓                |

## Usage

Install the package via npm: `npm i adblock-detect-javascript-only`

Then copy the minified JavaScript file `adblockDetector.min.js` to your preferred location.

```bash
cp node_modules/adblock-detect-javascript-only/dist/adblockDetector.min.js .
```

Then you can create a file `demo.html` like this:

```html
<!doctype html>

<html lang="en">

<head>
  <meta charset="utf-8">
  <title>Test Adblock Detection</title>
  <meta name="description" content="Test Adblock Detection">
  <meta name="author" content="Nikolai Tschacher">
</head>

<body>
  <script type="text/javascript" src="adblockDetector.min.js"></script>

  <script type="text/javascript">
    detectAdblock().then((res) => {
      alert(`Using Adblockers: ${JSON.stringify(res)}`);
    });
  </script>
</body>

</html>
```

### Test

You can test the functionality of adblock detector locally by opening the `demo.html` file in your favorite browser.

The file must be served with a local HTTP server, since adblock detection does not work with the `file://` scheme (because of CORS issues). This is not a problem, because no real website is hosted and accessed via the file scheme.

Start a local server:

```bash
python3 -m http.server 8000
```

Then visit the URL [http://localhost:8000/demo.html](http://localhost:8000/demo.html) in your browser.

## Installation from Github

Simply clone the repository and then include the library in your website.

Clone:

```bash
git clone https://github.com/NikolaiT/adblock-detect-javascript-only
```

Then copy the file `dist/adblockDetector.min.js` into your local project.

## How does it work?

The JavaScript function tries to load remote JavaScript resources that are blocked by Adblockers. If the loading fails, it is assumed that an adblocker is present. If the loading succeeds, there is no adblocker installed.
