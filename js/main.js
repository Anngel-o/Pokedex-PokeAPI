const pokemons = document.querySelector("#pokemons");
const botonesHeaders = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
    // Construye una URL agregando el index al final
        .then((response) => response.json())
        .then(pokemon => mostrarPokemon(pokemon))
}

function mostrarPokemon(pokemon) {
    let tipos = pokemon.types.map((type) => `
        <p class="${type.type.name} tipo">${type.type.name}</p>
    `); // map genera un array con lo que le digamos
    tipos = tipos.join(''); //join junta todos los elementos de un array y los convierte en un sólo string
    // console.log(tipos);

    let pokeId = pokemon.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2){
        pokeId = "0" + pokeId;
    }

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">${"#" + pokeId}</p>
            <div class="pokemon-imagen">
                <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
            </div>
            <div class="pokemon-info">
                <div class="nombre-contenedor">
                    <p class="pokemon-id">${"#" + pokeId}</p>
                    <h2 class="pokemon-nombre">${pokemon.name}</h2>
                </div>
                <div class="pokemon-tipos">
                    ${tipos}
                </div>
                <div class="pokemon-stats">
                    <p class="stat">${pokemon.height + "m"}</p>
                    <p class="stat">${pokemon.weight + "kg"}</p>
                </div>
            </div>
    `;
    pokemons.append(div);
}

botonesHeaders.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id; //Trae el id de cada botón
    pokemons.innerHTML = ""; //Se vacía el contenido de las tarjetas de pokémon para mostrar los del tipo correspondiente a cada botón

    for (let index = 1; index <= 151; index++) {
        fetch(URL + index)
        // Construye una URL agregando el index al final
            .then((response) => response.json())
            .then(pokemon => {
                if (botonId === "ver-todos") {
                    mostrarPokemon(pokemon);
                } else {
                    const tipos = (pokemon.types.map(type => type.type.name));
                //Guarda en la constante tipos un array que contiene el nombre de los tipos
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        //Buscar si existe en esos tipos uno igual al del botón que se presiona
                        mostrarPokemon(pokemon);
                    }
                } 
            })
    }
}));