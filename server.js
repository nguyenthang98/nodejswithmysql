var express = require("express");
var app = express();
app.use(express.static("public"));
app.set('view engine','ejs');
app.set('views','./views');

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database    : 'servernodejs'
});

connection.connect(function(err) {
    if (!!err) {
        console.error('error connecting: ' + err.stack);
        return;
    }else{
      console.log("connected");
    }
});

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

io.on("connection",function(socket){
  //console.log("has connection : "+ socket.id);
  socket.on("disconnect",function(){
    //console.log(socket.id + " has disconnected")
  })

  socket.on("Client-send-userdata",function(data){
    console.log(data.UserName + " " +data.Password);
    connection.query("SELECT * FROM user WHERE ( UserName = '"+data.UserName+"') AND ( Password = '"+data.Password+"' )",function(err,rows,fields){
      if(!!err){
        console.log('error in the query' + err.stack);
      } else {
        if(rows.length === 0){
          //log-in fail
          console.log("login fail");
          socket.emit("server-send-login-fail");
        }else {
          //log-in success
          console.log("login success");
          socket.emit("server-send-login-success");
        }
      }
    })
  })
})

app.get('/',function(req,res){
  res.render('home');
})
