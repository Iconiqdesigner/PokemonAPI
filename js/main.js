

/*

http://pokeapi.co/docsv2

*/

// 1. Write an API call that gets all the berries and passes the response into a callback
function getAllBerries(url, callback){
  $.ajax({
    url: 'http://pokeapi.co/api/v2/' + url + "?limit=64",
    success: callback
  });
}
//
// // 2. The call back should loop through the response and console.log every berry name
function getAllBerriesCallback(response){
  var allBerries = response.results;
  allBerries.forEach(function(berry) {
    console.log(berry.name);
  });
}
// //
// // getAllBerries('berry', getAllBerriesCallback);
//
// // 3. Write an API call that gets all the pokemon and passes the response into a callback
function getAllPokemon(url, callback){
  $.ajax({
    url: 'http://pokeapi.co/api/v2/' + url + '?limit=2',
    success: callback
  })
}
//
// // 4. The call back should loop through the response and console.log every pokemon name
function getAllPokemonCallback(response){
  var pokedex = response.results;
  pokedex.forEach(function(pokemon){
    console.log(pokemon.name);
  })
}
//
// // getAllPokemon('pokemon', getAllPokemonCallback);
//
// // 5. Write an API call that gets all the Item and passes the response into a callback
function getAllItems(url, callback){
  $.ajax({
    url: 'http://pokeapi.co/api/v2/' + url + '?limit=2',
    success: callback
  })
}
//
// // 6. The call back should loop through the response and console.log every item name
function getAllItemsCallback(response){
  var backpack = response.results;
  backpack.forEach(function(item){
    console.log(item.name);
  })
}
//
// //getAllItems('item', getAllItemsCallback);
//
// // 7. Write an API call that gets all the Item and passes the response into a callback
function getAllLocations(url, callback){
    $.ajax({
      url: 'http://pokeapi.co/api/v2/' + url + '?limit=2',
      success: callback
    })
}
//
// // 8. The call back should loop through the response and console.log every Location name
function getAllLocationsCallback(response){
  var map = response.results;
  map.forEach(function(city){
    console.log(city.name);
  })
}
//
// //getAllLocations('location', getAllLocationsCallback);
//
// // 9. Write an API call that gets a pokemon and passes the response into a callback
function getSinglePokemon(pokemonName, callback){
    $.ajax({
      url: 'http://pokeapi.co/api/v2/pokemon/' + pokemonName,
      success: callback
    })
}
//
// // 10. The call back should loop through the response and console.log the pokemon name
function getSinglePokemonCallback(response){
  var name = response.name;
  console.log(name);
}
//
// // getSinglePokemon('bulbasaur', getSinglePokemonCallback);
//
// // 11.  Write a function that accepts a pokemon Object and returns the front_default sprite url
function pokemonImage(pokemon){
  var pokemonFront = pokemon.sprites.front_default;
  console.log(pokemonFront);
}
//
// // getSinglePokemon('bulbasaur', pokemonImage);
//
// // 12.  Write a function that accepts a pokemon Object and returns an array of ability names
function pokemonAbilities(pokemon){
  var abilities = pokemon.abilities;
  console.log(abilities);
}
//
// // getSinglePokemon('bulbasaur', pokemonAbilities);
//
//
//
// // 13.  Write a function that accepts a pokemon image url, pokemon name, and an array of abilities and adds to the page:
// // - an <li> added to #pokemon-list
// // - an <h1> witht their name
// // - and <img> tag with their image url
// // - an <ul> and <li> of abilities
function addPokemonToPage(pokemonName, pokemonImageUrl, abilities){
  var $pokeLi = $("<li></li>");
  var $movesList = $('<ul class="moves-list"></ul>');

  abilities.forEach(function(abilityObj) {
    $movesList.append('<li>' + abilityObj.ability.name + '</li>');
  })

  $pokeLi.append("<h1>" + pokemonName + "</h1>");
  $pokeLi.append('<img src="' + pokemonImageUrl + '" alt="' + pokemonName + '" style="display: block;" />');
  $pokeLi.append($movesList);
  $("#pokemon-list").append($pokeLi);

}
//
// //
getSinglePokemon('bulbasaur', function(pokemon) {
  var pokemonName = pokemon.name;
  var pokemonImg = pokemon.sprites.front_default;
  var pokemonAbilities = pokemon.abilities;

  addPokemonToPage(pokemonName, pokemonImg, pokemonAbilities)

});
//
//
//
// // 14.  When the getAllPokemonCallback is called it should now pass each pokemon into the getSinglePokemon function.  The getSinglePokemonCallback function should:
// // - call pokemonImage function
// // - call pokemonAbilities function
// // - call addPokemontoPage function
//
function getAllPokemonCallback(response){
  var pokeRay = response.results

  pokeRay.forEach(function(pokemon) {
    getSinglePokemon(pokemon.name, function(data) {
      pokemonImage(data);
      pokemonAbilities(data);
      addPokemonToPage(data.name, data.sprites.front_default, data.abilities);
    })
  })
};
//
// // getAllPokemon('pokemon', getAllPokemonCallback);
//
//
// // 15.  Create a Pokemon object constructor that can accept a Pokemon's name, image url, and an array of abilities
function Pokemon(pokemonName, pokemonImage, pokemonAbilities) {
  this.name = pokemonName;
  this.image = pokemonImage;
  this.abilities = pokemonAbilities;
}

