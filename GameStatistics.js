class GameStatistics
{
	constructor( amountOfFPSValuesToProm = 10, amountOfFixedUpdateRateValuesToProm = 100 )
	{
		this.amountOfFPSValuesToProm = amountOfFPSValuesToProm;
		this.amountOfFixedUpdateRateValuesToProm = amountOfFixedUpdateRateValuesToProm;

		this.FPS = 0.0; // Is the update rate
		this.FPSSum = 0.0;
		this.FPSCounter = 0;
		this.FixedUpdateRate = 0.0;
		this.FixedUpdateRateSum = 0.0;
		this.FixedUpdateRateCounter = 0;

	}

	addUpdateDeltaTime( updateDelta_t_millis )
	{
		//console.log( updateDelta_t_millis );
		this.FPSSum += 1000.0 / updateDelta_t_millis; // This is the calculation of a FPS approx
		this.FPSCounter += 1;
		if( this.FPSCounter >= this.amountOfFPSValuesToProm )
		{
			this.FPS = this.FPSSum / this.amountOfFPSValuesToProm;
			this.FPSSum = 0;
			this.FPSCounter = 0;
		}
	}


	addFixedUpdateDeltaTime( fixedUpdateDelta_t_millis )
	{
		
		if(fixedUpdateDelta_t_millis > 0) // Puede ser que no sea mayor que cero pq se realice demasiado rapidamente (y no avance siquiera 1 millis)
		{
			this.FixedUpdateRateSum += 1000.0 / fixedUpdateDelta_t_millis; // This is the calculation of a FPS approx
			this.FixedUpdateRateCounter += 1;
			if( this.FixedUpdateRateCounter >= this.amountOfFixedUpdateRateValuesToProm )
			{
				this.FixedUpdateRate = this.FixedUpdateRateSum / this.amountOfFixedUpdateRateValuesToProm;
				this.FixedUpdateRateSum = 0;
				this.FixedUpdateRateCounter = 0;
			}
		}

		// Vamos a asumir que corre a 1 millis
		this.FixedUpdateRateSum += 1000.0; // This is the calculation of a FPS approx
		this.FixedUpdateRateCounter += 1;
		if( this.FixedUpdateRateCounter >= this.amountOfFixedUpdateRateValuesToProm )
		{
			this.FixedUpdateRate = this.FixedUpdateRateSum / this.amountOfFixedUpdateRateValuesToProm;
			this.FixedUpdateRateSum = 0;
			this.FixedUpdateRateCounter = 0;
		}
	}

	printFPS()
	{
		console.log("FPS: " + this.FPS);

	}

	printFixedUpdateRate()
	{
		if( this.FixedUpdateRate = 1000.0 )
		{
			console.log( "FixedUpdateRate is 1000 because is the maximum measurable, probably is faster than this" );
		}
		console.log("FixedUpdateRate: " + this.FixedUpdateRate );
	}

}