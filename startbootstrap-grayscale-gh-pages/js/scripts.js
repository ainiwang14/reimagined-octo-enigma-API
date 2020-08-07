/*!
    * Start Bootstrap - Grayscale v6.0.2 (https://startbootstrap.com/themes/grayscale)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
    */
(function ($) {
    "use strict"; // Start of use strict
    var stateArray = [{ initals: 'AL', state: 'Alabama' }, { initials: 'AZ', state: 'Arizona' }, {initials: 'AK', state: 'Alaska'}, {initials: 'AZ', state: 'Arizona'}, {initials: 'AR', state: 'Arkansas'}, {initials: 'CA', state: 'California'}, {initials: 'CO', state: 'Colorado'}, {initials: 'CT', state: 'Connecticut'}, {initials: 'DE', state: 'Delaware'}, {initials: 'FL', state: 'Florida'}, {initials: 'GA', state: 'Georgia'}, {initials: 'HI', state: 'Hawaii'}, {initials: 'ID', state: 'Idaho'}, {initials: 'IL', state: 'Illinois'}, {initials: 'IN', state: 'Indiana'}, {initials: 'IA', state: 'Iowa'}, {initials: 'KS', state: 'Kansas'}, {initials: 'KY', state: 'Kentucky'}, {initials: 'LA', state: 'Louisiana'}, {initials: 'ME', state: 'Maine'}, {initials: 'MD', state: 'Maryland'}, {initials: 'MA', state: 'Massachusetts'}, {intials: 'MI', state: 'Michigan'}];
    for (var i = 0; i < stateArray.length; i++) {

        var option = $("<option>");
        option.attr('value',stateArray[i].initials); 
        option.text(stateArray[i].state); 
        $("select.custom-select").append(option)
    }
    
    $("select").change(function () {
        $("html, body").animate(
            {
                scrollTop: $("#state-parks").offset().top,
            },
            1000,
            "easeInOutExpo"
        );
    })

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#mainNav",
        offset: 100,
    });

    // Collapse Navbar
    var navbarCollapse = function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
})(jQuery); // End of use strict
