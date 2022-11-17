
var box = document.getElementById('catch');
box.addEventListener('mouseover',function()
{
    console.log("hover");
    var randomX=Math.floor(Math.random() * 90)+'%';
    var randomY=Math.floor(Math.random() * 90)+'%';
    console.log(randomX,randomY);
    box.style.marginLeft = randomX;
    box.style.marginTop = randomY;
});