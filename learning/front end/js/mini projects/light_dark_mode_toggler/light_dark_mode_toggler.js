// var box = document.getElementById('box');
// var counter = document.getElementById('counter');
// count = 0 ;
// box.addEventListener('click',function(){
//     count++;
//     counter.innerText = "box clicked " + count + " times";
// });
var toggleBtn = document.getElementById('toggle_button');
var mode = document.getElementById('mode');
var toggle_container = document.getElementById('toggle_container');
toggleBtn.addEventListener('click',function(){
    mode_value = document.getElementById('mode').innerText;
    console.log(mode_value);
    if(mode_value == 'Light Mode')
    {
        mode.innerText = "Dark Mode";
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
        toggleBtn.style.marginLeft = "72%";
        toggleBtn.style.backgroundColor = "white";
        toggle_container.style.borderColor = "white";
    }
    else 
    {
        mode.innerText = "Light Mode";
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
        toggleBtn.style.transform= "skewX(-275%)";
        toggleBtn.style.marginLeft = "1%";
        toggleBtn.style.backgroundColor = "black";
        toggle_container.style.borderColor = "black";
    }
});