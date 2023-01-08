const form=document.querySelector("#searchform")

form.addEventListener('submit', async function(e){
    e.preventDefault();
    const searchterm=form.query.value;
    const config={params:{q:searchterm}}
    const res= await axios.get("https://api.tvmaze.com/search/shows",config);
    images(res.data);
    form.query.value="";
    
})

const images=(shows)=>{
    let allImages=document.images;
    for(let i of allImages)
    {
        i.remove();
    }
    for(let result of shows)
    {
        if(result.show.image)
        {
        const img=document.createElement('img');
        img.src= result.show.image.medium;
        document.body.appendChild(img);
        }
    }   
}