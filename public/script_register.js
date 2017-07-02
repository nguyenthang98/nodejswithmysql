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

})
