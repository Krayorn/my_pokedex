window.onload = function(){
    var form = document.querySelector('#my_form');
    var pokemonImage = document.querySelector('#img_area');
    var pokemonName = document.querySelector('#name_area');
    var pokemonType = document.querySelector('#type_area');
    var errArea = document.querySelector('#err_area');

    var xhr = new XMLHttpRequest();
    var url = "pokemons.json";
    var method = "POST";

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
        var input = document.querySelector('#name').value;
        var maj = input.charAt(0).toUpperCase();
        var pokeName = maj + input.substring(1);
        for(i in allPokemon){
            if (allPokemon[i].name == pokeName || i == pokeName){
                test = true;
                pokemonName.innerHTML = "Name : " + allPokemon[i].name;
                pokemonType.innerHTML = "Type : " + allPokemon[i].type;
                // need the two replace for Farfetch'd and Mr. mime (names don't match in pokemondb)
                var pokeNameCleaned = allPokemon[i].name.replace(". ","-").replace("\'","").toLowerCase(); 
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