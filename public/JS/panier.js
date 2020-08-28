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
        //sinon on creer un tableau avec chaque article =========================================================
        tableauPanier.innerHTML = ''
        Object.values(panier).map( (camera) => {
			
            var tr = document.createElement("tr")
			let rowIndex = afficheProduitPanier.parentNode.rows.length - 1; // Pour avoir l'index de chaque ligne pour nous permettre de la supprimer si besoin
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

// Mise de l'objet en tableau pour pouvoir utiliser ma fonction splice ======================================================
var produits = JSON.parse(localStorage.getItem("panier"));
if(produits != undefined){
var produitsArray = Object.keys(produits)
    .map(function(key) {
        return produits[key];
    })
} else {
	produitsArray = 0
}
console.log(produitsArray)

// fonction pour supprimer un produit du panier =================================================================================

	function remove (i) {
		console.log(i)
		console.log(produitsArray[i])
		produitsArray.splice(i, 1)
		localStorage.clear();
		localStorage.setItem("panier", JSON.stringify(produitsArray));
		document.location.reload(true); 
	if(produitsArray.length < 1) {
		localStorage.clear();
		document.location.reload(true);
	} else {
		affichagePanier()
	}
}


// Calcul du montant total du panier ==========================================================================================
let totalPrice = document.getElementById('total_price');
let totalAmount = 0;
for(let i = 0; i<produitsArray.length; i++){
	totalAmount += produitsArray[i].price * produitsArray[i].quantity;
}
totalPrice.innerText = `Le montant de votre commande est de : ` + `${totalAmount}` + ` €`;

localStorage.setItem("totalAmount", totalAmount);
console.log(totalAmount)
// Boutton pour vider le panier entier ================================================================================================

let vider = document.getElementById('viderPanier')
	vider.onclick = function () {removeCart()};

function removeCart(){
localStorage.clear();
document.location.reload(true);
}



// option pour indiquer visuellement si email au bon format ===========================================================================


email.addEventListener('input', ({ target: { value } }) => {
    if(!value.includes('@'))
    email.style.backgroundColor = "#F18D95"
    else
    email.style.backgroundColor = "#A4FD92"
})


// Exiger un contenu cohérent pour pouvoir valider la commande =========================================================================
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
	// si le panier est vide, on ne peut pas passer commande ================================================================================
	let panier = localStorage.getItem('panier');
	panier = JSON.parse(panier);
	if (panier == null){
		alert("Votre panier est vide, vous ne pouvez pas passer une commande ! ")
	}  
// on déclare un tableau de produits pour la requete POST plus tard
	let products = [];

// on fait une fonction pour récupérer les id des produits au panier, pour l'afficher dans la requete POST
	function productId(products) {
		let panier = JSON.parse(localStorage.getItem('panier'));
  
		products = Object.values(panier).map( (data) => {
			let qte = parseInt(data.qte);
    
			for (let i = 0 ; i< qte ; i ++){
				products.push(data._id);  
			}
			return products; 
		});
 
	};
productId(products);
  
	
// On récupére les données saisies par le client ===========================================================================================
let prenom = document.getElementById('prenom').value;
let nom = document.getElementById('nom').value;
let email = document.getElementById('email').value;
let adresse = document.getElementById('adresse').value;
let ville = document.getElementById('ville').value;
   

    
    


// on met les valeurs dans un objet pour la requête POST ====================================================================================
  
let contact = {
	"firstName": prenom,
	"lastName": nom,
	"email": email,
	"address": adresse,
	"city": ville,
	};

	
// création de l'objet obligatoire pour la requête à envoyer au serveur
let objet = {
	contact,
	products
	};

let achat = JSON.stringify(objet);

let request = new XMLHttpRequest();
request.onreadystatechange = function () {
	if (this.readyState == XMLHttpRequest.DONE) {
		let confirmation = JSON.parse(this.responseText);
		localStorage.setItem('order', JSON.stringify(confirmation));
		//Des que la requete est envoyé, on bascule sur la page de confirmation avec les différentes données : Id de commande, prix du panier
		window.location.href = "commande.html";
		}
		}
request.open("post", "http://localhost:3000/api/cameras/order");
request.setRequestHeader("Content-Type", "application/json");
request.send(achat);
	}