// // 16.  Create a global array of allPokemon to store pokemon in
var allPokemonArr = [];
//
// // 17.  The getSinglePokemonCallback should
function getSinglePokemonCallback(pokemon) {
  // - pass it to the addPokemonToPage function.
  addPokemonToPage(pokemon.name, pokemon.sprites.front_default, pokemon.abilities);
  // - pass the necessary data to the Pokemon constructor
  var myPokemon = new Pokemon(pokemon.name, pokemon.sprites.front_default, pokemon.abilities);
  // - add it to the AllPokemon array
  allPokemonArr.push(myPokemon);
}
//
// // getSinglePokemon('chansey', getSinglePokemonCallback);
//
// // 18.  Adjust the addPokemonToPage function to accept your Pokemon object instead of the 3 params.
function addPokemonToPage(pokemonObj){
  var $pokeLi = $("<li></li>");
  var $movesList = $('<ul class="moves-list"></ul>');
  var abilArr = pokemonObj.abilities;
  var pokeName = pokemonObj.name;
  var pokeSprite = pokemonObj.sprites.front_default;

  abilArr.forEach(function(abilityObj) {
    $movesList.append('<li>' + abilityObj.ability.name + '</li>');
  })

  $pokeLi.append("<h1>" + pokeName + "</h1>");
  $pokeLi.append('<img src="' + pokeSprite + '" alt="' + pokeName + '" style="display: block;" />');
  $pokeLi.append($movesList);
  $("#pokemon-list").append($pokeLi);

}

// 19.  Restructure your app as an object literal POKEMONAPP
// - with all public methods
// -- so you can call POKEMONAPP.anymethod()
// --  make a property POKEMONAPP.allPokemon to hold the array of pokemon

var POKEMONAPP = {
  allPokemon: [],

  getAllBerries: function() {
    $.ajax({
      url: 'http://pokeapi.co/api/v2/berry/?limit=64',

      success: function(response){
        console.log(response);
        var allBerries = response.results;
        allBerries.forEach(function(berry) {
          console.log(berry.name);
        })
      }
    });
  },

  getAllPokemon: function() {
    $.ajax({
      url: 'http://pokeapi.co/api/v2/pokemon/?limit=811',

      success: function(response){
        console.log(response);
        var allPokemon = response.results;
        allPokemon.forEach(function(pokemon) {
          console.log(pokemon.name);
        })
      }
    });
  },

  getAllItems: function() {
    $.ajax({
      url: 'http://pokeapi.co/api/v2/item/?limit=746',

      success: function(response){
        // console.log(response);
        var allPokemon = response.results;
        allPokemon.forEach(function(pokemon) {
          console.log(pokemon.name);
        })
      }
    });
  },

  getAllLocations: function() {
    $.ajax({
      url: 'http://pokeapi.co/api/v2/location/?limit=678',

      success: function(response){
        // console.log(response);
        var allLocations = response.results;
        allLocatons.forEach(function(location) {
          console.log(location.name);
        })
      }
    });
  },

  createPokemon: function(pokeObj) {
    this.name = pokemonName;
    this.image = pokemonImage;
    this.abilities = pokemonAbilities;
  },

  addPokemonToPage: function(pokemonObj){
    var $pokeLi = $("<li></li>");
    var $movesList = $('<ul class="moves-list"></ul>');
    var abilArr = pokemonObj.abilities;
    var pokeName = pokemonObj.name;
    var pokeSprite = pokemonObj.sprites.front_default;

    abilArr.forEach(function(abilityObj) {
      $movesList.append('<li>' + abilityObj.ability.name + '</li>');
    })

    $pokeLi.append("<h1>" + pokeName + "</h1>");
    $pokeLi.append('<img src="' + pokeSprite + '" alt="' + pokeName + '" style="display: block;" />');
    $pokeLi.append($movesList);
    $("#pokemon-list").append($pokeLi);

  },

  getSinglePokemon: function(pokemonName){
      $.ajax({
        url: 'http://pokeapi.co/api/v2/pokemon/' + pokemonName,
        success: function(pokemon) {
          // - pass it to the addPokemonToPage function.
          addPokemonToPage(pokemon);
          // - pass the necessary data to the Pokemon constructor
          var myPokemon = new Pokemon(pokemon.name, pokemon.sprites.front_default, pokemon.abilities);
          // - add it to the AllPokemon array
          POKEMONAPP.allPokemon.push(myPokemon);
          // console.log(myPokemon);
        }
      })
  }

}

