$(document).ready(function(){

    $("#nav-bar .compose").on("click", function(e) {
        e.preventDefault();
        
        $(this).text($(this).text() == "Cancel" ? "Compose" : "Cancel");
        $('#nav-bar').toggleClass("close");

        $("#main-wrapper").toggle( "blind", 1000, function() {
            $("#tweettext").focus();
        })
    })

});

