function fetchRandomDogImg()
{
    let xhrRequest = new XMLHttpRequest();
    xhrRequest.onload = function ()
    {
        console.log(xhrRequest.response);
        var json_resp = JSON.parse(xhrRequest.response);
        var imgUrl = json_resp.message;
        $('#dog-img').attr('src',imgUrl);
    }
    xhrRequest.open('get','https://dog.ceo/api/breeds/image/random',true);
    xhrRequest.send();
    xhrRequest.onerror = function()
    {
        console.log('request failed');
    };
}
let btn = document.getElementById('fetch');
btn.addEventListener('click',fetchRandomDogImg);