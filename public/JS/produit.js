// je récupère l'id produit dans url avec URLSearchParams =======================================================
let params = new URLSearchParams(document.location.search)
let id = params.get("id")
console.log("Il a selectionné " +id)

//  afficher un seul produit dans la page ============================================================================

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

	// On récupére notre structure html pour la remplir ensuite ====================================================================================
    const titre = document.getElementById("titre")
    titre.textContent = camera.name
    const prix = document.getElementById("prix")
    prix.textContent = camera.price + " €"
    const description = document.getElementById("description")
    description.textContent = camera.description
    const image = document.getElementById("image")
    image.src = camera.imageUrl

	
	
	
	    // Boutton retour à la page d'accueil (logo orinoco) =========================================================================================================
    const retour_accueil = document.getElementById("btn-accueil")
    retour_accueil.textContent = "Retour à l'accueil"
    retour_accueil.addEventListener("click", function() {
        window.location.href = "index.html"
    })

	
    //les options lentilles ==========================================================================================================================================
    const lentille = document.getElementById("lense-select")
    const options = camera.lenses
    options.forEach(function(element, lens) {
        lentille[lens] = new Option(element, element)
    })
	var optionRef = new Option("Choix lentille :", "0", true, true) // On ajoute une option indiquant le contenu du select qu'on laisse en valeur par défault
	lentille.appendChild(optionRef)

	

    //selection de la lentille ================================================================================================================================
    let choixLentille = document.getElementById("lense-select").addEventListener("change", function (e) {
        choixLentille = e.target.value;
        console.log("Il sélectionne la lentille : " + e.target.value);
    });

    // Sélection du nombre de produit==========================================================================================================================
    let nombreProduit = document.getElementById("nombreProduit").addEventListener('change', function (e) {
        nombreProduit = e.target.value
        console.log("Il en veut :" + e.target.value)
    })

    // Boutton ajouter au panier ================================================================================================================================
   const ajouter_panier = document.getElementById("btn-ajouter")
        ajouter_panier.textContent = "Ajouter au panier"
        ajouter_panier.addEventListener("click", function() {
            if(choixLentille != undefined && choixLentille != "0" && nombreProduit != undefined && nombreProduit != "Nombre d'article :"){
                alert("Tu ajoutes "+ nombreProduit + " " + camera.name +" "+ choixLentille + " au panier.")
                console.log("Il ajoute "+ nombreProduit + " " + camera.name + choixLentille + " au panier.")
                camera.lenses = choixLentille
                camera.quantity = nombreProduit
                ajoutLocalStorage()
				document.location.reload(true);
            } else {
                alert("Veuillez selectionner un nombre et/ou un type de lentille")
            }
        })

}

// On ajoute nos produits dans local storage ===============================================================================================================
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


