$(document).ready(function(){
    $('#title1').click(function(){
        $([document.documentElement, document.body]).animate({
            scrollTop: 0
        }, 1000);
    });
    $('#playOnline1').click(function(){
        $([document.documentElement, document.body]).animate({
            scrollTop: 240
        }, 1000);
    });
    $('#download1').click(function(){
        $([document.documentElement, document.body]).animate({
            scrollTop: 360
        }, 1000);
    });
    $('#about1').click(function(){
        $([document.documentElement, document.body]).animate({
            scrollTop: 480
        }, 1000);
    });
});