var siteName = document.getElementById('siteName');
var siteUrl = document.getElementById('siteUrl');
var table = document.getElementById("table");
var globalindex;
var addBtn = document.querySelector('#addBtn');
var btn2 = document.querySelector('#updateBtn');
var search = document.querySelector('#search');
var siteError = document.querySelector('#siteError');
var urlError =document.querySelector('#urlError');
var sitelist;


if (localStorage.getItem('sitelist')) {
    sitelist= JSON.parse(localStorage.getItem('sitelist'));
    displaySites(sitelist);  
  }else{
      sitelist =[];
  }

addBtn.addEventListener("click", function addSite(){

    if (siteNameValdition()===true && urlValdition()===true) {
        var sites = {
            site:siteName.value,
            url:siteUrl.value,
         }
         sitelist.push(sites);
         displaySites(sitelist);
         clear();
         saveTolocalstoarge();
    }else{
        console.log('eror');
        
    }
    
})



function displaySites(slist , term) {
    var cartoona ="";
        for (var i=0 ; i<slist.length ; i++){

            cartoona+=`<tr>
                <th scope="row">${[i+1]}</th>
                <td>${term?slist[i].site.toLowerCase().replace(term,`<span class='fw-bolder bg-warning'>${term}</span>`):slist[i].site}</td>
                 <td><a href="${slist[i].url}"><button type="button" class="btn btn-success"><i class="fa-solid fa-eye"></i> view </button></a></td>
                <td><button onclick='deleteSite(${i})'  type="button" class="btn btn-danger" ><i class="fa-solid fa-trash"></i> Delete</button></td>
                <td><button onclick='setFormToupdate(${i})'  type="button" class="btn btn-warning">Update</button></td>
              </tr>`
        }
       table.innerHTML=cartoona;
}

function deleteSite(index) {
    sitelist.splice(index , 1);
    displaySites(sitelist);
}

function clear() {
   siteName.value = null;
   siteUrl.value=null; 
}



function setFormToupdate(index) {
    console.log(index);
    siteName.value = sitelist[index].site;
    siteUrl.value= sitelist[index].url;
    addBtn.classList.add('d-none');
    btn2.classList.remove('d-none');
    globalindex = index;
}

btn2.addEventListener('click' , function updateSite(){
sitelist[globalindex].site =  siteName.value;
sitelist[globalindex].url = siteUrl.value;
displaySites(sitelist);
addBtn.classList.remove('d-none');
btn2.classList.add('d-none');
})


search.addEventListener('input' , function searchSite() {
    var term = search.value;
    var searchList = [];
    for (var i = 0; i < sitelist.length; i++){
        if (sitelist[i].site.toLowerCase().includes(term.toLowerCase())) {
            console.log('match',sitelist[i],i);
            searchList.push(sitelist[i]);
            displaySites(searchList);
        }else{
            console.log('not match');
        }
    }
    displaySites(searchList , term)
} )

function siteNameValdition() {
    var regex = /^[A-Z][a-z]{3,8}$/;
    if (regex.test(siteName.value)) {
        siteError.classList.replace('d-block' , 'd-none' )
        return true;
    }else{
        siteError.classList.replace('d-none' , 'd-block' )
        return false;
    }
}

function urlValdition(){
    var regex1 = /^(https?:\/\/)?((([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-zA-Z0-9%_.~+]*)*(\?[;&a-zA-Z0-9%_.~+=-]*)?(#[a-zA-Z0-9_-]*)?$/i;
    if (regex1.test(siteUrl.value)) {
        urlError.classList.replace('d-block' , 'd-none' )
        return true;
    }else{
        urlError.classList.replace('d-none' , 'd-block' )
        return false;
    }
}

function saveTolocalstoarge(){
    window.localStorage.setItem('sitelist' , JSON.stringify(sitelist))
}

