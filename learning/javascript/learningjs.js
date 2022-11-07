function alertThrower(message)
{
    alert(message);
}
var hellobtn = document.getElementById('btn');
hellobtn.addEventListener('click',alertThrower ('hello') ,);