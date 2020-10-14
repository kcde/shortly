const urlForm = document.querySelector(".url-form")
const shortLinksContainer = document.querySelector(".shortened-links")
const urlInput = document.querySelector(".url-input");
const submitBtn = document.querySelector(".submit");
const copyBtn = document.querySelector(".copy");
const  mainLink = document.querySelector(".main-link");
const shortLink = document.querySelector(".shortLink");
const reLink = "https://rel.ink/"


// function to create shortened links template

const createTemplate = (response) =>{
    if(response.url.length > 25){
        response.url = response.url.slice(0,25)+"....."  
    }
  const template=`
  
  <div class="link">
  <p class="main-link">${response.url}</p>
  <div class="shortened-link">
      <a
          href=${reLink+response.hashid}
          target="_blank"
          class="short-link"
          >${reLink+response.hashid}</a
      >
      <i class="fas fa-clone copy-icon"></i>
      
  </div>
  </div>
  `

  return template
}

const getShortUrl = async () =>{

    try{
        const response = await fetch("https://rel.ink/api/links/",{
             method:"POST",
             headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
             //url should be an object
            body: JSON.stringify({url: urlInput.value})
        })

        
        if(response.ok){
            const jsonResponse = response.json();
            return jsonResponse;
        }

        throw new Error ("Request Failed");
    }
    catch(error){
        console.log(error)
    }
    
}



urlForm.addEventListener("submit", (e)=>{
    e.preventDefault();


    getShortUrl().then((info) => {
        shortLinksContainer.innerHTML+=createTemplate(info);
        urlInput.value = reLink+info.hashid
        submitBtn.classList.add("dn")
        copyBtn.classList.remove("dn")
    })


    // submitBtn.addEventListener("click", ()=>{
    //     submitBtn.classList.add("dn")
    //     copyBtn.classList.remove("dn")
    // })
  
   
     
    


    copyBtn.addEventListener("click", ()=>{
        urlInput.select();
        document.execCommand("copy");

         submitBtn.classList.remove("dn")
         copyBtn.classList.add("dn")

         urlInput.value=""


        
    })

       
        
  
})




shortLinksContainer.addEventListener("click", (e)=>{
if(e.target.classList.contains('copy-icon')){
   console.log(e.target.parentElement.firstElementChild.innerHTML)

   window.navigator.clipboard.writeText(e.target.parentElement.firstElementChild.innerHTML)
}
})





