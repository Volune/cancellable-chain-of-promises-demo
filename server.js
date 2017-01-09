const path = require('path');
const express = require('express');
const minimist = require('minimist');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./wepack.config');

const DELAY = 1000; // ms

const argv = minimist(process.argv.slice(2));

const webpackDevServerOptions = {
  publicPath: '/',
};

const app = express();
app.post('/echo', (req, res) => {
  let aborted = false;
  req.on('aborted', () => aborted = true);
  setTimeout(() => {
    if (!aborted) {
      req.pipe(res);
    }
  }, DELAY)
});
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(webpackDevMiddleware(webpack(webpackConfig), webpackDevServerOptions));
const port = typeof argv.port === 'number' ? argv.port : 5000;
app.listen(port, () => console.info(`Listening to ${port}.`));
