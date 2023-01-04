// Ajout titre Panier
const titrePanier = document.querySelector("title");
titrePanier.innerText = "Panier";

// Boucle de récupération du localStorage
const tableauObjet = [];

recuperationLocalStorage();
tableauObjet.forEach((obj) => affichageCanape(obj));

function recuperationLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
        const objetAjoute = localStorage.getItem(localStorage.key(i));
        const parseObjetAjoute = JSON.parse(objetAjoute);
        tableauObjet.push(parseObjetAjoute);
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
    inputQuantite.addEventListener("input", () => gererQuantitePrix(obj.id, inputQuantite.value, obj, obj.color))
    divQuantite.appendChild(inputQuantite);

// Création d'une Div pour la suppression
    const divSupp = document.createElement('div');
    divSupp.classList.add("cart__item__content__settings__delete");
    divSupp.addEventListener("click",() => supprimeCanape(obj));
    divQuantite.appendChild(divSupp);

// Création d'une balise p pour supprimer
    const pSupp = document.createElement('p');
    pSupp.classList.add("deleteItem");
    pSupp.textContent = "Supprimer";
    divSupp.appendChild(pSupp);
}


// Fonction qui permet de savoir si notre panier est vide, si il est vide alors on affiche panier vide sinon,
// on gère la quantité et le prix
function quantitePrix() {
    let prixTotal = 0
    let quantiteTotal = 0
    if (tableauObjet == null) {
        const creationP = document.createElement('p');
        creationP.textContent = 'Votre panier est vide';
        positionDetail.appendChild(creationP);
    } else { 
        // On calcul la quantité et le prix
        tableauObjet.forEach((obj) => {
            fetch("http://localhost:3000/api/products/" + obj.id)
            .then(function(res) {
                if(res.ok) {
                    return res.json();
                }
            })
            .then(function(cnp) {
                prixTotal = prixTotal + calculPrix(cnp, obj);
                quantiteTotal = quantiteTotal + calculQuantite(obj);
                affichageQuantitePrix(prixTotal, quantiteTotal)
            }); 
        }) 
    }
}
quantitePrix();

// Fonction calcul prix
function calculPrix(cnp, obj) { 
    let prixTotalArticle = 0; 
    prixTotalArticle = cnp.price * obj.quantity;
    return prixTotalArticle;
}

// Fonction calcul quantité
function calculQuantite(obj) {
    let quantiteTotalArticle = 0;
    quantiteTotalArticle = quantiteTotalArticle + obj.quantity;
    return quantiteTotalArticle;
}

// Fonction pour afficher la quantité et le prix
function affichageQuantitePrix(prixTotal, quantiteTotal) {
    const totalQuantite = document.querySelector("#totalQuantity");
    const totalPrix = document.querySelector("#totalPrice");
    totalPrix.textContent = prixTotal;
    totalQuantite.textContent = quantiteTotal;
}

// Fonction qui gère la quantité 
function gererQuantitePrix(id, nouvelleValeur, obj, color) {
    const miseAJour = tableauObjet.find((obj) => obj.id === id && obj.color === color);
    miseAJour.quantity = Number(nouvelleValeur);
    majLocal(obj);
    quantitePrix();
}

// Fonction qui met à jour le Local Storage par rapport à la fonction gererQuantitePrix
function majLocal(obj) {
    const majLocastorage = JSON.stringify(obj);
    localStorage.setItem(obj.id +";"+ obj.color , majLocastorage);
    window.location.reload();
}

// Fonction qui supprime un article du panier et du local storage
function supprimeCanape(obj) {
    const supprimeArticle = tableauObjet.find((canape) => canape.id === obj.id && canape.color === obj.color);
    tableauObjet.splice(supprimeArticle, 1);

    const majLocasto = JSON.stringify(obj);
    localStorage.removeItem(obj.id +";"+ obj.color , majLocasto);
    window.location.reload();
}


// Formulaire
const boutonDeCommande = document.querySelector("#order");
boutonDeCommande.addEventListener("click", (e) => envoiFormulaire(e));

// Fonction envoie du formulaire avec fetch post
function envoiFormulaire() {
    
    if (tableauObjet.length === 0) {
        alert("Votre panier est vide");
    }

    if (erreurFormulaire()) {
        return;
    }
    else {
        formulaireValide();
    }
}

