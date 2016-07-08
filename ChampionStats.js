class ChampionStats
{
	constructor( speed, force, agility, inteligence )
	{
		this.speed = speed;
		this.force = force;
		this.agility = agility;
		this.inteligence = inteligence;
	}
	consolePrint()
	{
		console.log( "STATS:: speed: " + this.speed + "\tforce: " + this.force + "\tagility: " + this.agility + "\tinteligence: " + this.inteligence  );
	}
}