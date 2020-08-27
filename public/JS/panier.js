// Fonction pour afficher mon produit==============================================================================
function affichagePanier() {
    //je récupére mon produit dans local storage "panier"
    var panier = JSON.parse(localStorage.getItem("panier"))

    let tableauPanier = document.getElementById("afficheProduitPanier")

    // si il n'y a rien dans le panier, affiche "Le panier est vide !" ==================================================
    if ( panier == null) {
        var div = document.createElement("div")
        div.textContent = "Le panier est vide !"
        afficheProduitPanier.appendChild(div)
        console.log("Le panier est vide !")
    } else {
        //s'il y a qq chose, creer un tableau avec chaque article=========================================================
        tableauPanier.innerHTML = ''
        Object.values(panier).map( (camera) => {
            var tr = document.createElement("tr")
			
			
			let rowIndex = afficheProduitPanier.parentNode.rows.length - 1;
            afficheProduitPanier.appendChild(tr)

                var name = document.createElement("td")
                name.textContent = camera.name
                tr.appendChild(name)

                var quantite = document.createElement("td")
                quantite.textContent = camera.quantity
                tr.appendChild(quantite)
			
				var lentille = document.createElement("td")
				lentille.textContent = camera.lenses
				tr.appendChild(lentille)

                var prix = document.createElement("td")
                prix.textContent = camera.price  + "€"
                tr.appendChild(prix)
			
				var supp = document.createElement("button")
				supp.textContent = "Supprimer"
				supp.onclick = function () {
					let i = rowIndex
					remove(i)
				}
				supp.setAttribute("class", "btn btn-danger btn-suppProduct pr-md-2 mb-2 mb-md-0");
				tr.appendChild(supp)
			

              console.log("Voici le panier :")
              console.log(panier)
        })
    }
}
affichagePanier()

// Mise de l'objet en tableau
var produits = JSON.parse(localStorage.getItem("panier"));
if(produits != undefined){
var array = Object.keys(produits)
    .map(function(key) {
        return produits[key];
    })
} else {
	array = 0
}
console.log(array)

// fonction pour supprimer un produit

	function remove (i) {
		console.log(i)
		console.log(array[i])
		array.splice(i, 1)
		localStorage.clear();
		localStorage.setItem("panier", JSON.stringify(array));
		document.location.reload(true); 
	if(array.length < 1) {
		localStorage.clear();
		document.location.reload(true);
	} else {
		affichagePanier()
	}
}


// Calcul du montant total du panier
 let totalPrice = document.getElementById('total_price');
 let totalAmount = 0;
 for(let i = 0; i<array.length; i++){
    totalAmount += array[i].price * array[i].quantity;
 }
 totalPrice.innerText = `Le montant de votre commande est de : ` + `${totalAmount}` + ` €`;



// Boutton pour vider le panier =============================================================================

let vider = document.getElementById('viderPanier')
	vider.onclick = function () {removeCart()};

function removeCart(){
localStorage.clear();
document.location.reload(true);
}



// option pour email=======================================================================================================


email.addEventListener('input', ({ target: { value } }) => {
    if(!value.includes('@'))
    email.style.backgroundColor = "#F18D95"
    else
    email.style.backgroundColor = "#A4FD92"
})



var formValid = document.querySelector('.commande');
formValid.addEventListener ('click', function (e) {
	let formulaire = document.getElementsByClassName("needs-validation")[0]
	console.log(formulaire.checkValidity())
	if(formulaire.checkValidity()) {
		achat(e)
	}
});

function achat(e) {
 e.preventDefault();
// integration d'une alerte si le panier est vide, on ne peut pas passer commande  
  let panier = localStorage.getItem('panier');
  panier = JSON.parse(panier);
  var total = localStorage.getItem('prixTotal');
	if (panier == null || total == 0){
  alert("Votre panier est vide, vous ne pouvez pas passer une commande ! ")
 }  
// on déclare un tableau de produits pour la requete POST plus tard
 let products = [];

 // on fait une fonction pour récupérer les id des produits au panier, pour l'afficher dans la requete POST
 function productId(products) {
  let panier = JSON.parse(localStorage.getItem('panier'));
  
  products = Object.values(panier).map( (data) => {
    let qte = parseInt(data.qte);
    console.log(typeof qte);
    console.log(qte);
    
    for (let i = 0 ; i< qte ; i ++){
        products.push(data._id);  
      }
       console.log(products); 
      return products; 
     });
 
  };
  productId(products);
  
    // Récupérer la valeur des champs saisis par le client
     
    let prenom = document.getElementById('prenom').value;
    let nom = document.getElementById('nom').value;
    let email = document.getElementById('email').value;
    let adresse = document.getElementById('adresse').value;
    let ville = document.getElementById('ville').value;
   

    
    


  // on met les valeurs dans un objet pour la requete POST
  
    let contact = {
        "firstName": prenom,
        "lastName": nom,
        "email": email,
        "address": adresse,
        "city": ville,
    };

// création de l'objet obligatoire pour la requete à envoyer au serveur
  let objet = {
    contact,
    products
  };

  let achat = JSON.stringify(objet);
  if (prenom == ''){
    alert("Prénom incorrect")

  } else if (nom == ''){
    alert("Nom incorrect")
  } else if (email == ''){
    alert("Email incorrect")
  } else if (adresse == ''){
    alert("Adresse incorrect")
  } else if (ville == ''){
    alert("Ville incorrect")
   
 // console.log(achat);
 // console.log(products);
  
  
  // si tout à été bien rempli, on envoi la commande au serveur, avec toutes les coordonnées du client
  } else {
  let request = new XMLHttpRequest();
       request.onreadystatechange = function () {
         if (this.readyState == XMLHttpRequest.DONE) {
           let confirmation = JSON.parse(this.responseText);
           localStorage.setItem('order', JSON.stringify(confirmation));
           let prix = JSON.parse(localStorage.getItem('prixTotal'));
           localStorage.setItem('prix', JSON.stringify(prix));
          console.log(typeof prix);
          console.log( prix);
           //Des que la requete est envoyé, on bascule sur la page de confirmation de commande avec toutes les infos demandé : Id de commande, prix du panier
           window.location.href = "commande.html";
         }
       }
  request.open("post", "http://localhost:3000/api/cameras/order");
  request.setRequestHeader("Content-Type", "application/json");
  request.send(achat);
      }
} 
