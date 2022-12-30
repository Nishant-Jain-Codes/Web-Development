let input = $('#datepicker').datepicker({
    dateFormat: 'yy-mm-dd'
});
let img_container = $('#img_container');
let api_key = "NBlCLhD21Eud5RxMy1TjZoeJedDa1c1qbsnLMIG2";

$('#submit_btn').click(function(event){
    event.preventDefault();
    let date = input.val();
    if(date==="")
    {
        alert("input can't be empty");
        return;
    }
    let url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=" + date + "&api_key=" + api_key;
    $.get(url,function(data){
        let photos_list = data.photos;
        if(photos_list.length===0)
        {
            alert("No photos available for this date");
            return ;
        }
        $('#img_container img').remove();
        for(let photo of photos_list)
        {
            img_container.append('<img src="'+ photo.img_src + '"alt="'+photo.id + '">');
        }
    });
});