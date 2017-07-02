var socket = io.connect("localhost:3000");
$(document).ready(function(){
    //dropdown element handler
    $(".dropdown-btn").click(function(event){
        $("#"+$(this).attr("data-toggle")).toggleClass("show");
    })
    //click to window close the dropdown
    $(window).click(function(event){
        if(!event.target.matches(".dropdown-btn")){
            var dropdowns = document.getElementsByClassName("dropdown-content");
            for(i=0; i<dropdowns.length; i++){
                id = "#" + dropdowns[i].id;
                if($(id).hasClass("show")){
                    $(id).removeClass("show");
                }
            }
        }
    })
    //select element
    $(".select").click(function(event){
        var id = "#" + $(this).attr("id");
        if(event.target.matches("li")){
            $(id+"> button").html(event.target.innerHTML);
        }
    })
    //form-submit-btn
    $('#register-form-submit-btn').click(function(event){
      //check fill field
      var formInputs = document.getElementsByClassName("register-form-input");
      for(i=0; i<formInputs.length ; i++){
        if(formInputs[i].value == ""){
          var id = "#"+formInputs[i].id;
          $(id).addClass("danger");
          var message = $(".message").attr("for",formInputs[i].id);
          message.html("please fill this field");
          for(j=0; j<message.length; j++){
            message[i].classList.add("show");
          }
        }else{
          var id = "#"+formInputs[i].id;
          if($(id).hasClass("danger")){
            $(id).removeClass("danger");
            id = id.replace("#","");
            $(".message").attr("for",id).removeClass("show");
          }
        }
      }
    })

})
