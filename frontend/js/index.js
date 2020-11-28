
const urlApi = "http://localhost:3000/api/teddies";// je stocke l'URL de l'API dans une variable
let teddiesArray=""; 
const teddiesContainer = document.querySelector('#teddies-container');

// je crée ma requete
let requete = new XMLHttpRequest;
requete.open('GET', urlApi);
requete.responseType = 'json'; 
requete.send(); // j'envoie ma requete
// Dès qu'on reçoit la réponse, on execute la fonction:
requete.onload = function () { 
    if (requete.readyState === XMLHttpRequest.DONE ) { // je verifie l'état de ma requête. 
        if (requete.status === 200 ||requete.status === 201){
             teddiesArray = requete.response; // je stocke la reponse dans une variable.
            console.log(teddiesArray);
            afficherTeddies(); // J'affiche dynamiquement les teddies en utilisant la fonction.
            }
        
    } else {
        alert("Un problème est survenu, merci de réessayer plus tard");
    }
 }
  // creation de la fonction pour afficher les teddies. 
  function afficherTeddies() {
    teddiesArray.forEach(afficherTeddie);
}
// creation de la fonction pour afficher un teddi
 function afficherTeddie(teddy) {
     const teddyElement = document.createElement('div');  
     teddyElement.setAttribute("class","col-lg-5 col-md-6 mb-4 item-card")
     teddyElement.innerHTML = `  <div class="card text-center"> <div class="card-header"><h2> ${teddy.name}</h2>
         <p> ${teddy.price/100} € </p> </div>
        <div class="card-body"><img class="card-img-top" src="${teddy.imageUrl}" alt="">
         <p class="card-text">${teddy.description} </p> </div>
         <div class="card-footer text-muted">
         <button type="button" class="btn btn-secondary btn-lg btn-block" ><a href="product.html?id=${teddy._id}"> Sélectionnez moi </a> </button>
       </div> </div>`;
    teddiesContainer.appendChild(teddyElement);
     
 }
 




