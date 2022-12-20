/* Monte sua lógica aqui */
// index.js

// Definimos essa função como assíncrona pois precisamos aguardar a resposta da função consomePokeAPI
async function renderizaPokemons() {
    // Aqui utilizaremos o await para aguardar a resposta da função
    const li_tag = document.querySelector("li")
    const listaDePokemons = await consomePokeAPI()
    
    // Agora é só iterar sob o array e renderizar cada pokemon
    listaDePokemons.results.forEach(pokemon => {
        // "Fatia" o número do pokemon na pokedex a partir da URL de cada pokemon
        const numeroNaPokedex = pokemon.url.slice(34, -1)
        

        li_tag.insertAdjacentHTML('beforeend', `
                <div class="pai_imgpokemon_nomepokemon">
                <img class="img_pokemon"src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numeroNaPokedex}.png" alt=${pokemon.name}>
                <h3 class="nomes_pokemon">${pokemon.name}</h3>
                </div>
           
        `)
    })
}
async function get_pokemon(name){
const options = {
    method:"GET",
    headers:{"Content-Type": 'application/json'}


}
const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`,options)
const resposta_json = await resposta.json()
console.log(resposta_json)
const numeroNaPokedex_pesquisa = resposta_json.sprites.back_default
console.log(numeroNaPokedex_pesquisa)
let id_url = resposta_json.id
const li_tag2 = document.querySelector("li")
li_tag2.innerHTML = ""
li_tag2.insertAdjacentHTML('beforeend', `
<div class="pai_imgpokemon_nomepokemon">
<img class="img_pokemon"src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id_url}.png" alt=${resposta_json.forms[0].name}>
<h3 class="nomes_pokemon">${resposta_json.forms[0].name}</h3>
</div>

`)
}
get_pokemon("bulbasaur")

let input_evento = document.querySelector(".input_evento")
input_evento.addEventListener("change",(event)=>{
 get_pokemon(event.target.value)

    
})


renderizaPokemons()