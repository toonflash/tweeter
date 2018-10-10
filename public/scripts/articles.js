$(document).ready(function() {

    $("#tweets-wrapper article").on({
        mouseenter: function() {
            $( this ).addClass("hover");
        }, mouseleave: function() {
            $( this ).removeClass("hover");
        }
    });

});