// POKEMONAPP.getSinglePokemon('ivysaur');
// POKEMONAPP.allPokemon;

// 20.  Change the getAllPokemon method to not make an API call and just return the array of pokemon if the API has already been called.
var storedPokemon;

function getAllPokemon(){
  if (!storedPokemon) {
    $.ajax({
      url: 'http://pokeapi.co/api/v2/pokemon?limit=811',
      success: function(response) {
        storedPokemon = response;
      }
    });
  } else {
    return storedPokemon;
  }
}

// getAllPokemon();

// 21.  Restructure your app as an object with
// - with only one public method
//	-- getAllPokemon
var POKEMONAPP = {
  allPokemon: null,

  getAllPokemon: function() {
    if (!POKEMONAPP.allPokemon) {
      $.ajax({
        url: 'http://pokeapi.co/api/v2/pokemon?limit=811',
        success: function(response) {
          POKEMONAPP.allPokemon = response.results;
        }
      });
      alert("made an ajax call");
    } else {
      alert("use the object");
      return POKEMONAPP.allPokemon;
    }
  }
  //END getAllPokemon

}

// POKEMONAPP.getAllPokemon();

// 22.  Restructure your app as an object with public methods and private methods
// - (hint create an IIFE that returns an object with the public methods as closures)

( function() {

  //	-- getAllBerries
  var getAllBerries = function(callback) {
    $.ajax({
      url: 'http://pokeapi.co/api/v2/berry?limit=64',
      success: callback
    });
  };

  //	-- getAllPokemon
  var getAllPokemon = function(callback) {
    $.ajax({
      url: 'http://pokeapi.co/api/v2/pokemon?limit=811',
      success: callback
    });
  };

  // 	-- getAllItems
  var getAllItems = function(callback) {
    $.ajax({
      url: 'http://pokeapi.co/api/v2/item?limit=746',
      success: callback
    });
  };

  //	-- getAllLocations
  var getAllLocations = function(callback) {
    $.ajax({
      url: 'http://pokeapi.co/api/v2/location?limit=678',
      success: callback
    });
  };

  var POKEMONAPP = {

    //	-- getAllBerriesCallback
    getAllBerriesCallback: function(response) {
      var allBerries = response.results;
      allBerries.forEach(function(berry) {
        console.log(berry.name);
      });
    },

    //	-- getAllPokemonCallback
    getAllPokemonCallback: function(response){
      var allPokemon = response.results;
      allPokemon.forEach(function(pokemon) {
        console.log(pokemon.name);
      });
    },

    //	-- getAllBerriesCallback
    getAllItemsCallback: function(response){
      var allItems = response.results;
      allItems.forEach(function(item) {
        console.log(item.name);
      });
    },

    //	-- getAllBerriesCallback
    getAllLocationsCallback: function(response){
      var allLocations = response.results;
      allLocations.forEach(function(location) {
        console.log(location.name);
      });
    },

    getSinglePokemonCallback: function(pokemon) {
      // - pass it to the addPokemonToPage function.
      addPokemonToPage(pokemon.name, pokemon.sprites.front_default, pokemon.abilities);
      // - pass the necessary data to the Pokemon constructor
      var myPokemon = new Pokemon(pokemon.name, pokemon.sprites.front_default, pokemon.abilities);
      // - add it to the AllPokemon array
      allPokemonArr.push(myPokemon);
    },

    pokemonImage: function(pokemon){
      var pokemonFront = pokemon.sprites.front_default;
      console.log(pokemonFront);
    },

    pokemonAbilities: function(pokemon){
      var abilities = pokemon.abilities;
      console.log(abilities);
    },

    addPokemonToPage: function(pokemonName, pokemonImageUrl, abilities){
      var $pokeLi = $("<li></li>");
      var $movesList = $('<ul class="moves-list"></ul>');

      abilities.forEach(function(abilityObj) {
        $movesList.append('<li>' + abilityObj.ability.name + '</li>');
      })

      $pokeLi.append("<h1>" + pokemonName + "</h1>");
      $pokeLi.append('<img src="' + pokemonImageUrl + '" alt="' + pokemonName + '" style="display: block;" />');
      $pokeLi.append($movesList);
      $("#pokemon-list").append($pokeLi);
    }
  };

  return POKEMONAPP;

});


