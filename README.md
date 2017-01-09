# Demonstration of cancellable-chain-of-promises

This is an example of use of the [cancellable-chain-of-promises](https://www.npmjs.com/package/cancellable-chain-of-promises) library.

The library is used in `client.js`.

```javascript
request(url, { method, body, cancelToken: token })
  ::token.then(response => JSON.parse(response))
  ::token.then(({ result }) => log(`results for "${term}": ${result}`))
  ::token.catch((err) => log(`ERROR: ${err}`))
```

## Install and run

- Install with `npm install`.
- Run the server with `npm start`.
- Then open `http://localhost:5000` in a browser.

You can change the port with: `npm start -- --port 8080`.
