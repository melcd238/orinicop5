// recuperation de la reponse de confirmation et du prix total de la commande 
let confirmation = JSON.parse(sessionStorage.getItem("confirm"));
console.log(confirmation);
let totalPrice = sessionStorage.getItem("TotalPrice");
console.log(totalPrice)
// affichage de la confirmation de commande
affichageConfirmOrder();



    function affichageConfirmOrder() {
    const confirmOrder = document.getElementById('confirmationOrder');
     confirmOrder.innerText = ` Merci de votre commande n°: ${confirmation.orderId}.
     Le prix total de votre commande est de : ${totalPrice}€.
     Vous allez recevoir un mail de confirmation à cette adresse : ${confirmation.contact.email}.
     Si vous ne recevez pas d'email, merci de contacter notre service client. `; 
     
    }

 // supression du sessionStorage    

 sessionStorage.clear();