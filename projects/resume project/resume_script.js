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

var allSkillProgressBars = document.getElementsByClassName('skill-progress-bar');
var skillsContainer = document.getElementById('skill-display');
// console.log(allSkillProgressBars)
var animationDone = false;
//reset the inner skill progress bar to 0
function initialiseBars()
{
    for(var bar of allSkillProgressBars)
    {
    bar.style.width = 0 + '%';
    }
}
initialiseBars();
//start animaion on every skill ->increasse skill width from  0 to skill level
function fillBars()
{
    for(let bar of allSkillProgressBars)
    {
        let currentWidth = 0;
        let targetWidth = bar.getAttribute('data-skill-percentage');
        let barAnimationInterval = setInterval(function(){
            if(currentWidth>=targetWidth)
            {
                clearInterval(barAnimationInterval);
                return;
            }
            currentWidth++;
            bar.style.width = currentWidth + '%';
            
        },20);
    }
    animationDone = true;
}
// check if skill scontainer is visible
function reachedSkillSection()
{
    var skillsContainerLoc = skillsContainer.getBoundingClientRect().top;
    if(!animationDone&&skillsContainerLoc<=window.innerHeight)
    {
       
        animationDone = true;
        fillBars();
        
    }
    else if(skillsContainerLoc>window.innerHeight)
    {
        animationDone=false;
        initialiseBars();
    }
}
// handel scroll event
window.addEventListener("scroll", reachedSkillSection);

