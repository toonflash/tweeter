$(document).ready(function(){

    $("a.compose").click(function() {
        $("#main-wrapper").toggle( "blind", 1000, function() {
            $("#tweettext").focus();
        } );
    });


})

