//récupération des produits

  fetch('http://localhost:3000/api/products')
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    kanaps(value);
  })
  .catch(function(err) {
    console.log("erreur 404" + err);
    let erreurKnap = document.createElement("p");
    document.querySelector("titles").textContent = "erreur 404, not found".appendChild(erreurKnap);
  });

 // Affichage des produits 

function kanaps(value) {
    for (let i = 0; i < value.length; i++) {

      // création de la balise a
      let lienItems = document.createElement("a");
      document.querySelector("#items").appendChild(lienItems);
      lienItems.href = "./product.html?_id=" + value[i]._id;
      
      //création de la balise article
      let articleItems = document.createElement("article");
      lienItems.appendChild(articleItems);
      
      // création de la balise img
      let imgItems = document.createElement("img");
      articleItems.appendChild(imgItems);
      imgItems.src = value[i].imageUrl;
      imgItems.alt = value[i].altTxt;
      
      // création de la balise h3
      let h3Items = document.createElement("h3");
      articleItems.appendChild(h3Items);
      h3Items.classList.add("productName");
      h3Items.textContent = value[i].name;
      
      // création de la balise p
      let pItems = document.createElement("p");
      articleItems.appendChild(pItems);
      pItems.classList.add("productDescription");
      pItems.textContent = value[i].description;

    }
  }
