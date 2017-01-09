import Cancellable from 'cancellable-chain-of-promises';

// Utility
const log = (msg) => {
  const span = document.createElement('span');
  span.innerText = msg;
  div.appendChild(span);
  div.appendChild(document.createElement('br'));
};

// Fetch-like function supporting cancellation
const request = (url, { method, body, cancelToken }) => {
  const { token } = Cancellable(cancelToken);
  let abortListener;
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    abortListener = (abortError) => {
      xhr.abort();
      reject(abortError);
    };
    token.addAbortListener(abortListener);
    xhr.open(method, url);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.send(body);
  })
    ::token.always(() => token.removeAbortListener(abortListener))
};

// The actual code
let lastAbort = null;
input.oninput = ({ target: { value: term } }) => {
  if (lastAbort) {
    lastAbort();
  }
  const { token, abort } = Cancellable();
  lastAbort = abort;

  log(`searching for "${term}"`);
  const method = 'POST';
  const url = '/echo';
  const body = JSON.stringify({ result: term.toUpperCase() });

  request(url, { method, body, cancelToken: token })
    ::token.then(response => JSON.parse(response))
    ::token.then(({ result }) => log(`results for "${term}": ${result}`))
    ::token.catch((err) => log(`ERROR: ${err}`))
    ::token.always(() => {
      if (lastAbort === abort) {
        lastAbort = null;
      }
    });
};