///////////////////////////////////////






// - public methods:
// - and private methods:
//  -- getAllPokemonCallback
// 	-- getAllItemsCallback
//  -- getAllLocationsCallback
//  -- getSinglePokemonCallback
//  -- pokemonImage
//  -- pokemonAbilities
//  -- addPokemonToPage

// 23.  Write an IIFE that accepts the $jquery object and window as parameters that wraps around your code to give it a private scope
(function (jqObj, loc) {
  //	-- getAllBerries
  var getAllBerries = function(callback){
    $.ajax({
      url: 'http://pokeapi.co/api/v2/berry?limit=64',
      success: callback
    });
  };

  //	-- getAllPokemon
  var getAllPokemon = function(callback){
    $.ajax({
      url: 'http://pokeapi.co/api/v2/pokemon?limit=811',
      success: callback
    });
  };

  // 	-- getAllItems
  var getAllItems = function(callback){
    $.ajax({
      url: 'http://pokeapi.co/api/v2/item?limit=746',
      success: callback
    });
  };

  //	-- getAllLocations
  var getAllLocations = function(callback){
    $.ajax({
      url: 'http://pokeapi.co/api/v2/location?limit=678',
      success: callback
    });
  };

  var POKEMONAPP = function() {

    //	-- getAllBerriesCallback
    getAllBerriesCallback: function(response){
      var allBerries = response.results;
      allBerries.forEach(function(berry) {
        console.log(berry.name);
      });
    },

    //	-- getAllPokemonCallback
    getAllPokemonCallback: function(response){
      var allPokemon = response.results;
      allPokemon.forEach(function(pokemon) {
        console.log(pokemon.name);
      });
    },

    //	-- getAllBerriesCallback
    getAllItemsCallback: function(response){
      var allItems = response.results;
      allItems.forEach(function(item) {
        console.log(item.name);
      });
    },

    //	-- getAllBerriesCallback
    getAllLocationsCallback: function(response){
      var allLocations = response.results;
      allLocations.forEach(function(location) {
        console.log(location.name);
      });
    },

    getSinglePokemonCallback: function(pokemon) {
      // - pass it to the addPokemonToPage function.
      addPokemonToPage(pokemon.name, pokemon.sprites.front_default, pokemon.abilities);
      // - pass the necessary data to the Pokemon constructor
      var myPokemon = new Pokemon(pokemon.name, pokemon.sprites.front_default, pokemon.abilities);
      // - add it to the AllPokemon array
      allPokemonArr.push(myPokemon);
    },

    pokemonImage: function(pokemon){
      var pokemonFront = pokemon.sprites.front_default;
      console.log(pokemonFront);
    },

    pokemonAbilities: function(pokemon){
      var abilities = pokemon.abilities;
      console.log(abilities);
    },

    addPokemonToPage: function(pokemonName, pokemonImageUrl, abilities){
      var $pokeLi = $("<li></li>");
      var $movesList = $('<ul class="moves-list"></ul>');

      abilities.forEach(function(abilityObj) {
        $movesList.append('<li>' + abilityObj.ability.name + '</li>');
      })

      $pokeLi.append("<h1>" + pokemonName + "</h1>");
      $pokeLi.append('<img src="' + pokemonImageUrl + '" alt="' + pokemonName + '" style="display: block;" />');
      $pokeLi.append($movesList);
      $("#pokemon-list").append($pokeLi);
    }

    return POKEMONAPP;
  }
}("jqueryObject", window));

// 24.  Make buttons and click events for each of the public methods

// 25.  Make form where you can enter a pokemon's name and submit the form to make an API call to show their info
