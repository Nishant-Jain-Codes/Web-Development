var change_color = document.getElementById('change_color');
var change_shape = document.getElementById('change_shape');
var shapes = document.getElementsByClassName('shape');
var container_div = document.getElementById('container_div');

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
change_color.addEventListener('click',function(){
    container_div.style.backgroundColor = getRandomColor();
})
var curshape = 0;
var totalShapes = shapes.length;
change_shape.addEventListener('click',function(){
    var randShape = Math.floor(Math.random() * totalShapes);
     shapes[curshape].style.display = "none";
     shapes[randShape].style.display = "block";
     curshape = randShape;
})