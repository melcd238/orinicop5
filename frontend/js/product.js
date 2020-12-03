const urlApi = "http://localhost:3000/api/teddies";
const searchParams = new URLSearchParams(window.location.search);
const itemId = searchParams.get("id");
const urlApiId = urlApi + "/"+itemId;
console.log(itemId);
const teddiContainer = document.querySelector('#container-teddi');
let btn = document.querySelector(".add-to-cart");
  console.log(btn);



const appelDeApi = async function ()  {
    let response = await fetch(urlApiId);
    if (response.ok) {
      let itemTed = await response.json();
      console.log(itemTed);
      //fonction pour afficher l ' item
      afficherUnItem(itemTed);
      // A l'ecoute du bouton ajout panier 
      btn.addEventListener("click",()=>{
        let choixTeddi = {
          tedName : itemTed.name,
          tedId   : itemTed._id,
          tedImage: itemTed.imageUrl,
          tedPrice: itemTed.price/100,
          tedColor: document.getElementById("choix-couleur").value,
          tedQuantite :parseInt( document.getElementById("qte").value),
          get totalPrice (){
                return this.tedPrice * this.tedQuantite;
                
          }
           };
         if(typeof localStorage != "undefined"){
          // on recupère la valeur dans le Web Storage
        let teddiesStore = JSON.parse(localStorage.getItem("teddiesInCart"));
              if (teddiesStore === null || teddiesStore === "undefined") {
                teddiesStore = []; // on crée le tableau 
               
                 } 
               if(teddiesStore) {
                teddiesStore.push(choixTeddi); // si le tableau existe on push le choix du teddi
               } 
              localStorage.setItem("teddiesInCart", JSON.stringify(teddiesStore));
              openModal(`${itemTed.name} a bien été ajouté au panier. Voulez-vous continuer vos achats?`);
            } else {
              alert("localStorage n'est pas supporté");
            }
           
      });
  
      
     }
};

//fonction pour afficher l'item
function afficherUnItem(itemTed) {
   let itemTeddie = document.createElement("div");
  itemTeddie.innerHTML = `  <div class="card text-center"> <div class="card-header"><h2> ${itemTed.name}</h2>
  <p> ${itemTed.price/100} € </p> </div>
 <div class="card-body"><img class="card-img-top" src="${itemTed.imageUrl}" alt="">
  <p class="card-text">${itemTed.description} </p> </div>
 <div class="card-footer text-muted">
  <form>
  <div class="form-group">
    <label for="quantité">Choisissez une quantité (<em> Dans la limite de 5 oursons </em>) </label>
    <select class="form-control" id="qte" name="quantité">
    </select>
  </div><div class="form-group">
  <label>Choisissez une couleur </label>
  <select class="form-control" id="choix-couleur">
  </select> </div></form></div>`;
teddiContainer.appendChild(itemTeddie);
compteur();
optionCouleur(itemTed);
  
};

// fonction pour la quantité
function compteur() {
  let optionQuantite = document.getElementById("qte");
  for (let nbr = 1; nbr <= 5; nbr++) {
     let newQuantite = document.createElement("option");
     newQuantite.innerText += nbr;
     optionQuantite.append(newQuantite);
   }
};
// fonction pour afficher les options de couleurs.
function optionCouleur(itemTed) {
  let optionCouleur = document.getElementById("choix-couleur")
  for (let i = 0; i < itemTed.colors.length; i++) {
    let newOptionCouleur = document.createElement("option")
    newOptionCouleur.innerText = itemTed.colors[i];
    optionCouleur.append(newOptionCouleur);
  }
};
appelDeApi();

