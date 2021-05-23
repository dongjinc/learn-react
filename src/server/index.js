const express = require('express')
const {renderToString} = require('react-dom/server')
const Home = require('../containers/Home')

const app = express();
const content = renderToString(<Home />);
app.get('/', function (req, res) {
   res.send(
   `
    <html>
      <head>
        <title>ssr</title>
      </head>
      <body>
        <div id="root">${content}</div>
      </body>
    </html>
   `
   );
})
app.listen(3001, () => {
  console.log('listen:3001')
})