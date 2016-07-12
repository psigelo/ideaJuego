class GameEngine
{
	constructor( updateTimeMillisec, gameStatistics, debugObject )
	{
		this.gameStatistics = gameStatistics;
		this.updateTimeMillisec = updateTimeMillisec;
		this.gameObjectArray = new Array();
		this.run = true;
		this.fixedUpdateDelta_t = 0.0;
		this.UpdateDelta_t = 0.0;
		this.debugObject = debugObject;
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
		if( !this.run ) // Asegurar que en caso de que no este corriendo la aplicacion no pase por ninguna linea de este codigo
		{
			return;
		}

		var timeEnlapsed = 0.0;
		var t0 = performance.now();
		var t1 = 0.0;
		var t2 = t0;
		
		while( this.run )
		{
			t1 = performance.now();
			this.fixedUpdateDelta_t_millis =  ( (t1 - t2 != 0) ? t1 - t2 : 1 );// Pasa asegurar que el valor resultante no sea infinito se asume que el minimo es 1
			this.gameStatistics.addFixedUpdateDeltaTime( this.fixedUpdateDelta_t_millis );
			this.fixedUpdate();
			t2 = performance.now();
			if ( (t1 - t0) > this.updateTimeMillisec )
			{
				this.updateDelta_t_millis =  ( (t1 - t0 != 0) ? t1 - t0 : 1 ); // Pasa asegurar que el valor resultante no sea infinito se asume que el minimo es 1. tampoco afecta mucho pues en tal caso significa que esta siendo muy rapido.
				this.gameStatistics.addUpdateDeltaTime( this.updateDelta_t_millis );

				// Debug FPS
				if( this.debugObject.seeFPS )
				{
					if( Math.random() < this.debugObject.percentOfFPSToShow )
					{
						this.gameStatistics.printFixedUpdateRate();
						this.gameStatistics.printFPS();
					}
				}

				this.update();
				break;
			}
		}
	}

	updateDeltaTimeMillis()
	{
		return updateDelta_t_millis;
	} 

	fixedUpdateDeltaTimeMillis()
	{
		return fixedUpdateDelta_t_millis
	}

	end()
	{
		this.run = false;
	}
}