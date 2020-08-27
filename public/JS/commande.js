// Récapitulatif de commande ===============================================================================================
function commande(){
    let data = JSON.parse(localStorage.getItem('order'));
    let prix = JSON.parse(localStorage.getItem('prix'));
    let conteneurRecap = document.getElementById("recapitulatif")

    const p1 = document.createElement("p")
    p1.textContent = "Merci pour votre commande " + data.contact.firstName + " " + data.contact.lastName
    recapitulatif.appendChild (p1)

    const p2 = document.createElement("p")
    p2.textContent = "Celle-ci a été enregistrée sous le numéro : " + data.orderId + "."
    recapitulatif.appendChild (p2)

    const p3 = document.createElement("p")
    p3.textContent = "Le montant total de " + prix + " €."
    recapitulatif.appendChild (p3)

    console.log("Voici le numéro de commande :")
    console.log(data.orderId)
    console.log("Et le montant total : ")
    console.log(prix)
}

commande();