// Fonction si le formulaire est bon alors on fetch
function formulaireValide() {
    const corpsFormulaire = corpsDuFormulaire();
    fetch("http://localhost:3000/api/products/order", {
        method: 'POST',
        body: JSON.stringify(corpsFormulaire),
        headers: {  
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
    })
    .then(function(res) {
        if(res.ok) {
            return res.json();
        }
    })
    .then(function(data) {
        const orderId = data.orderId
        document.location.href = "confirmation.html?orderId=" + orderId;
        //localStorage.clear();
    });
}

// Fonction  avec création objet formulaire
function corpsDuFormulaire() {
    const formulaire = document.querySelector(".cart__order__form");
    const firstName = formulaire.elements.firstName.value;
    const lastName = formulaire.elements.lastName.value;
    const address = formulaire.elements.address.value;
    const city = formulaire.elements.city.value;
    const email = formulaire.elements.email.value;

    let objetFormulaire = {
        contact : {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email,
        },
        products: recuperationFormulaireId()
    }
    return objetFormulaire;
}

// Fonction qui recupere le numero du canape
function recuperationFormulaireId() {
    const numeroCanape = localStorage.length;
    const numeros = [];
    for (let i = 0; i < numeroCanape; i++) {
        const key = localStorage.key(i);
        const id = key.split(";")[0];
        numeros.push(id);
    }
    return numeros;
}

// Fonction si il y a une erreur dans un des champs
function erreurFormulaire() {
    let formulaire = document.querySelector(".cart__order__form");

    // création de regexp pour gérer le formulaire
    let adresseRegExp = new RegExp("^[A-zà-ú0-9 ,.'\-]+$");
    let prenomNomRegExp = new RegExp("^[A-zà-ú \-]+$");
    let emailRegExp = new RegExp("^[a-zA-Z0-9_. -]+@[a-zA-Z.-]+[.]{1}[a-z]{2,10}$");

    // Champ Prénom
    let prenom = document.querySelector('#firstNameErrorMsg');
    formulaire.firstName.addEventListener('change', function(e) {
        let valeur = e.target.value;
        if (prenomNomRegExp.test(valeur)){
            prenom.textContent = '';
        } else {
            alert('Erreur, vérifiez votre prénom.');
            prenom.textContent = 'Erreur, vérifiez votre prénom.';
        }
    });

    // Champ Nom
    let nom = document.querySelector('#lastNameErrorMsg');
    formulaire.lastName.addEventListener('change', function(e) {
        let valeur = e.target.value;
        if (prenomNomRegExp.test(valeur)){
            nom.textContent = '';
        } else {
            alert('Erreur, vérifiez votre nom.');
            nom.textContent = 'Erreur, vérifiez votre nom.';
        }
    });

    // Champ Adresse
    let adresse = document.querySelector('#addressErrorMsg');
    formulaire.address.addEventListener('change', function(e) {
        let valeur = e.target.value;
        if (adresseRegExp.test(valeur)){
            adresse.textContent = '';
        } else {
            alert('Erreur, vérifiez votre adresse.');
            adresse.textContent = 'Erreur, vérifiez votre adresse.';
        }
    });

    // Champ Ville
    let ville = document.querySelector('#cityErrorMsg');
    formulaire.city.addEventListener('change', function(e) {
        let valeur = e.target.value;
        if (prenomNomRegExp.test(valeur)){
            ville.textContent = '';
        } else {
            alert('Erreur, vérifiez votre ville.');
            ville.textContent = 'Erreur, vérifiez votre ville.';
        }
    });

    // Champ Email
    let email = document.querySelector('#emailErrorMsg');
    formulaire.email.addEventListener('change', function(e) {
        let valeur = e.target.value;
        if (emailRegExp.test(valeur)){
            email.textContent = '';
        } else {
            alert('Erreur, vérifiez votre email.');
            email.textContent = 'Erreur, vérifiez votre email.';
        }
    });

    if (firstName.value === "" || lastName.value === "" || address.value === "" || city.value === "" || email.value === "") {
        alert("Veuillez remplir le formulaire");
    }
}