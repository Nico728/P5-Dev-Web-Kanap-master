// Ajout titre Panier
const titrePanier = document.querySelector("title");
titrePanier.innerText = "Panier";

// Boucle de récupération du localStorage
const tableauObjet = [];

recuperationLocalStorage();
tableauObjet.forEach((obj) => affichageCanape(obj));


function recuperationLocalStorage() {
    let nombreObjetAjoute = localStorage.length;
    console.log("nombre de canapé :", nombreObjetAjoute);
    for (let i = 0; i < nombreObjetAjoute; i++) {
        const objetAjoute = localStorage.getItem(localStorage.key(i));
        const parseObjetAjoute = JSON.parse(objetAjoute);
        tableauObjet.push(parseObjetAjoute);
        console.log(tableauObjet)
    }
}

// Fonction regroupant les balises html
function affichageCanape(obj) {
    const positionDetail = document.querySelector('#cart__items');

// Création de la balise Article 
    const articleCanape = document.createElement('article');
    articleCanape.classList.add('cart__item');
    articleCanape.dataset.id = obj.id;
    articleCanape.dataset.color = obj.color;
    positionDetail.appendChild(articleCanape);

// Création de la balise Div pour l'image
    const divImg = document.createElement('div');
    divImg.classList.add('cart__item__img');
    articleCanape.appendChild(divImg);

// Création de la balise Image dans la div
    const imgCanape = document.createElement('img');
    imgCanape.src = obj.image;
    imgCanape.alt = obj.altImg;
    divImg.appendChild(imgCanape);

// Création de la balise Div qui contient les infos du canapé
    const divGroupe = document.createElement('div');
    divGroupe.classList.add('cart__item__content');
    articleCanape.appendChild(divGroupe);

// Création d'une Div qui contient le nom et la couleur et le prix du produit
    const divDescription = document.createElement('div');
    divDescription.classList.add('cart__item__content__description');
    divGroupe.appendChild(divDescription);

// Création du nom du produit dans la balise divDescription
    const h2Name = document.createElement('h2');
    h2Name.textContent = obj.name;
    divDescription.appendChild(h2Name);

// Création de la couleur du produit dans la balise divDescription
    const pCouleur = document.createElement('p');
    pCouleur.textContent = "Couleur : " + obj.color;
    divDescription.appendChild(pCouleur);

// Récupération du prix et création du prix du produit dans la balise divDescription
    fetch("http://localhost:3000/api/products/" + obj.id)
        .then(function(res) {
            if(res.ok) {
                return res.json();
            }
        })
        .then(function(obj) {
            const pPrix = document.createElement('p');
            pPrix.textContent = "Prix : " + obj.price + " €";
            divDescription.appendChild(pPrix);
        });    

// Création d'une Div qui contient la quantité, de 1-100 produits et la suppression
    const divQuantiteSupp = document.createElement('div');
    divQuantiteSupp.classList.add("cart__item__content__settings");
    divGroupe.appendChild(divQuantiteSupp);

// Création d'une Div pour la quantité et le nombre
    const divQuantite = document.createElement('div');
    divQuantite.classList.add("cart__item__content__settings__quantity");
    divQuantiteSupp.appendChild(divQuantite);

// Création d'une balise p pour la quantité
    const pQuantite = document.createElement('p');
    pQuantite.textContent = "Qté : ";
    divQuantite.appendChild(pQuantite);

// Création d'un Input pour la gestion de la quantité
    const inputQuantite = document.createElement('input');
    inputQuantite.classList.add('itemQuantity');
    inputQuantite.setAttribute('type','number');
    inputQuantite.setAttribute('name','itemQuantity');
    inputQuantite.setAttribute('min','1');
    inputQuantite.setAttribute('max','100');
    inputQuantite.setAttribute('value', obj.quantity);
    divQuantite.appendChild(inputQuantite);

// Création d'une Div pour la suppression
    const divSupp = document.createElement('div');
    divSupp.classList.add("cart__item__content__settings__delete");
    divQuantite.appendChild(divSupp);

// Création d'une balise p pour supprimer
    const pSupp = document.createElement('p');
    pSupp.classList.add("deleteItem");
    pSupp.textContent = "Supprimer";
    divSupp.appendChild(pSupp);

    calculPrix(obj);
}

// Fonction qui permet de savoir si notre panier est vide, si il est vide alors on affiche panier vide sinon,
// on gère la quantité et le prix
function calculPrix(obj) {
    if (tableauObjet == null) {
        const creationP = document.createElement('p');
        creationP.textContent = 'Votre panier est vide';
        positionDetail.appendChild(creationP);
        console.log("votre panier est vide")
    } else { 
        console.log("votre panier contient des articles")
        // On gère la quantité
        let totalQ = 0;
        const totalQuantite = document.querySelector("#totalQuantity");
        tableauObjet.forEach((obj) => {
            const calculTotalQuantite = totalQ + obj.quantity;
            totalQ = calculTotalQuantite;
        })
        console.log(totalQ);
        totalQuantite.textContent = totalQ;
        // On gère le prix
        let totalP = 0;
        const totalPrix = document.querySelector("#totalPrice");
        tableauObjet.forEach((obj) => {
            const calculTotalPrix = obj.price * obj.quantity;
            totalP += calculTotalPrix;
        })
        console.log(totalP);
        totalPrix.textContent = totalP;
    }
}





























// Formulaire

const formulaire = document.querySelector(".cart__order__form");
