// On récupére les données avec fetch ===========================================================================

const main = document.getElementById("page")
const url = "http://localhost:3000/api/cameras"

fetch(url)
    .then(response => response.json())
    .then(json =>{
        console.log(json)
        json.forEach(({_id, name, description, price, imageUrl}) =>{
            const article = document.createElement("article")
            const h2 = document.createElement("h2")
            const h3 = document.createElement("h3")
            const p = document.createElement("p")
            const img = document.createElement("img")
            const lien = document.createElement("a")


            const nom = document.createTextNode (name)
            const prix = document.createTextNode (price + " €")
            const Description = document.createTextNode (description)
            img.src = imageUrl
            lien.href = 'produit.html?id=' + _id;
            lien.textContent = "voir le produit"


            main.appendChild (article)
			article.appendChild (img)
            article.appendChild (h2)
            article.appendChild (p)
            article.appendChild (h3)
            article.appendChild (lien)

            h2.appendChild(nom)
            h3.appendChild(prix)
            p.appendChild(Description)

            lien.className = "btn btn-outline-primary"
            //console.log(_id)

			article.className = ("card")
        })
    })
    .catch(e =>{
        alert("Le serveur ne répond pas !");
        console.error(e)
})




// Fonction pour afficher mon panier dans le modal ==============================================================================
function affichagePanier() {
    //je récupére mon produit dans local storage "panier"
    var panier = JSON.parse(localStorage.getItem("panier"))
    var prixTotal = JSON.parse(localStorage.getItem("prixTotal"))
    var prixPanier = document.getElementById('affichageTotal')

    let tableauPanier = document.getElementById("afficheProduitPanier")

    // Affichage du prix total du panier :===================================================================
    if (prixTotal != null) {
        prixPanier.textContent = 'Le montant de votre commande est de : ' + prixTotal +  ' €';
        prixPanier.id = 'prixTotal';
        var div = document.createElement("div")
        div.textContent = "Le panier est vide !"
        afficheProduitPanier.appendChild(div)
    } else  {
        prixPanier.textContent = 'Le montant de votre commande est de : 0 €';
    }

    // Si il n'y a rien dans le panier, affiche "Le panier est vide !" ===========================================
    if ( panier == null) {
        var div = document.createElement("div")
        div.textContent = "Le panier est vide !"
        afficheProduitPanier.appendChild(div)
        console.log("Le panier est vide !")
    } else {
        // S'il y a un produit, on créer un tableau avec chaque article ============================================
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
        })
    }
}
affichagePanier()
