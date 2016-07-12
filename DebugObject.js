class DebugObject
{
	constructor( seeFPS, percentOfFPSToShow )
	{
		this.seeFPS = seeFPS;
		this.percentOfFPSToShow = percentOfFPSToShow;
	}

	showFPS()
	{
		this.seeFPS = true;
	}

	dontShowFPS()
	{
		this.seeFPS = false;
	}

	setPercentOfFPSToShow( percentOfFPSToShow )
	{
		this.percentOfFPSToShow = percentOfFPSToShow;
	}
}