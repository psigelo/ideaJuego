class GameEngine
{
	constructor( updateTimeMillisec )
	{
		this.updateTimeMillisec = updateTimeMillisec;
		this.gameObjectArray = new Array();
		this.run = true;
	}
	
	addGameObject( gameObject )
	{
		this.gameObjectArray.push( gameObject );
	}

	update()
	{
		for (var i = this.gameObjectArray.length - 1; i >= 0; i--) {
			if( typeof this.gameObjectArray[ i ].update === "function" )
			{	
				this.gameObjectArray[ i ].update();
			}
		}
	}

	start()
	{
		for (var i = this.gameObjectArray.length - 1; i >= 0; i--) {
			if( typeof this.gameObjectArray[ i ].start === "function" )
			{	
				this.gameObjectArray[ i ].start();
			}
		}
	}

	fixedUpdate()
	{
		for (var i = this.gameObjectArray.length - 1; i >= 0; i--) {
			if( typeof this.gameObjectArray[ i ].fixedUpdate === "function" )
			{	
				this.gameObjectArray[ i ].fixedUpdate();
			}
		}
	}

	awake()
	{
		for (var i = this.gameObjectArray.length - 1; i >= 0; i--) {
			if( typeof this.gameObjectArray[ i ].awake === "function" )
			{	
				this.gameObjectArray[ i ].awake();
			}
		}
	}

	loop()
	{	
		var timeEnlapsed = 0.0;
		var t0 = performance.now();
		var t1 = 0.0;
		while( this.run )
		{
			this.fixedUpdate();
			t1 = performance.now();
			if ( (t1 - t0) > this.updateTimeMillisec )
			{
				this.update();
				break;
			}
		}
	}
}