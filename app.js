const formWrapper = document.querySelector(".form-wrapper");
const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");
const buttonWrapper = document.querySelector(".button-wrapper");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const imageWrapper = document.querySelector(".image-list-wrapper");


runEventListener();

function runEventListener(){
    form.addEventListener("submit",search);
    clearButton.addEventListener("click",clear);
}

function clear(e){
    searchInput.value ="";
    Array.from(imageWrapper.children).forEach((child)=>child.remove)
}

function search(e){
  
    const value = searchInput.value.trim();

    fetch(`https://api.unsplash.com/search/photos?query=${value}`, {
        method : "GET",
        headers : {
            Authorization : "Client-ID KS7dVrdmWXpxVay_EvM2vfqyZa9_XYMVFeaq334ZeWY"
        }
    })

    //fetch promise döndürdüğü için then kullanıyoruz.

    .then((res)=> res.json())
    .then((data)=>{
        Array.from(data.results).forEach((image)=>{
            addImageToUI(image.urls.small)
        })
    })
    .catch((err)=>console.log(err));

   e.preventDefault();
}

function addImageToUI(url){
      const div = document.createElement("div");
      div.className = "card";

      const img = document.createElement("img");
      img.setAttribute("src",url); // src kısmına urlyi verme
      img.height="400";
      img.width="400";

      div.appendChild(img);
      imageWrapper.appendChild(div);
}