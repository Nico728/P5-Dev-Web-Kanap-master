// Faire le lien entre un produit de la page d’accueil et la page Produit

const searchParams = new URLSearchParams(document.location.search);
const id = searchParams.get("_id");
console.log(id);

//récupération des produits

fetch('http://localhost:3000/api/products/${id}')
.then(function(res) {
  if (res.ok) {
    return res.json();
  }
})
.then(function(value) {
  let descriptionCanape = document.getElementById('description');
  let prixCanape = document.getElementById('prix');
  let imageCanape = document.createElement('img');
  let titreCanape = document.querySelector('title');
  
})

.catch(function(err) {
  console.log("erreur 404, sur ressource api :" + err);
  document.querySelector("titles").innerHTML = "<h1> erreur 404, not found</h1>";
});