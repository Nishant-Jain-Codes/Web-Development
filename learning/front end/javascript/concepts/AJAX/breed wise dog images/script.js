let dogBreedList = $('#dog-breed-select');
let dog_img_container = $('#dog-img-container');
let currentBreed;
let allowSubmit = true;
// setting up selection list
$.get("https://dog.ceo/api/breeds/list/all",function(data){
    let dogList = data.message;
    console.log(dogList);
    for(let breed in dogList)
    {
        dogBreedList.append('<option value="' + breed + '">' + breed + '</option>');
    }
});
// change permission to summit if the breed is changed 
dogBreedList.change(function(){
    allowSubmit=true;
})
$('#get-image').click(function(event){
    event.preventDefault();
    if(allowSubmit)
    {
        let breed = dogBreedList.val();
        currentBreed=breed;
        displayDog(breed)
        allowSubmit = false;
    }
})
$('#next').click(function(event){
    event.preventDefault();
    if(currentBreed!==undefined)
    {
        displayDog(currentBreed);
    }
})
function displayDog(breed)
{
    let url = 'https://dog.ceo/api/breed/' + breed + '/images/random';
    $('#dog-img-container img').remove();
    $.get(url,function(data){
        let imgURL = data.message;
        dog_img_container.append('<img src="' + imgURL + '" alt="' + breed + '">');
    });
}