# Adblock detection with JavaScript only

[![npm](https://img.shields.io/npm/v/adblock-detect-javascript-only)](https://www.npmjs.com/package/adblock-detect-javascript-only)

[**Click here for a DEMO.**](https://incolumitas.com/2020/12/27/detecting-uBlock-Origin-and-Adblock-Plus-with-JavaScript-only/)

This tiny library allows you to detect uBlock Origin, Adblock Plus and Ghostery with JavaScript only.

Other adblock software is very likely also supported.

There are no external requests to non-local URLs. Only JavaScript is required.

The library has a tiny size of only 330 Bytes.

```
$ du -b dist/adblockDetector.min.js 
330	dist/adblockDetector.min.js
```

The library was tested with the following browsers and Adblock software:

| Browser             | Adblock Software      | Last Tested   | Detection Works? |
|---------------------|-----------------------|---------------|------------------|
| Firefox/84.0        | Adblock Plus v3.10.1  | 28th Dec 2020 | ✓                |
| Chrome/86.0.4240.75 | uBlock Origin v1.31.2 | 28th Dec 2020 | ✓                |
| Chrome/86.0.4240.75 | Ghostery v8.5.4       | 28th Dec 2020 | ✓                |

## Usage

Usage in Browser:

```HTML
<script type="text/javascript" src="dist/adblockDetector.min.js"></script>
 
<script type="text/javascript">
  detectAdblock(function(isUsingAdblock) {
    // isUsingAdblock is either `true`, `false` or `unknown`
    alert("Using Adblock: " + isUsingAdblock);
  })
</script>
```

## Installation

Simply clone the repository and then include the library in your website.

Clone:

```
git clone https://github.com/NikolaiT/adblock-detect-javascript-only
```

Then copy the file `dist/adblockDetector.min.js` into your local project.

Alternatively, install the module via npm:

```
npm install adblock-detect-javascript-only
```

Copy the file from `npm_modules/adblock-detect-javascript-only/dist/adblockDetector.min.js` into your local folder.


## How does it work?

The JavaScript function makes a HEAD request to a local resource that is flagged by adblock software.

This resource does not exist locally (except you create it one purpose), therefore a request must return a 404 error.

However, adblock software aborts all HTTP requests to suspicious looking URLs, therefore execution doesn't even
get to the point that a 404 error is obtained.

If a 404 error is returned, one of the two following cases must hold:

1. There is no adblock software running
2. The resource is not flagged by the adblock software

On the other hand, if the invocation of the function does not return an 404 error, it can be assumed
that a adblock software intercepted the request and aborted it.

## Test

You can test the functionality of adblock detector locally by opening the `demo.html` file in your favorite browser.

The file must be served with a local HTTP server, since adblock detection does not work with the `file://` scheme (because of CORS issues).

This is not a problem, because no real website is hosted and accessed via file scheme.

Start a local server: 

```
python -m http.server 8000
```

Then visit the URL [http://localhost:8000/demo.html](http://localhost:8000/demo.html) in your browser.

## Known Issues

When passing a callback to `detectAdblock`, the callback does not in all cases return a `boolean`. Therefore, it is best 
to use the library in such a way:

```JavaScript
async function adblockCheck() {
  return new Promise((resolve, reject) => {
    detectAdblock(function(isUsingAdblock) {
      resolve(isUsingAdblock);
    })
  });
}

adblockCheck().then((adblockUsed) => {
  // adblockUsed is either `true`, `false` or `unknown`
  console.log(adblockUsed);
});
```