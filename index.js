let gameState = {
	cpuPokemon: "",
	playerPokemon: ""
};

let pokemonEl = document.querySelector(".select-screen").querySelectorAll(".character");

let battleScreenEl = document.getElementById("battle-screen");

let attackBtnsEl = document.getElementById("battle-screen").querySelectorAll(".attack");


let i = 0;
while( i < pokemonEl.length )
	{
		pokemonEl[i].onclick = function () {
			let pokemonName = this.dataset.pokemon;
			gameState.playerPokemon = pokemonName;

			let playerImg = document.querySelector(".player1").getElementsByTagName("img");

			let cpuImg = document.querySelector(".player2").getElementsByTagName("img");

			cpuSelect();

			battleScreenEl.classList.toggle("active");

			gameState.currentPokemon = pokemonDB.filter( function (pokemon) {
				return pokemon.name == gameState.playerPokemon;
			});

			gameState.cpuPokemon = pokemonDB.filter( function (pokemon) {
				return pokemon.name == gameState.cpuPokemon;
			});

			playerImg[0].src = gameState.currentPokemon[0].img;

			cpuImg[0].src = gameState.cpuPokemon[0].img;

			gameState.currentPokemon[0].originalHealth = calcInitHealth(gameState.currentPokemon);
			gameState.cpuPokemon[0].originalHealth = calcInitHealth(gameState.cpuPokemon);

			gameState.currentPokemon[0].health = calcInitHealth(gameState.currentPokemon);
			gameState.cpuPokemon[0].health = calcInitHealth(gameState.cpuPokemon);

		}

		i++;
	}


let j = 0;
while( j < attackBtnsEl.length )
	{
			attackBtnsEl[j].onclick = function () {
				let attackName = this.dataset.attack;

				gameState.currentUserAttack = attackName;

				play( attackName, cpuAttack() );
			}

			j++;
	}

let cpuAttack = function () {
	let attacks = ["rock", "paper", "scissors"];

	return attacks[randomNumber(0, 3)];
};


let calcInitHealth = function ( user ) {
	return ((0.20 * Math.sqrt(user[0].level)) * user[0].stamina) * user[0].hp;
};

let attackMove = function ( attack, level, stack, critical, enemy, attacker ) {
	console.log(enemy.name + " before: " + enemy.health);
	let attackAmount =  ( ( attack * level ) * ( stack * critical ) );
	enemy.health = enemy.health - attackAmount;


	let userHP = document.querySelector(".player1").querySelector(".stats").querySelector(".health").querySelector(".health-bar").querySelector(".inside");
	let cpuHP = document.querySelector(".player2").querySelector(".stats").querySelector(".health").querySelector(".health-bar").querySelector(".inside");

	if( enemy.owner == "user" )
	{
		let minusPercent = ( ( enemy.health * 100 ) / enemy.originalHealth );
		userHP.style.width = ( ( minusPercent < 0 ) ? 0 : minusPercent ) + "%";
	}
	else
	{
		let minusPercent = ( ( enemy.health * 100 ) / enemy.originalHealth );
		cpuHP.style.width = ( ( minusPercent < 0 ) ? 0 : minusPercent ) + "%";
	}
	checkWinner( enemy );
	console.log(enemy.name + " after: " + enemy.health);
};

let checkWinner = function ( enemy, attacker ) {
	if( enemy.health <= 0 )
		{
			console.log(attacker.name + " wins!");
		}
};

