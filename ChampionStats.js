class ChampionStats
{
	constructor( speed, force, agility, inteligence, health )
	{
		this.speed = speed;
		this.force = force;
		this.agility = agility;
		this.inteligence = inteligence;
		this.health = health;
	}
	consolePrint()
	{
		console.log( "STATS:: speed: " + this.speed + "\tforce: " + this.force + "\tagility: " + this.agility + "\tinteligence: " + this.inteligence + "\thealth: " + this.health  );
	}
}