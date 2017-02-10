window.onload = function(){
    var form = document.querySelector('#my_form');
    var pokemonImage = document.querySelector('#img_area');
    var pokemonName = document.querySelector('#name_area');
    var pokemonType = document.querySelector('#type_area');
    var errArea = document.querySelector('#err_area');

    var xhr = new XMLHttpRequest();
    var url = "pokemons.json";
    var method = "GET";

    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                allPokemon = JSON.parse(xhr.responseText);
            }
        };
    xhr.send();

    form.onsubmit = function(){
        var test = false;
        errArea.innerHTML = "";
        var pokeName = document.querySelector('#name').value.toLowerCase();
        for(i in allPokemon){
            if (allPokemon[i].name.toLowerCase() == pokeName || i == pokeName){
                test = true;
                pokemonName.innerHTML = "Name : " + allPokemon[i].name;
                pokemonType.innerHTML = "Type : " + allPokemon[i].type;
                // need the three replace for Farfetch'dn Nidoran and Mr. mime (names don't match in pokemondb)
                var pokeNameCleaned = allPokemon[i].name.replace(". ","-").replace("'","").replace("Nidoran","nidoran-m").toLowerCase(); 
                pokemonImage.innerHTML = '<img src="http://img.pokemondb.net/artwork/' + pokeNameCleaned + '.jpg"/>';
            }
        }
        if (test == false){
            if (isNaN(pokeName)){
                errArea.innerHTML = pokeName+' not found';
            }
            else{
                errArea.innerHTML = 'Pokémon number '+pokeName+' not found';
            }
            pokemonName.innerHTML = "Name :";
            pokemonType.innerHTML = "Type :";
            pokemonImage.innerHTML = "";
        }
        return false;
    }

};