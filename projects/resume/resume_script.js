//===================smooth scroll===============================

var navMenuAnchorTags = document.querySelectorAll('.nav-menu a')
var interval;
for(var i=0;i<navMenuAnchorTags.length;i++)
{
    navMenuAnchorTags[i].addEventListener('click',function(event){
        event.preventDefault();
        var targetSectionID=this.textContent.trim().toLowerCase();
        var targetSection = document.getElementById(targetSectionID);
        interval = setInterval(scrollVertically,20,targetSection);
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

//==============skill autofill animation========================

var allSkillBars = document.querySelectorAll('.skill-progress > div');
function clearBar(bar)
{
    bar.style.width=0+'%';
}

function clearAllBars()
{
    for(var bar of allSkillBars)
    {
        clearBar(bar);
    }
}
clearAllBars();
function fireBar(bar)
{
    let curFill = 0;
    let targetFill = bar.getAttribute('data-skill-percentage');
    let skillBarInterval = setInterval(function(){
        if(curFill>=targetFill)
        {
            clearInterval(skillBarInterval);
            return;
        }
        curFill++;
        bar.style.width=curFill+'%';
    },10);
}

//check if reached skill bar
function reachedSkillBar()
{
    for(let bar of allSkillBars)
    {
        let barLoc = bar.getBoundingClientRect().top;
        let animated = bar.getAttribute('data-animation-done');
        if(animated!='true'&&barLoc<=window.innerHeight)
        {
            bar.setAttribute('data-animation-done','true');
            fireBar(bar);
        }
        else if(barLoc>window.innerHeight)
        {
            bar.setAttribute('data-animation-done','false');
            clearBar(bar);
        }
    }
}
// check scroll event
window.addEventListener('scroll',reachedSkillBar)