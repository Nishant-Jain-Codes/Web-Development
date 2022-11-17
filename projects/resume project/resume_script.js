var navMenuAnchorTags = document.querySelectorAll('.nav-menu a')
// console.log(navMenuAnchorTags)
var interval;
for(var i=0;i<navMenuAnchorTags.length;i++)
{
    navMenuAnchorTags[i].addEventListener('click',function(event){
        event.preventDefault();
        var targetSectionID=this.textContent.trim().toLowerCase();
        // console.log(targetSectionID);
        var targetSection = document.getElementById(targetSectionID);
        interval = setInterval(function(){
            scrollVertically(targetSection);
        },20);
    });
}
function scrollVertically(targetSection)
{
    var targ_coord = targetSection.getBoundingClientRect();
    if(targ_coord.top<=0||((window.innerHeight + window.scrollY) >= document.body.offsetHeight))
    {
        clearInterval(interval);
        return;
    }
    window.scrollBy(0,50);
}