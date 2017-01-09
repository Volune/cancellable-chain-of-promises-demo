const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./wepack.config');

const app = express();
app.post('/echo', (req, res) => {
  res.write(req.body);
  res.send();
});
app.use(webpackDevMiddleware(webpack(webpackConfig)));
app.listen(5000);