let play = function ( userAttack, cpuAttack )
{

let currentPokemon = gameState.currentPokemon[0];
let cpuPokemonRef = gameState.cpuPokemon[0];

currentPokemon.owner = "user";
cpuPokemonRef.owner = "cpu";

switch( userAttack ) {
  case "rock":
    if( cpuAttack == "paper" )
			{
				if( currentPokemon.health >= 1 && cpuPokemonRef.health >= 1 )
					{
						//user
						attackMove( currentPokemon.attack, currentPokemon.level, 0.8, 0.5, cpuPokemonRef, currentPokemon );
					}
				if( cpuPokemonRef.health >= 1 )
					{
						//cpu
						attackMove( cpuPokemonRef.attack, cpuPokemonRef.level, 0.8, 2, currentPokemon, cpuPokemonRef );
					}

			}
		else if( cpuAttack == "scissors" )
			{
				if( currentPokemon.health >= 1 && cpuPokemonRef.health >= 1 )
					{
						//user
						attackMove( currentPokemon.attack, currentPokemon.level, 0.8, 2, cpuPokemonRef, currentPokemon );
					}
				if( cpuPokemonRef.health >= 1 )
					{
						//cpu
						attackMove( cpuPokemonRef.attack, cpuPokemonRef.level, 0.8, 0.5, currentPokemon, cpuPokemonRef );
					}

			}
		else {
				if( currentPokemon.health >= 1 && cpuPokemonRef.health >= 1 )
					{
						//user
						attackMove( currentPokemon.attack, currentPokemon.level, 0.8, 1, cpuPokemonRef, currentPokemon );
					}
				if( cpuPokemonRef.health >= 1 )
					{
						//cpu
						attackMove( cpuPokemonRef.attack, cpuPokemonRef.level, 0.8, 1, currentPokemon, cpuPokemonRef );
					}

		}
    break;

  case "paper":
		if( cpuAttack == "paper" )
			{
				if( currentPokemon.health >= 1 && cpuPokemonRef.health >= 1 )
					{
						//user
						attackMove( currentPokemon.attack, currentPokemon.level, 0.8, 1, cpuPokemonRef, currentPokemon );
					}
				if( cpuPokemonRef.health >= 1 )
					{
						//cpu
						attackMove( cpuPokemonRef.attack, cpuPokemonRef.level, 0.8, 1, currentPokemon, cpuPokemonRef );
					}

			}
		else if( cpuAttack == "scissors" )
			{
				if( currentPokemon.health >= 1 && cpuPokemonRef.health >= 1 )
					{
						//user
						attackMove( currentPokemon.attack, currentPokemon.level, 0.8, 0.5, cpuPokemonRef, currentPokemon );
					}
				if( cpuPokemonRef.health >= 1 )
					{
						//cpu
						attackMove( cpuPokemonRef.attack, cpuPokemonRef.level, 0.8, 2, currentPokemon, cpuPokemonRef );
					}

			}
		else {
				if( currentPokemon.health >= 1 && cpuPokemonRef.health >= 1 )
					{
						//user
						attackMove( currentPokemon.attack, currentPokemon.level, 0.8, 2, cpuPokemonRef, currentPokemon );
					}
				if( cpuPokemonRef.health >= 1 )
					{
						//cpu
						attackMove( cpuPokemonRef.attack, cpuPokemonRef.level, 0.8, 0.5, currentPokemon, cpuPokemonRef );
					}

		}

    console.log( userAttack );
    break;

  case "scissors":
		if( cpuAttack == "paper" )
			{
				if( currentPokemon >= 1 && cpuPokemonRef.health >= 1 )
					{
						//user
						attackMove( currentPokemon.attack, currentPokemon.level, 0.8, 2, cpuPokemonRef, currentPokemon );
					}
				if( cpuPokemonRef.health >= 1 )
					{
						//cpu
						attackMove( cpuPokemonRef.attack, cpuPokemonRef.level, 0.8, 0.5, currentPokemon, cpuPokemonRef );
					}

			}
		else if( cpuAttack == "scissors" )
			{
				if( currentPokemon >= 1 && cpuPokemonRef.health >= 1 )
					{
						//user
						attackMove( currentPokemon.attack, currentPokemon.level, 0.8, 1, cpuPokemonRef, currentPokemon );
					}
				if( cpuPokemonRef.health >= 1 )
					{
						//cpu
						attackMove( cpuPokemonRef.attack, cpuPokemonRef.level, 0.8, 1, currentPokemon, cpuPokemonRef );
					}

			}
		else {
				if( currentPokemon.health >= 1 && cpuPokemonRef.health >= 1 )
					{
						//user
						attackMove( currentPokemon.attack, currentPokemon.level, 0.8, 0.5, cpuPokemonRef, currentPokemon );
					}
				if( cpuPokemonRef.health >= 1 )
					{
						//cpu
						attackMove( cpuPokemonRef.attack, cpuPokemonRef.level, 0.8, 2, currentPokemon, cpuPokemonRef );
					}

		}

    console.log( userAttack );
    break;

}
};


function randomNumber( min, max )
{
	return Math.floor( Math.random() * ( max - min ) ) + min;
}


function cpuSelect()
{
	gameState.cpuPokemon = pokemonEl[randomNumber( 0, 3 )].dataset.pokemon;
}











// pokemon
// create data for 3 different pokemons, with their names, type, weaknesses, health, and attack moves(name, attack stat, maximum)

var pokemonDB = [
  {
    name: 'charmander',
    type: 'fire',
		hp: 39,
    attack: 52,
    stamina: 39,
    level: 1,
		img: "http://www.smogon.com/dex/media/sprites/xy/charmander.gif"
  },
	  {
    name: 'bulbasaur',
    type: 'grass',
		hp: 45,
    attack: 49,
    stamina: 49,
    level: 1,
		img: "http://www.smogon.com/dex/media/sprites/xy/bulbasaur.gif"
  },
	  {
    name: 'squirtle',
    type: 'water',
		hp: 44,
    attack: 48,
    stamina: 65,
    level: 1,
		img: "http://www.smogon.com/dex/media/sprites/xy/squirtle.gif"
  }

]


var attack = 20;
var level = 10;
var stack = 1.3;
var stamina = 39;

// create a formula for attacks
console.log((attack * level ) * stack / 7)



// create a formula for health
//HP = 0.20 x Sqrt(Pokemon_level) x (HP_base_stat)
console.log(((0.20 * Math.sqrt(level)) * stamina) * 15)




// let user choose 1 and then assign a random pokemon to battle thats not the users pokemon
// p1 vs p2




// when one user loses all his health declare a winner