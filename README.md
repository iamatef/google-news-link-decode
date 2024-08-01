# google_news_link_decode

`google_news_link_decode` is a simple npm package that decodes Google News URLs to return the original post link.

## Installation

Install the package using npm:

```bash
npm install google_news_link_decode
```

## Usage

```javascript
const decodeGoogleNewsUrl = require('google_news_link_decode');

const url = 'https://news.google.com/rss/articles/CBMiuwFBVV95cUxONmktU0JmbDV4dFJJTUxZQ3NObVg3Slh3VjB4cUZuN1lxQUNsdWlWYmpYSGNPM3hwNU5aaWw0b1ZMX040TTNvS3BhUjFZd21GaHZkaFlPQlpQTlFLdFZIUzNlSTMwVExmNUtHV1JxSE9qT1JDekZiMTdzUUpJR09QbUFMZTdxcDVEeWI4N3VhaGZXRm9ZYVRBaEJZRHVpYVJOQm8wNnphVzFCSjdTRWwxbV9SakJ6S3VsTE9N?oc=5';

// Use using promise 
decodeGoogleNewsUrl(url).then((decodedUrl) => {
    console.log(decodedUrl);
}).catch((err) => {
    console.log(err);
});
```

## Credit

This package is based on the original code by [huksley](https://gist.github.com/huksley/bc3cb046157a99cd9d1517b32f91a99e). 

