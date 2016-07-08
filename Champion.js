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
		this.transform = transform;
		this.proffession = proffession;
		this.stats = stats;
		this.championView = championView;
		GameCallback.appendArrowDownCallback( this );
	}

	arrowDown()
	{
		if( InputKeyboard.prototype.down == KEYSTATUS.DOWN )
		{			
			mat4.translate( this.transform.transformMatrix, this.transform.transformMatrix, [0.0, -1.0, 0.0 ] );
		}
		if( InputKeyboard.prototype.up == KEYSTATUS.DOWN )
		{
			mat4.translate( this.transform.transformMatrix, this.transform.transformMatrix, [0.0, 1.0, 0.0 ] );
		}
		if( InputKeyboard.prototype.left == KEYSTATUS.DOWN )
		{
			mat4.translate( this.transform.transformMatrix, this.transform.transformMatrix, [-1.0 , 0.0, 0.0 ] );
		}
		if( InputKeyboard.prototype.right == KEYSTATUS.DOWN )
		{
			mat4.translate( this.transform.transformMatrix, this.transform.transformMatrix, [1.0 , 0.0, 0.0 ] );
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
	}
}