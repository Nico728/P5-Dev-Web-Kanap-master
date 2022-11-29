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

// Création du prix du produit dans la balise divDescription
    var productUnit = "";
    fetch("http://localhost:3000/api/products/" + obj.id)
        .then(response => response.json())
        .then(async function (resultatAPI) {
            productUnit = await resultatAPI;
    // insertion P price
            const pPrix = document.createElement('p');
            pPrix.textContent = "Prix : " + obj.price + " €";
            divDescription.appendChild(pPrix);
        })
        .catch(error => alert("Erreur : " + error));

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
    pQuantite.textContent = "Qté : " + obj.quantity;
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
}






















/*
function afficheDetail(canape) {
    const positionDetail = document.querySelector('#cart__items');

// Création de la balise Article 
    const articleDetail = document.createElement('article');
    articleDetail.className = 'cart__item';
    articleDetail.setAttribute('data-id', canape._id);
    articleDetail.setAttribute('data-color', canape.color);
    positionDetail.appendChild(articleDetail);

// Création de la balise Div pour l'image
    const divImg = document.createElement('div');
    divImg.className = 'cart__item__img';
    articleDetail.appendChild(divImg);

// Création de la balise Image dans la div
    const baliseImg = document.createElement('img');
    baliseImg.setAttribute('src', canape.img);
    baliseImg.setAttribute('alt', "Photographie d'un canapé");
    divImg.appendChild(baliseImg);

// Création de la balise Div qui contient les infos du canapé
    const divGroupe = document.createElement('div');
    divGroupe.className = 'cart__item__content';
    articleDetail.appendChild(divGroupe);

// Création d'une Div qui contient le nom et la couleur et le prix du produit
    const divDescription = document.createElement('div');
    divDescription.className = "cart__item__content__description";
    divGroupe.appendChild(divDescription);

// Création du nom du produit dans la balise divDescription
    const h2Name = document.createElement('h2');
    h2Name.textContent = canape.name;
    divDescription.appendChild(h2Name);

// Création de la couleur du produit dans la balise divDescription
    const pCouleur = document.createElement('p');
    pCouleur.textContent = "Couleur : " + canape.color;
    divDescription.appendChild(pCouleur);

// Création du prix du produit dans la balise divDescription
    const pPrix = document.createElement('p');
    pPrix.textContent = "Prix : " + canape.price + " €";
    divDescription.appendChild(pPrix);

// Création d'une Div qui contient la quantité, de 1-100 produits et la suppression
    const divQuantiteSupp = document.createElement('div');
    divQuantiteSupp.textContent = "cart__item__content__settings";
    divGroupe.appendChild(divQuantiteSupp);

// Création d'une Div pour la quantité et le nombre
    const divQuantite = document.createElement('div');
    divQuantite.className = "cart__item__content__settings__quantity";
    divQuantiteSupp.appendChild(divQuantite);

// Création d'une balise p pour la quantité
    const pQuantite = document.createElement('p');
    pQuantite.textContent = "Qté : ";
    divQuantite.appendChild(pQuantite);

// Création d'un Input pour la gestion de la quantité
    const inputQuantite = document.createElement('input');
    inputQuantite.className = 'itemQuantity';
    inputQuantite.setAttribute('type','number');
    inputQuantite.setAttribute('name','itemQuantity');
    inputQuantite.setAttribute('min','1');
    inputQuantite.setAttribute('max','100');
    inputQuantite.setAttribute('value', canape.quantity);
    divQuantite.appendChild(inputQuantite);

// Création d'une Div pour la suppression
    const divSupp = document.createElement('div');
    divSupp.className = "cart__item__content__settings__delete";
    divQuantite.appendChild(divSupp);

// Création d'une balise p pour supprimer
    const pSupp = document.createElement('p');
    pSupp.className = "deleteItem";
    pSupp.textContent = "Supprimer";
    divSupp.appendChild(pSupp);
}






const articleCanape = montreArticle(obj);
    positionArticleCanape(articleCanape);
    console.log(articleCanape)
    
    const divImg = montreImage(obj);
    articleCanape.appendChild(divImg);

    const divGrandContenu = montreContenuDescriptionParams(obj);
    articleCanape.appendChild(divGrandContenu);
}

// Fonction création div regroupant la description et les parametres
function montreDivGrandContenu() {
    const divGroupe = document.createElement('div');
    divGroupe.classList.add('cart__item__content');
}

// Fonction création div avec description et div avec parametre
function montreContenuDescriptionParams(obj) {
    const description = montreDescription(obj);
    const parametre = montreParams(obj);
}

// Fonction création div avec parametre
function montreParams(obj) {}

// Fonction création div avec description
function montreDescription(obj) {
    const divGroupe = document.createElement('div');
    divDescription.classList.add('cart__item__content__description');

    const h2Name = document.createElement('h2');
    h2Name.textContent = obj.name;

    const pCouleur = document.createElement('p');
    pCouleur.textContent = obj.color;

    divGroupe.appendChild(divDescription);
    divDescription.appendChild(h2Name);
    divDescription.appendChild(pCouleur);
    return description;
}

// Fonction position de l'article
function positionArticleCanape(articleCanape) {
    document.querySelector('#cart__items').appendChild(articleCanape);
}

// Fonction création de l'article
function montreArticle(obj) {
    const articleCanape = document.createElement('article');
    articleCanape.classList.add('cart__item');
    articleCanape.dataset.id = obj.id;
    articleCanape.dataset.color = obj.color;
    return articleCanape;
}

// Fonction création de l'image dans une div
function montreImage(obj) {
    const divImg = document.createElement('div');
    divImg.classList.add('cart__item__img');

    const imgCanape = document.createElement('img');
    imgCanape.src = obj.image;
    imgCanape.alt = obj.altImg;
    divImg.appendChild(imgCanape);
    return divImg;
}
afficheDetail();*/