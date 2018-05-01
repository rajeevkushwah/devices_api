var express = require('express');
let cors = require('cors')
var app = express();
let bodyParser = require('body-parser');
var path = require('path');
var http = require('http');
let expressValidator = require('express-validator');
var db = require('./db.js')
var multer  = require('multer');
let jwt = require('jsonwebtoken');
let moment = require('moment');
let constantObj = require('./constants.js');

let server = http.createServer(app);
let io = require('socket.io').listen(server);
module.exports.io = io;
var storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(path.extname(file.originalname), "") + '-' + Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({ storage: storage })
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb',extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());
// Add headers

//app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 3000);


require('./routes/routes')(app, express,io);





server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
