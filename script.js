window.onload = function(){
    var form = document.querySelector('#my_form');
    var pokemonImage = document.querySelector('#img_area');
    var pokemonName = document.querySelector('#name_area');
    var pokemonType = document.querySelector('#type_area');

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
        var pokeName = document.querySelector('#name').value.toLowerCase();
        var radio = document.querySelectorAll('.radio');
        if (pokeName == 'nidoran'){
            for(i = 0; i < radio.length; i++){
                radio[i].style.display = 'inline';
            }
            document.querySelector('#nidoButton').onclick = function(){
                if(document.querySelector('#nidoranM').checked){
                    pokemonName.innerHTML = "Name : Nidoran Male";
                    pokemonImage.innerHTML = '<img src="http://img.pokemondb.net/artwork/nidoran-m.jpg"/>';
                }
                else{
                    pokemonImage.innerHTML = '<img src="http://img.pokemondb.net/artwork/nidoran-f.jpg"/>';
                    pokemonName.innerHTML = "Name : Nidoran Femelle";
                } 
                pokemonType.innerHTML = "Type : poison";
            }
        }
        else{
            for(i = 0; i < radio.length; i++){
                radio[i].style.display = 'none';
            }  
            for(i in allPokemon){
                if (allPokemon[i].name.toLowerCase() == pokeName || i == pokeName){
                    test = true;
                    pokemonName.innerHTML = "Name : " + allPokemon[i].name;
                    pokemonType.innerHTML = "Type : " + allPokemon[i].type;
                    // need the three replace for Farfetch'dn  and Mr. mime (names don't match in pokemondb)           
                    var NameClean=allPokemon[i].name.replace(". ","-").replace("'","").toLowerCase();
                    var finalname=(pokeName==32)?NameClean.replace("nidoran", "nidoran-m"):NameClean.replace("nidoran", "nidoran-f");
                    pokemonImage.innerHTML = '<img src="http://img.pokemondb.net/artwork/' + finalname + '.jpg"/>';
                }
            }
            if (test == false){
                if (isNaN(pokeName)){
                    pokemonName.innerHTML = pokeName+' not found';
                }
                else{
                    pokemonName.innerHTML = 'Pokémon number '+pokeName+' not found';
                }
                pokemonType.innerHTML = "";
                pokemonImage.innerHTML = '<img src="http://cdn.bulbagarden.net/upload/0/0d/201Unown_Question_Dream.png"/>';
            }
        }
        return false;
    }

};