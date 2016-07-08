//Este codigo es para asegurar que el juego empieza enfocado.
$(function() {
   $('#DIV-game').focus();
});

// =============================================================================
// ===========================      MAIN       =================================
// =============================================================================
// Is called in the body of the index.html throught onLoad method.

//Estas variables son creadas globales para poder ser usadsa desde la consola del javascript 
var userChampion;
var glController;

var mainApp = function( )
{
	var updateTimeMillisec = 50.0;
	var gameEngine = new GameEngine( updateTimeMillisec ); 
	glController = new GlController( 'game-surface' );
	glController.setClearColor( new Float32Array( [ 0.75, 0.85, 0.8, 1.0 ] ));
	glController.setClearBufferBit( glController.gl.COLOR_BUFFER_BIT | glController.gl.DEPTH_BUFFER_BIT )
	glController.clearColor();
	glController.clear();

	var transformMatrix = new Float32Array( 16 );
	mat4.identity( transformMatrix );
	var transform = new Transform( transformMatrix );
	var stats = new ChampionStats( 1, 2, 3, 4 );
	var camera = new Camera();
	camera.lookAt( [0, 0, 1], [0, 0, 0], [0, 1, 0] )
	camera.createOrthoCamera( -10, 10, -10, 10, -10, 10 );
	championView = new ChampionView( glController, camera );
	userChampion = new Champion( gameEngine, transform, stats, PROFESSIONTYPE.NONE,  championView );


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
