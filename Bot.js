class Bot extends GameObject
{
	constructor( gameEngine, transform, stats, botView)
	{
		super( gameEngine );
		this.transform = transform;
		this.botView = botView;
		this.botStats = stats;
	}

	Awake()
	{

	}

	start()
	{

	}

	update()
	{
		this.botView.draw( this.transform.transformMatrix );
	}
}