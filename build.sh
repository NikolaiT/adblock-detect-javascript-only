#!/bin/bash

# Minify JavaScript
uglifyjs --compress --mangle -- index.js > dist/adblockDetector.min.js