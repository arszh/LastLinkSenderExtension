
const URL = "http://localhost:3000/url"
const NAME = "Arsen"

const build =   (elementsId) => {
  chrome.history.search({  'text': '' } , (historyItems) => {
    const lastUrl = historyItems[0].url;
   
    sendUrlToServer(lastUrl,  (error) =>buildPopupDom(error,elementsId, lastUrl));
  });

}

const buildPopupDom = (error,elementsId, data) => {
  const urlElement = document.getElementById(elementsId.url);
  const messageElement = document.getElementById(elementsId.message);
  
  if(error){
    messageElement.innerHTML =  error
  }else {
    urlElement.innerHTML =  data
  }
  
}


const sendUrlToServer =   (lastUrl,callback) => {
  
    let fetchData = { 
      method: 'POST', 
      body: JSON.stringify({
        lastUrl,
        name: NAME
      }),
      headers: {"Content-Type": "application/json"}
    }


    fetch(URL,fetchData).then(handleErrors).then(()=>{
      callback();
    }).catch((err)=> {
      callback(err)
    });
}

const  handleErrors = (response)  => {

  if (!response.ok) {
      throw Error(response.statusText);
  }
  return response;
}


document.addEventListener('DOMContentLoaded', () =>{
  build({url: "url", message:"message"});
});