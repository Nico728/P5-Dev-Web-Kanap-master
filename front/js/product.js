// Récupération de l'id via les paramètres de l'url

const searchParams = new URLSearchParams(window.location.search);
const urlId = searchParams.get("_id");


// Récupération des détails du produit

fetch("http://localhost:3000/api/products/" + urlId)
    .then(function(res) {
        if(res.ok) {
            return res.json();
        }
    })
    .then(function(data) {
        afficheDetail(data);
        bouton(data);
    });


// Fonction Affichage du titre, du nom, de l'image, du prix, de la description, de la couleur
function afficheDetail(data) {
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
}


// Fonction Ajout du bouton
function bouton(data) {
    const boutonAjout = document.querySelector("#addToCart");
    boutonAjout.addEventListener("click", function() {
        const quantiteCanape = document.querySelector("#quantity").value;
        const choixCouleur = document.querySelector("#colors").value;

        if (choixCouleur === "" || quantiteCanape == 0) {
            alert("Veuillez sélectionner une couleur et/ou une quantité");
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
            verifieContenuStorage(canape);
        }
    });
}


// Fonction Local Storage
function verifieContenuStorage(canape) {
    // création variable qui lit le canape dans le local storage
    let locaSto = localStorage.getItem(canape.id +";"+ canape.color);
    //condition si la variable localSto est nul
    if (locaSto == null){
        // alors on stoke les cles id et colors en chaines de caractere du canape
        localStorage.setItem(canape.id +";"+ canape.color, JSON.stringify(canape));
        alert("article ajouté au panier");
    //sinon 
    }else{
        // creation d'une variable qui parse la variable locaSto si id et la couleur sont deja selectionnée
        let doubleArt = JSON.parse(locaSto);
        doubleArt.quantity += canape.quantity;
        localStorage.setItem(doubleArt.id +";"+ doubleArt.color, JSON.stringify(doubleArt));
        alert("article ajouté au panier");
    }
}