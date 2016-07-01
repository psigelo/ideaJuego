var PROFESSIONTYPE = 
{
	NONE: 0,
	SORCER: 1,
	ARCHER: 2,
	KNIGHT: 3
};


class ChampionStats
{
	constructor( speed, force, agility, inteligence )
	{
		this.speed = speed;
		this.force = force;
		this.agility = agility;
		this.inteligence = inteligence;
	}


}

ChampionStats.prototype.consolePrint = function()
{
	console.log( "speed: " + this.speed + "\tforce: " + this.force + "\tagility: " + this.agility + "\tinteligence: " + this.inteligence  );
}



// TRANSFORM CLASS

// Usar mat4 de gl-matrix como standart.
class Transform  
{
	constructor( transformMatrix )
	{
		this.transformMatrix = transformMatrix;
	}

	get position ()
	{
		console.log("HOOOOLA");
		console.log( this.transformMatrix );
		return [ this.transformMatrix[12], this.transformMatrix[13], this.transformMatrix[14] ];
	}

}

// END TRANSFORM CLASS

class Champion 
{
	constructor( transform, stats, proffession )
	{
		this.transform = transform;
		this.proffession = proffession;
		this.stats = stats;
	}

	// get transform()
	// {
	// 	return this.transform;
	// }
	
}

champion.prototype.messege = function()
{	
	this.stats.consolePrint();
}


// Is called in the body of the index.html throught onLoad method.
var mainApp = function( )
{
	var transformMatrix = new Float32Array( 16 );
	mat4.identity( transformMatrix );
	mat4.translate( transformMatrix, transformMatrix, [ 1.0, 2.0, 3.0 ] ); 




	var userChampion = new champion( new Transform( transformMatrix ), new ChampionStats( 1, 2, 3, 4 ), PROFESSIONTYPE.NONE );
	userChampion.messege();
	console.log( userChampion.transform );

};