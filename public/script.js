var socket = io.connect('http://localhost:3000');
function toStandardString(args){
    return args.replace(/ |'|"|'OR'/g,"");
}
$(document).ready(function(){
  //login-form
  $("#login-form > input:not([type='submit'])").mouseover(function(){
    $("#login-form > label[for="+ $(this).attr('id') +"]").css("color","white");
    if($(this).focus() == false){
      $("#login-form > input:not([type='submit'])").mouseout(function(){
        $("#login-form > label[for="+ $(this).attr('id') +"]").css("color","#515151");
      })
    }
  });
  $("#login-form > input:not([type='submit'])").focus(function(){
    $("#login-form > label[for="+ $(this).attr('id') +"]").css("color","white");
  });
  $("#login-form > input:not([type='submit'])").focusout(function(){
    $("#login-form > label[for="+ $(this).attr('id') +"]").css("color","#515151");
  });
  //client - server working
  $("#login-form").submit(function(){
    var data ={
      UserName: $("#login-form > input[name='UserName']").val(),
      Password: $("#login-form > input[name='PassWord']").val()
    };
    if(data.UserName.indexOf(" ") >= 0 || data.Password.indexOf(" ") >= 0){
        console.log();
        alert("User name and Password could not contain WHITE SPACE");
        return false;
    }
    data.UserName = toStandardString(data.UserName);
    data.Password = toStandardString(data.Password);
    socket.emit("Client-send-userdata",data);
    return false;
  })
  //server-cient working
  socket.on("server-send-login-fail",function() {
    alert("Log-in fail");
  })
  socket.on("server-send-login-success",function(){
    alert("log-in success");
  })

})
