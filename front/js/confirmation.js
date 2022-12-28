//Récupération du numéro de commande dans l'URL
const searchParams = new URLSearchParams(window.location.search);
const urlId = searchParams.get("orderId");

//Affichage du numéro de commande
var orderIdNumberElt = document.querySelector('#orderId');
orderIdNumberElt.textContent = urlId;