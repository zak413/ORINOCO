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

