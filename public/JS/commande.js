// Récapitulatif de commande ===============================================================================================
function commande(){
    let data = JSON.parse(localStorage.getItem('order'));
    let prix = localStorage.getItem('totalAmount');
    let conteneurRecap = document.getElementById("recapitulatif")

    const p1 = document.createElement("p")
    p1.textContent = "Merci pour votre commande " + data.contact.firstName + " " + data.contact.lastName + "."
    recapitulatif.appendChild (p1)

	const p2 = document.createElement("p")
    p2.textContent = "Le montant total est " + prix + " €."
    recapitulatif.appendChild (p2)

    const p3 = document.createElement("p")
    p3.textContent = "Voici le numéro de votre commande : " + data.orderId + "."
    recapitulatif.appendChild (p3)


    console.log("Voici le numéro de commande :")
    console.log(data.orderId)
    console.log("Et le montant total : ")
    console.log(prix)
}

commande();
