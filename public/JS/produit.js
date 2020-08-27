// je récupère l'id produit dans url grace à méthode URLSearchParams
let params = new URLSearchParams(document.location.search)
let id = params.get("id")
console.log("Il a selectionné " +id)

//  affiche un seul produit dans la page

let request = new XMLHttpRequest()
request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        camera = JSON.parse(this.responseText)
        affichageProduit()
    }
};
request.open("GET", "http://localhost:3000/api/cameras/" + id)
request.send()

// Fonction pour afficher mon produit ==============================================================================================================
function affichageProduit() {

    console.log("Le nom du produit est " +camera.name)

    const titre = document.getElementById("titre")
    titre.textContent = camera.name
    const prix = document.getElementById("prix")
    prix.textContent = camera.price + " €"
    const description = document.getElementById("description")
    description.textContent = camera.description
    const image = document.getElementById("image")
    image.src = camera.imageUrl

    //les options lentilles
    const lentille = document.getElementById("lense-select")
    const options = camera.lenses
    options.forEach(function(element, lens) {
        lentille[lens] = new Option(element, element)
    })
	var optionRef = new Option("Choix lentille :", "0", true, true)
	lentille.appendChild(optionRef)

	

	
    // Boutton retour à la page d'accueil =========================================================================================================
    const retour_accueil = document.getElementById("btn-accueil")
    retour_accueil.textContent = "Retour à l'accueil"
    retour_accueil.addEventListener("click", function() {
        window.location.href = "index.html"
    })



    //selection de la lentille
    let choixLentille = document.getElementById("lense-select").addEventListener("change", function (e) {
        choixLentille = e.target.value;
        console.log("Il sélectionne la lentille : " + e.target.value);
    });

    // Sélection du nombre de produit================================================================================================================
    let nombreProduit = document.getElementById("nombreProduit").addEventListener('change', function (e) {
        nombreProduit = e.target.value
        console.log("Il en veut :" + e.target.value)
    })

    // Boutton ajouter au panier
   const ajouter_panier = document.getElementById("btn-ajouter")
        ajouter_panier.textContent = "Ajouter au panier"
        ajouter_panier.addEventListener("click", function() {
            if(choixLentille != undefined && choixLentille != "0" && nombreProduit != undefined && nombreProduit != "Nombre d'article :"){
                alert("Tu ajoute "+ nombreProduit + " " + camera.name +" "+ choixLentille + " au panier.")
                console.log("Il ajoute "+ nombreProduit + " " + camera.name + choixLentille + " au panier.")
                camera.lenses = choixLentille
                camera.quantity = nombreProduit
                prixTotal()
                ajoutLocalStorage()
				document.location.reload(true);
            } else {
                alert("Veuillez selectionner un nombre et/ou un type de lentille")
            }
        })

}
// On enregistre le prix total dans local storage pour le proposer dans la page panier et commande=============================================
function prixTotal(){
    let price = parseInt(camera.price);
    let prixDuPanier = JSON.parse(localStorage.getItem('prixTotal'));
    
    if(prixDuPanier != null){
        localStorage.setItem("prixTotal", prixDuPanier + (price * camera.quantity));
    } else {
        localStorage.setItem("prixTotal", price * camera.quantity);
    }

}

function ajoutLocalStorage(){
    let panier = localStorage.getItem('panier');
    panier = JSON.parse(panier);

    let name = camera.name + camera.lenses;
    if(panier != null){
        let elem = panier[name]
        if(elem === undefined) {
            panier = {...panier,  [name] : camera}
        } else {
            let quantity = parseInt(elem.quantity);
            quantity += parseInt(camera.quantity);
            elem.quantity = quantity;
        }
    } else {
        panier = {[name] : camera}

    }
    localStorage.setItem("panier", JSON.stringify(panier));
}

// Fonction pour afficher mon produit======================================================================================================


function affichagePanier() {
    //je récupére mon produit dans local storage "panier"
    var panier = JSON.parse(localStorage.getItem("panier"))
    var prixTotal = JSON.parse(localStorage.getItem("prixTotal"))
    var prixPanier = document.getElementById('affichageTotal')

    let tableauPanier = document.getElementById("afficheProduitPanier")
    
    // affichage du prix total du panier si le panier
    if (prixTotal != null) {
        prixPanier.textContent = 'Le montant de votre commande est de : ' + prixTotal +  ' €';
        prixPanier.id = 'prixTotal'; 
    } else  {
        prixPanier.textContent = 'Le montant de votre commande est de : 0 €';
    }

    // si il n'y a rien dans le panier, affiche "Le panier est vide !"
    if ( panier == null) {
        var div = document.createElement("div")
        div.textContent = "Le panier est vide !"
        afficheProduitPanier.appendChild(div)
        console.log("Le panier est vide !")
    } else {
        //s'il y a qq chose, creer un tableau avec chaque article
        tableauPanier.innerHTML = ''
        Object.values(panier).map( (camera) => {
            var tr = document.createElement("tr")
            afficheProduitPanier.appendChild(tr)
            
                var name = document.createElement("td")
                name.textContent = camera.name
                tr.appendChild(name)
				
				var lentille = document.createElement("td")
				lentille.textContent = camera.lenses
				tr.appendChild(lentille)


                var quantite = document.createElement("td")
                quantite.textContent = camera.quantity
                tr.appendChild(quantite)
			

              console.log("Voici le panier :")
              console.log(panier)
        })
    }
}
affichagePanier()  

