const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));







app.use('*', (req, res) => res.status(404).json('Invalid request'));

app.use((err, req, res, next) => {
  const defaultError = {
    log: 'Uncaught Express middleware error has occured',
    status: 500,
    message: 'An unknown error has occurred'
  };
  const errorObj = Object.assign({}, defaultError, err);

  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  return console.log('\x1b[36m%s\x1b[0m', `Server listening at port: ${PORT}`);
});