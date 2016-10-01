var express =       require('express')
    , bodyParser =  require('body-parser')
    , http =        require('http')
    , path =        require('path')
    , fs =          require("fs");

// TODO: CHANGE THIS TO COMPILER!!!!!!!!!!!!!!!!!!
var app = express();
var pjson = JSON.parse(fs.readFileSync('./package.json'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/src/'));
// app.use(express.static(__dirname + '/dist/staging/'));
// app.use(express.static(__dirname + '/dist/production/'));

app.all('/*', function(req, res){
    // res.sendfile('index.html');
    res.sendFile(path.join(__dirname, '/src/', 'index.html'));
    // res.sendFile(path.join(__dirname, '/dist/staging/', 'index.html'));
    // res.sendFile(path.join(__dirname, '/dist/production/', 'index.html'));
});

app.set('port', process.env.PORT || 1111);
http.createServer(app).listen(app.get('port'), function(){
    console.log("Component: Avatar");
    console.log("http://localhost:" + app.get('port'));
});
