// Récupération de l'id via les paramètres de l'url

const searchParams = new URLSearchParams(window.location.search);
const urlId = searchParams.get("_id");
console.log(urlId);

// Récupération des détails du produit

fetch("http://localhost:3000/api/products/" + urlId)
    .then(function(res) {
        if(res.ok) {
            console.log(res.json);
            return res.json();
        }
    })
    .then(function(data) {
        // Affichage du titre, du nom, de l'image, du prix, de la description, de la couleur
        const titre = document.querySelector("title");
        titre.innerText = data.name;

        const titreH1 = document.querySelector("#title");
        titreH1.innerText = data.name;

        const imageCanape = document.createElement("img");
        imageCanape.src = data.imageUrl;
        imageCanape.alt = data.altTxt;
        const canapeImage = document.querySelector(".item__img");
        canapeImage.appendChild(imageCanape);

        const prixCanape = document.querySelector("#price");
        const prix = data.price;
        prixCanape.innerText = prix;

        const descriptionCanape = document.querySelector("#description");
        descriptionCanape.innerText = data.description;

        const couleurCanape = document.querySelector("#colors");
        const couleur = data.colors;
        for (let i = 0; i < couleur.length; i++) {
            const couleurDuCanape = couleur[i];
            const optionCouleur = document.createElement("option");
            optionCouleur.textContent = couleurDuCanape;
            optionCouleur.value = couleurDuCanape;
            couleurCanape.appendChild(optionCouleur);
        }

        // Ajout du bouton

        const boutonAjout = document.querySelector("#addToCart");
        boutonAjout.addEventListener("click", function() {
            const quantiteCanape = document.querySelector("#quantity").value;
            const choixCouleur = document.querySelector("#colors").value;

            if (choixCouleur === "") {
                alert("Veuillez sélectionner une couleur");
            } 
            if (quantiteCanape == 0) {
                alert("Veuillez sélectionner une quantité");
            } 
            else {
                let canape = {
                    id: data._id,
                    name: data.name,
                    color: choixCouleur,
                    quantity: Number(quantiteCanape),
                    description: data.description,
                    image: data.imageUrl,
                    altImg: data.altTxt,
                };
                ajoutPanier(canape);
            }
        });
    });

function ajoutPanier(canape) {
    console.log(canape)
    // stockage de la clé panier dans la valeur canapé en chaîne de caractère
    localStorage.setItem("panier", JSON.stringify(canape));
    // création tableau vide panier
    let panier = [];
    console.log("le panier", panier);
    // récupération du panier dans le localstorage
    panier = localStorage.getItem("panier");
    // ajout de l'id, de la quantité et de la couleur dans le panier

}

// panier = JSON.parse(localStorage.getItem("panier"));
