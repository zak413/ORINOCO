// Fonction pour afficher mon produit==============================================================================
function affichagePanier() {
    //je récupére mon produit dans session storage "panier"
    var panier = JSON.parse(sessionStorage.getItem("panier"))
    var prixTotal = JSON.parse(sessionStorage.getItem("prixTotal"))
    var prixPanier = document.getElementById('affichageTotal')

    let tableauPanier = document.getElementById("afficheProduitPanier")
    
    // Affichage du prix total du panier si :===================================================================
    if (prixTotal != null) {
        prixPanier.textContent = 'Le montant de votre commande est de : ' + prixTotal +  ' €';
        prixPanier.id = 'prixTotal'; 
        var div = document.createElement("div")
        div.textContent = "Le panier est vide!"
        afficheProduitPanier.appendChild(div)
    } else  {
        prixPanier.textContent = 'Le montant de votre commande est de : 0 €';
    }

    // Si il n'y a rien dans le panier, affiche "Le panier est vide !"
    if ( panier == null) {
        var div = document.createElement("div")
        div.textContent = "Le panier est vide !"
        afficheProduitPanier.appendChild(div)
        console.log("Le panier est vide !")
    } else {
        // S'il y a un produit, on créer un tableau avec chaque article
        tableauPanier.innerHTML = ''
        Object.values(panier).map( (camera) => {
            var tr = document.createElement("tr")
            afficheProduitPanier.appendChild(tr)
            
            var name = document.createElement("td")
            name.textContent = camera.name
            tr.appendChild(name)

            var quantite = document.createElement("td")
            quantite.textContent = camera.quantity
            tr.appendChild(quantite)

            var prix = document.createElement("td")
            prix.textContent = camera.price  + "€"
            tr.appendChild(prix)
			
			var btn = document.createElement("button")
			btn.textContent = "Supprimer"
			tr.appendChild(btn)
			btn.className = ("btn", "btn-danger");


            console.log("Voici le panier :")
            console.log(panier)
        })
    }
}
affichagePanier()


// Boutton pour supprimer un produit =========================================================================
var supp = document.getElementsByClassName("btn")
supp.onclick = function () {
	
}

	


// option pour email===========================================================================================
email.addEventListener('input', ({ target: { value } }) => {
  	if(!value.includes('@'))
    email.style.borderColor = "red"
    else
    email.style.borderColor = "green"
})


var formValid = document.querySelector('.commande');
formValid.addEventListener ('click', function (e) {achat(e)});

function achat(e) {
	e.preventDefault();
// Si panier vide on peut pas passer commande  
	let panier = sessionStorage.getItem('panier');
	panier = JSON.parse(panier);
	var total = sessionStorage.getItem('prixTotal');
	if (panier == null || total == 0){
		alert("Votre panier est vide, vous ne pouvez pas passer une commande ! ")
}  
	
// on déclare un tableau de produits pour la requête POST========================================================
let products = [];

 // On récupére les id des produits pour l'afficher dans la requete POST==============================================
function productId(products) {
 	let panier = JSON.parse(sessionStorage.getItem('panier'));
  
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
  
// Récupérer le formulaire rempli par le client=================================================================
let prenom = document.getElementById('prenom').value;
let nom = document.getElementById('nom').value;
let email = document.getElementById('email').value;
let adresse = document.getElementById('adresse').value;
let ville = document.getElementById('ville').value;
   

    
    


// On met les valeurs dans un objet pour la requete POST==============================================================
let contact = {
	"firstName": prenom,
	"lastName": nom,
	"email": email,
	"address": adresse,
	"city": ville,
};

// création de l'objet obligatoire pour la requete à envoyer au serveur======================================================
let objet = {
	contact,
	products
};

let achat = JSON.stringify(objet);
if (prenom == ''){
alert("Saisissez votre prénom")

} else if (nom == ''){
    alert("Saisissez votre Nom")
} else if (email == ''){
    alert("Saisissez votre Email")
} else if (adresse == ''){
    alert("Saisissez votre Adresse")
} else if (ville == ''){
    alert("Saisissez votre Ville")
   
// console.log(achat);
// console.log(products);
  
  
// Si tout est ok, on envoi la commande au serveur, avec toutes les coordonnées du client====================================================
} else {
let request = new XMLHttpRequest();
request.onreadystatechange = function () {
	if (this.readyState == XMLHttpRequest.DONE) {
		let confirmation = JSON.parse(this.responseText);
        sessionStorage.setItem('order', JSON.stringify(confirmation));
        let prix = JSON.parse(sessionStorage.getItem('prixTotal'));
        sessionStorage.setItem('prix', JSON.stringify(prix));
        console.log(typeof prix);
        console.log( prix);
        //Dés que la requête est envoyée, on bascule sur la page de confirmation de commande avec toutes les infos demandé : Id de commande, prix du panier
        window.location.href = "commande.html";
         }
       }
request.open("post", "http://localhost:3000/api/camera/order");
request.setRequestHeader("Content-Type", "application/json");
request.send(achat);
}
} 
	
	
	
	
	
	
	
	
	
	
	
	
	
	