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
                let cart = [];
                if (localStorage.getItem("cart")) {
                    cart = JSON.parse(localStorage.getItem("cart"));
                }
                
                // Entrée objet pour chaque article ajouté au panier

                let canape = {
                    idCanape: ID,
                    name: data.name,
                    color: choixCouleur,
                    quantity: Number(quantiteCanape),
                    description: data.description,
                    image: data.imageUrl,
                    altImg: data.altTxt,
                };

                // Gestion de l'ajout de produits identiques
                let foundProduct = cart.find((p) => p.id === canape.id && p.name === canape.name && p.color === canape.color);

                if (foundProduct === undefined) {
                    cart.push(canape);
                } else {
                    foundProduct.quantity += canape.quantity;
                }
                // Fin de gestion

                localStorage.setItem("cart", JSON.stringify(cart));

                alert("Votre produit a été ajouté au panier");
                window.location.href = "./cart.html";
            }
        });
    });