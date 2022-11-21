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
            verifieContenuStorage(canape);
        }
    });
}


// Fonction Local Storage
function verifieContenuStorage(canape) {
    console.log(canape);
    // création tableau storage
    let tableauStorage = [];
    // lecture du localstorage
    if (localStorage.getItem("panier")) {
    tableauStorage = JSON.parse(localStorage.getItem("panier"));
    }
    //tableauStorage = {canape}
    //tableauStorage = Object.keys(canape).map(canape);
    console.log(tableauStorage);
    if (tableauStorage == null){
        tableauStorage = localStorage.setItem(canape.id, JSON.stringify(canape));
        console.log(tableauStorage)
    }else{  
        console.log(canape.id)
        console.log(tableauStorage.id)
        console.log(tableauStorage.color)
        console.log(canape)
        if(canape.id == tableauStorage.id && canape.color == tableauStorage.color){
            console.log("Ca existe déjà")
            tableauStorage.quantity = tableauStorage.quantity + canape.quantity
        }else{
            console.log("Ca n'existe pas")
            tableauStorage.quantity += canape.quantity
            localStorage.setItem(canape.id, JSON.stringify(canape));
            console.log(tableauStorage);
        }
    }
}
/*function ajoutPanier(canape) {
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
//*

function verifieContenuStorage(canape) {
console.log(canape);
let tableauStorage = [];

tableauStorage = localStorage.getItem(canape.id);
console.log(tableauStorage);
if (tableauStorage == null){
    localStorage.setItem(canape.id, JSON.stringify(canape));
}else{  
    console.log(canape.id)
    console.log(tableauStorage.id)
    console.log(tableauStorage)
    console.log(canape)
    if(canape.id == tableauStorage.id && canape.color == tableauStorage.color){
        console.log("Ca existe déjà")
        tableauStorage.quantity = tableauStorage.quantity + canape.quantity
    }else{
        console.log("Ca n'existe pas")
        tableauStorage.quantity = tableauStorage.quantity + canape.quantity
        localStorage.setItem(canape.id, JSON.stringify(canape));
        
    }
}
}*/