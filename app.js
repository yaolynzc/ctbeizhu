var express = require('express');
var services = require('./routes/services');
var app = express();

app.get('/addbeizhu',services.addbeizhu);
app.get('/addbeizhu2',services.addbeizhu2);

app.listen(2388);
console.log('chutian beizhu services start listening on port 2388 \r\n');
