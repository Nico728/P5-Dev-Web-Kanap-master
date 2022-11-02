//récupération des produits

  fetch('http://localhost:3000/api/products')
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.table(value);
    kanaps(value);
  })
  .catch(function(err) {
    console.log("erreur 404" + err);
    document.querySelector("titles").innerHTML = "<h1> erreur 404, not found</h1>";
  });

 // Affichage des produits 

function kanaps(accueil) {
    let espaceCanapes = document.querySelector("#items");
    for (let article of accueil) {
      espaceCanapes.innerHTML += `<a href="./product.html?_id=${article._id}">
      <article>
        <img src="${article.imageUrl}" alt="${article.altTxt}">
        <h3 class="productName">${article.name}</h3>
        <p class="productDescription">${article.description}</p>
      </article>
    </a>`;
    }
  }


