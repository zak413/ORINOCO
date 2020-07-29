let params = new URLSearchParams(document.location.search)
let id = params.get("id")
console.log("Il a selectionné " +id)


let request = new XMLHttpRequest()
request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        camera = JSON.parse(this.responseText)
        affichageProduit()
    }
};
request.open("GET", "http://localhost:3000/api/cameras/" + id)
request.send()

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
};

 const retour_accueil = document.getElementById("btn-accueil")
    retour_accueil.textContent = "Retour à l'accueil"
    retour_accueil.addEventListener("click", function() {
        window.location.href = "index.html"
    })

// selection du nombre de produit
let nombreProduit = document.getElementById("nombreProduit").addEventListener('change', function (e) {
        nombreProduit = e.target.value
        console.log("Il en veut :" + e.target.value)
    })

const voir_panier = document.getElementById("btn-panier")
    voir_panier.textContent = "Mon panier"
    voir_panier.addEventListener("click", function() {
        window.location.href = "panier.html"
    })

const ajouter_panier = document.getElementById("btn-ajouter")
        ajouter_panier.textContent = "Ajouter au panier"
        ajouter_panier.addEventListener("click", function() {
            if(nombreProduit != undefined){
                alert("Tu ajoute "+ nombreProduit +" au panier.")
                console.log("Il ajoute "+ nombreProduit + " " + camera.name + " au panier.")
                camera.quantity = nombreProduit
                prixTotal()
                ajoutSessionStorage()
            } else {
                alert("Veuillez selectionner un nombre.")
            }
        })



//j'enregistre le prix total dans sessionstorage pour le proposer dans la page panier et commande
function prixTotal(){
    let price = parseInt(camera.price);
    let prixDuPanier = JSON.parse(sessionStorage.getItem('prixTotal'));
    
    if(prixDuPanier != null){
        sessionStorage.setItem("prixTotal", prixDuPanier + (price * camera.quantity));
    } else {
        sessionStorage.setItem("prixTotal", price * camera.quantity);
    }

}

function ajoutSessionStorage(){
    let panier = sessionStorage.getItem('panier');
    panier = JSON.parse(panier);

    let name = camera.name;
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
    sessionStorage.setItem("panier", JSON.stringify(panier));
}


