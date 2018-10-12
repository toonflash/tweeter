$(document).ready(function() {
    
    $("#main-wrapper textarea").on("input", function() {
        let limit = 140;
        let counterVal = limit - $(this).val().length;

        if (counterVal < 0) {
            $(this).parentsUntil("#main-wrapper").find(".counter").addClass("red");
        }
        if (counterVal >= 0) {
            $(this).parentsUntil("#main-wrapper").find(".counter").removeClass("red");
        }

        $(this).parentsUntil("#main-wrapper").find(".counter").text(counterVal);
    })

});