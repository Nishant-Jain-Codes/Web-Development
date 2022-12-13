$('#switch').click(function(){

 if($('body').css('background-color')=='rgb(0, 0, 0)')
 {
    $('body').css('background-color','white');
    $('#switch').css('border-color','black');
    $('#inner-switch').css({
        backgroundColor : 'black',
        marginLeft : "1%"
    });
    $('#heading').css('color','black');
 }
 else 
 {
    $('body').css('background-color','black');
    $('#switch').css('border-color','white');
    $('#inner-switch').css({
        backgroundColor : 'white',
        marginLeft : "72%"
    });
    $('#heading').css('color','white');
 }
});