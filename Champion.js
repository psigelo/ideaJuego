var PROFESSIONTYPE = 
{
	NONE: 0,
	SORCER: 1,
	ARCHER: 2,
	KNIGHT: 3
};

class Champion extends GameObject
{
	constructor( gameEngine, transform, stats, proffession, championView )
	{
		super( gameEngine );
		this.gameEngine = gameEngine;
		this.transform = transform;
		this.proffession = proffession;
		this.stats = stats;
		this.championView = championView;
		GameCallback.appendArrowDownCallback( this );
		this.arrowTimeStamp0 = new Map();
		this.arrowIsHoldingDown = new Map();
		this.mapArrowWithDirection = new Map();
	}

	arrowDown( arrowValue, arrowDirection )
	{
		this.mapArrowWithDirection.set( arrowValue,  arrowDirection );
		this.arrowTimeStamp0.set( arrowValue,  performance.now() );
		this.arrowIsHoldingDown.set ( arrowValue, true ); 
	}

	arrowUp( arrowValue, arrowDirection )
	{
		this.arrowIsHoldingDown.set ( arrowValue, false ); 
	}

	keyDownProcess()
	{

		for ( var [arrowValue, arrowDirection] of this.mapArrowWithDirection ) {
			if( typeof  this.arrowIsHoldingDown.get( arrowValue ) != "undefined" && this.arrowIsHoldingDown.get( arrowValue ) )
			{
				var deltaSec = ( performance.now() - this.arrowTimeStamp0.get( arrowValue ) )/1000.0;
				if( deltaSec > 0 ) // if is less then dont do anything
				{
					this.move( arrowDirection, deltaSec );
					this.arrowTimeStamp0.set( arrowValue, performance.now() );
				}
			}
		}
	
	}

	consolePrint()
	{
		this.stats.consolePrint();
		this.transform.consolePrint();
	}

	draw()
	{
		this.championView.draw( this.transform.transformMatrix );
	}

	update()
	{
		this.draw();
	}

	fixedUpdate()
	{
		this.keyDownProcess();
	}

	move( direction, deltaSec )
	{
		var mult = this.stats.speed * deltaSec;
		var deltaPos = [ direction[0] * mult, direction[1] * mult, direction[2] * mult ];
		mat4.translate( this.transform.transformMatrix, this.transform.transformMatrix, deltaPos );
	}
}