// Récupération de l'id via les paramètres de l'url

const searchParams = new URLSearchParams(window.location.search);
const urlId = searchParams.get("id");
console.log(searchParams);

// Récupération des détails du produit

fetch("http://localhost:3000/api/products/")
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
    })
