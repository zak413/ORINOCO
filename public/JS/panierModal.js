// Fonction pour afficher mon produit==============================================================================
function affichagePanier() {
    //je récupére mon produit dans local storage "panier"
    var panier = JSON.parse(localStorage.getItem("panier"))

    let tableauPanier = document.getElementById("affichePanierModal")

    // si il n'y a rien dans le panier, affiche "Le panier est vide !" ==================================================
    if ( panier == null) {
        var div = document.createElement("div")
		div.className = "phrase"
        div.textContent = "Le panier est vide !"
        affichePanierModal.appendChild(div)
        console.log("Le panier est vide !")
    } else {
        //s'il y a qq chose, creer un tableau avec chaque article=========================================================
        tableauPanier.innerHTML = ''
        Object.values(panier).map( (camera) => {
            var tr = document.createElement("tr")
			
			
			let rowIndex = affichePanierModal.parentNode.rows.length - 1;
            affichePanierModal.appendChild(tr)

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
			
			

              console.log("Voici le panier :")
              console.log(panier)
        })
    }
}
affichagePanier()
// Mise de l'objet en tableau ================================================================================================
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

// Calcul du montant total du panier ==========================================================================================
 let totalPrice = document.getElementById('total_price');
 let totalAmount = 0;
 for(let i = 0; i<produitsArray.length; i++){
    totalAmount += produitsArray[i].price * produitsArray[i].quantity;
 }
 totalPrice.innerText = `Le montant de votre commande est de : ` + `${totalAmount}` + ` €`;


// Bouton permettant d'aller vers le panier ====================================================================================
const allerPanier = document.getElementById("versPanier")
    allerPanier.addEventListener("click", function() {
        window.location.href = "panier.html"
    })