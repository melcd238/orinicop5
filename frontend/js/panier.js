const divAffichageTeddiStore = document.querySelector(".affichageTeddiStore");
const validation = document.querySelector('#validate');
const teddiContainerPanier = document.querySelector("#container-panier2");
const containerForm = document.querySelector("#container-form");


// recuperer les données stocker dans le localstorage 
function recupTeddies() {
    let teddiesStore = JSON.parse(localStorage.getItem("teddiesInCart"));
    if (teddiesStore === null || teddiesStore === "undefined") {
        teddiesStore = [];
    }
    return teddiesStore;  
}

let teddiesStore = recupTeddies();
console.log(teddiesStore);

// fonction pour afficher les teddi
// si le panier est vide :
if (teddiesStore.length === 0 || teddiesStore === null && getComputedStyle(validation).display == "block") {
    validation.style.display =" none";
    let panierVide = document.createElement("div");
    panierVide.innerHTML = `<p> Votre panier est vide </p>
    <button type="button" class="btn btn-secondary btn-lg btn-block" > <a href = "index.html"> Retour au store</a> </button> `
    teddiContainerPanier.appendChild(panierVide);
    
    
    
// s'il y a des teddi dans le panier : 
} else {
const displayTeddi = () => {
    const teddiesStoreNode = teddiesStore.map((teddi , index) => {
        return createTeddiElement(teddi, index);
    });
    divAffichageTeddiStore.innerHTML =" ";
    // j'utilise l'operateur spread pour retourner une liste et pas un tableau
    divAffichageTeddiStore.append(...teddiesStoreNode);
    
    
    
};
// fonction pour creer l'element  teddi 
const createTeddiElement = (teddi , index) =>{
     const ul = document.createElement('ul');
     ul.setAttribute("class","ulDisposition");
     ul.innerHTML = `
     <li class="liDisp">Article
     <ul>
      <li>${teddi.tedName} </li>
      <li><img src="${teddi.tedImage}" width= 80px heigt= 80px></li>
      <li>${teddi.tedColor}</li>
     </ul></li>
      <li class="liDisp">Quantité<ul>
      <li>${teddi.tedQuantite}</li></ul></li>
      <li class="liDisp">Prix unitaire<ul>
      <li>${teddi.tedPrice}</li></ul></li>
     <li class="liDisp">Prix total<ul><li>${teddi.totalPrice}</li>
     </ul></li>
     <li class="liDisp">Supprimer
     <ul>
    <li> <button class="deleteBtn"><i class="far fa-trash-alt"></i></button></li>
    </ul></li> `;
    const btnDelete = ul.querySelector('.deleteBtn');

    btnDelete.addEventListener('click', async ()=>{
       const result = await openModalPanier(`Voulez-vous vraiment supprimer cet article?`);
       console.log(result);
       // si la promesse est resolve, on delete le teddi sinon on ne fair rien
       if (result) {
         deleteTeddi(index);
       }
        
        
    });
    
    return ul;
};
// fonction deleteTeddi qui sera appeler à l'interieur de l'evenement btnDelete
const deleteTeddi = (index)=>{
    teddiesStore.splice(index,1);
    localStorage.setItem("teddiesInCart", JSON.stringify(teddiesStore)) 
    JSON.parse(localStorage.getItem("teddiesInCart"));
    displayTeddi();
    compteurPanierPrixTotal();
    

}
// incrementation du panier et  calcul du prix total de la commande:

const compteurPanierPrixTotal = () =>{
  let arrayCompteurPanier =[] ;
  let arrayPrixTotal =[];
  for (const teddiInStore of teddiesStore) {
    let itemQte = teddiInStore.tedQuantite;
    arrayCompteurPanier.push(itemQte); 
    console.log(arrayCompteurPanier);
    let prix = teddiInStore.totalPrice;
    arrayPrixTotal.push(prix);}
    console.log(arrayPrixTotal);
    if (arrayCompteurPanier.length === 0 ) {
      location.assign('panier.html');
   }else {
  let compteurPanier = arrayCompteurPanier.reduce((accumulater, valeurCourante)=> accumulater+ valeurCourante);
  let itemInCart = document.querySelector('#cart-qte');
  itemInCart.innerHTML=`${compteurPanier}`;}
  let prixTotal = arrayPrixTotal.reduce((accumulater, valeurCourante)=> accumulater+ valeurCourante);
  const prixTotalCommande = document.querySelector('#totalPricePanier');
  prixTotalCommande.innerHTML= `PRIX TOTAL: ${prixTotal}€`;
  sessionStorage.setItem("TotalPrice", prixTotal);
 

}

// fonction pour recupérer le formulaire au click sur le bouton validez votre commande:
function form() {
    if (getComputedStyle(containerForm).display == "none" ||getComputedStyle(validation).display == "block" || getComputedStyle(teddiContainerPanier).display == "block" ){
      // on recupere la valeur courante de la propriété display sur les const avec getComputedStyle(const).display
     containerForm.style.display = "block";
     validation.style.display = "none";
     teddiContainerPanier.style.display = "none";
    }
  }
validation.addEventListener('click',form);


// recupération des données du formulaire et de mon tableau de produit au click sur le bouton Envoyez votre commande : 
const submit = document.getElementById('submitorder');
submit.addEventListener('click',(e)=>{
 
    e.preventDefault();
    commandePanier();
});



const commandePanier = () =>{
     let orderInput = document.getElementsByTagName('input');
       if (orderInput[0].value && orderInput[0].validity.valid && orderInput[1].value && orderInput[1].validity.valid  && orderInput[2].value && orderInput[2].validity.valid  && orderInput[3].value && orderInput[3].validity.valid  && orderInput[4].value && orderInput[4].validity.valid ) {
        let contact = {
          firstName: orderInput[0].value,
          lastName: orderInput[1].value,
          address: orderInput[2].value,
          city: orderInput[3].value,
          email: orderInput[4].value
        }
        
      console.log(contact);
      let teddiesStore = JSON.parse(localStorage.getItem("teddiesInCart"));
      console.log(teddiesStore);
      let products = [];
      for (const teddiInStore of teddiesStore) {
           let productsId = teddiInStore.tedId;
           products.push(productsId);
           console.log(products);
       }
      let order = { contact, products };
      console.log(order);


      // requete post 
      const reponseOrder =fetch("http://localhost:3000/api/teddies/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
       body: JSON.stringify(order)
      });
      //reponse de la requete
      reponseOrder.then(async response => {
        try {
         console.log(response);
          let confirmation = await response.json();
          console.log(confirmation);
         if (typeof localStorage != "undefined") {
          sessionStorage.setItem("confirm", JSON.stringify(confirmation));
          localStorage.removeItem("teddiesInCart");
         window.location.href ="confirm.html";
         } else {
           alert("localStorage n'est pas supporté");
        }
        
       } catch (error) {
         console.log(error);
         alert("Un problème est survenu, merci de réessayer plus tard");
       }
      });

       } else {
         alert("Merci de remplir tous les champs! ou de vérifier la conformité avec le format attendu!!")
       } 

    }

 
 compteurPanierPrixTotal();
displayTeddi();
}