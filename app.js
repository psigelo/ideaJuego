//Este codigo es para asegurar que el juego empieza enfocado.
$(function() {
   $('#DIV-game').focus();
});

// =============================================================================
// ===========================      MAIN       =================================
// =============================================================================
// Is called in the body of the index.html throught onLoad method.

//Estas variables son creadas globales para poder ser usadsa desde la consola del javascript 
// Estan expuestas a la consola del usuario.
var userChampion;
var glController;
var debugObject;

var mainApp = function( )
{

	debugObject = new DebugObject( false, 0.10 ); // Dont show fps, if is changed then only the 10 percent is showed to reduce the amount of console use.
	var updateTimeMillisec = 50.0;
	var gameStatistics = new GameStatistics( 10, 100 );
	var gameEngine = new GameEngine( updateTimeMillisec, gameStatistics, debugObject ); 
	glController = new GlController( 'game-surface' );
	glController.setClearColor( new Float32Array( [ 0.75, 0.85, 0.8, 1.0 ] )); // Is set a kind of  light blue
	glController.setClearBufferBit( glController.gl.COLOR_BUFFER_BIT | glController.gl.DEPTH_BUFFER_BIT )
	glController.clearColor();
	glController.clear();

	var transformMatrix = new Float32Array( 16 );
	mat4.identity( transformMatrix );
	var transform = new Transform( transformMatrix );
	var stats = new ChampionStats( 1, 2, 3, 4, 100 );
	var camera = new Camera();
	camera.lookAt( [0, 0, 1], [0, 0, 0], [0, 1, 0] )
	camera.createOrthoCamera( -10, 10, -10, 10, -10, 10 );
	championView = new ChampionView( glController, camera );
	userChampion = new Champion( gameEngine, transform, stats, PROFESSIONTYPE.NONE,  championView );


	var transformMatrixBot = new Float32Array( 16 );
	mat4.identity( transformMatrixBot );
	var transformBot = new Transform (transformMatrixBot);
	transformBot.translate([1,1,0]);
	var botStats = new BotStats( 100 );
	var botView = new BotView( glController, camera );
	var bot = new Bot( gameEngine, transformBot, botStats, botView );

	gameEngine.awake();
	gameEngine.start();

	var loop = function () 
	{
		glController.clearColor();
		glController.clear();
		gameEngine.loop();
		requestAnimationFrame(loop);
	};
	requestAnimationFrame(loop);
};
