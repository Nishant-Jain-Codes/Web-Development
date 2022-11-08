// var box = document.getElementById('box');
// var counter = document.getElementById('counter');
// count = 0 ;
// box.addEventListener('click',function(){
//     count++;
//     counter.innerText = "box clicked " + count + " times";
// });
var box = document.getElementById("box");
box.addEventListener('mouseover',function(){
    console.log('mouse Over');
})
box.addEventListener('mouseout',function(){
    console.log('mouse Out');
})
var Sinput = document.getElementById('search');
Sinput.addEventListener('keydown',function(event){
    console.log('key press',event.keyCode);
});