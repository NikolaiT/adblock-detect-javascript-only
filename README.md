# Adblock detection with JavaScript only

This tiny library allows you to detect uBlock Origin and Adblock Plus with JavaScript only.

There are no external requests to URLs and no resources are wasted.

The library was tested with the following browsers and Adblock software:

| Browser             | Adblock Software      | Last Tested   | Detection Works? |
|---------------------|-----------------------|---------------|------------------|
| Firefox/84.0        | Adblock Plus v3.10.1  | 28th Dec 2020 | ✓                |
| Chrome/86.0.4240.75 | uBlock Origin v1.31.2 | 28th Dec 2020 | ✓                |

## Usage

Usage in Browser:

```HTML
<script type="text/javascript" src="/dist/adblockDetector.min.js"></script>
 
<script type="text/javascript">
  detectAdblock(function(isUsingAdblock) {
    console.log("Using Adblock: " + isUsingAdblock);
  })
</script>
```

## How does it work?

The JavaScript function makes a HEAD request to a local resource that is flagged by adblock software.

This resource does not exist locally, therefore a request must return a 404 error.

If a 404 error is returned, then we know that either  

- there is no adblock software running
- the resource is not flagged by the adblock software

Instead, if the invocation of the function does not return an 404 error, we can be sure
that a adblock software intercepted the request and aborted it.

## Test

You can test the functionality of adblock detector locally by opening the `demo.html` file in your favorite browser.

The file must be served with a local HTTP server, since adblock detection does not work with the `file://` scheme (CORS issues).
This is not a problem, because no real website is hosted with the file scheme.

Start local server: 

```
python -m http.server 8000
```

Then visit the following URL in your browser: `http://localhost:8000/demo.html`