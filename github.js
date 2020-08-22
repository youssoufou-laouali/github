var input = document.getElementById('input')
var submit = document.getElementById('submit')
var searching = document.getElementById('searching')
var name = "node"
var tabeau = []

function search(name) {
    fetch('https://api.github.com/users/' + name, {
            headers: {
                "Content-Type": "text/plain;charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then(respons => {
            console.log(respons)
            searching.innerHTML += `<div class="row shadow"> <div class="col s3 offset-s1"><img src="${respons.avatar_url}" class="responsive-img image" alt="profil"></div><div class="col s3"><p><strong>Name:</strong> <span>${respons.login}</span>  <br><br> <strong>Github</strong> : <a class="bleulink" href="${respons.html_url}"> Link </a><br><br> <strong>Public Repos</strong>: <span class="vertrepos">${respons.public_repos} 
                </span></p> </div> <div class = "col s4 rep" ><a onclick="var element=this; repertoire(element)" class = "color btn-small deep-purple lighten-3  " > Repository</a> </div></div>`



        })
}
search('node')



function repertoire(e) {
    var nom = e.parentNode.previousElementSibling.firstElementChild.children[1].textContent
    var ajout = e.parentNode
    fetch('https://api.github.com/users/' + nom + '/repos', {
            headers: {
                "Content-Type": "text/plain;charset=UTF-8"
            }
        })
        .then(res => res.json())
        .then(r => {
            console.log(r)
            var n = r.length
            for (var i = 0; i < n; i++) {
                ajout.innerHTML += `<a href="${r[i].html_url}">${r[i].name}</a> <br/> `
            }

        })
}
submit.addEventListener('click', function(e) {
    e.preventDefault()
    name = input.value
    input.value = ''
    search(name)
})