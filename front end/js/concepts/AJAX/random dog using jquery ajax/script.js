function fetchRandomDogImg()
{
// method 1 
    // $.ajax({
    //     url:'https://dog.ceo/api/breeds/image/random',
    //     method: 'GET',
    //     success : function(response){
    //         var imgUrl = response.message;
    //         $('#dog-img').attr('src',imgUrl);
    //     }
    // }).fail(function(){
    //     console.log('request failed');
    // });

// method 2 
    $.get('https://dog.ceo/api/breeds/image/random',function(response){
        var imgUrl = response.message;
        $('#dog-img').attr('src',imgUrl);
    }).fail(function(){
        console.log('request failed');
    });
}
$('#fetch').click(fetchRandomDogImg);