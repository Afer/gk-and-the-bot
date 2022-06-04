
var ANIMATION_EVENT = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

var main = {
    init: function() {
        let path = window.location.pathname;

        $(".pages").css("display", "none");

        if (path == '' || path.indexOf('index') != -1 || path.indexOf('home') != -1) {
            $(".home").css("display", "block");
        }
        else if (path.indexOf("privacy-policy") != -1) {
            $(".privacy-policy").css("display", "block");
        }
    }
};

$(function() {

    main.init();

});