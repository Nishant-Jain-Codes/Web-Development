var bodyHeight = document.body.getBoundingClientRect().bottom;
bodyHeight -= window.innerHeight;
console.log(bodyHeight)
window.addEventListener('scroll',function()
{
   
   var topvar = document.getElementById('top')   
   var percentIndicator = document.getElementById('scroll_progress_indicator');
   var curHeight = parseInt(topvar.getBoundingClientRect().top*-1);
   var percent = Math.floor((curHeight/bodyHeight)*100);
   if(percent>=100)
      percent=100;
   percentIndicator.innerText=percent+'%';
})