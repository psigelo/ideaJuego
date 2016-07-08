// KEYBOARD HTML HANDLER FOR CREATE CALLBACKS

$('#DIV-game').bind('keydown', function( event ) {
    switch(event.keyCode){
       	case ARROWENUM.LEFT : 
       			InputKeyboard.leftDown();
       		break;
       	case ARROWENUM.RIGHT : 
       			InputKeyboard.rightDown();
       		break;
       	case ARROWENUM.UP : 
       			InputKeyboard.upDown();
       		break;
       	case ARROWENUM.DOWN : 
       			InputKeyboard.downDown();
       		break;
       	default:
    }
 });


$('#DIV-game').bind('keyup', function( event ) {
    switch(event.keyCode){
       	case ARROWENUM.LEFT : 
       			InputKeyboard.leftUp();
       		break;
       	case ARROWENUM.RIGHT : 
       			InputKeyboard.rightUp();
       		break;
       	case ARROWENUM.UP : 
       			InputKeyboard.upUp();
       		break;
       	case ARROWENUM.DOWN : 
       			InputKeyboard.downUp();
       		break;
       	default:
    }
 });


var KEYSTATUS = 
{
	RELEASE: 0,
	DOWN: 1, // For all key
	PRESSED: 2, //pressed is only for characters
	UP: 3
};

var ARROWENUM =
{
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40
};

// =============================================================================
// INPUTKEYBOARD CLASS
// =============================================================================
class InputKeyboard
{
	constructor()
	{

	}

	static leftDown()
	{
		InputKeyboard.prototype.left = KEYSTATUS.DOWN;
		GameCallback.arrowDownCallback();
	}

	static rightDown()
	{
		InputKeyboard.prototype.right = KEYSTATUS.DOWN;
		GameCallback.arrowDownCallback();
	}

	static upDown()
	{
		InputKeyboard.prototype.up = KEYSTATUS.DOWN;
		GameCallback.arrowDownCallback();
	}

	static downDown()
	{
		InputKeyboard.prototype.down = KEYSTATUS.DOWN;
		GameCallback.arrowDownCallback();
	}

	static leftUp()
	{
		InputKeyboard.prototype.left = KEYSTATUS.UP;
	}

	static rightUp()
	{
		InputKeyboard.prototype.right = KEYSTATUS.UP;
	}

	static upUp()
	{
		InputKeyboard.prototype.up = KEYSTATUS.UP;
	}

	static downUp()
	{
		InputKeyboard.prototype.down = KEYSTATUS.UP;
	}
}

InputKeyboard.prototype.up = KEYSTATUS.RELEASE;
InputKeyboard.prototype.down = KEYSTATUS.RELEASE;
InputKeyboard.prototype.left = KEYSTATUS.RELEASE;
InputKeyboard.prototype.right = KEYSTATUS.RELEASE;

// END INPUTKEYBOARD CLASS
// =============================================================================






// =============================================================================
// =============================================================================
// GAMECALLBACK CLASS 
class GameCallback
{
	static appendArrowDownCallback( object )
	{
		GameCallback.prototype.arrowDownCallback_A.push( object );
	}

	static arrowDownCallback()
	{
		for (var i = GameCallback.prototype.arrowDownCallback_A.length - 1; i >= 0; i--)
		{			
			GameCallback.prototype.arrowDownCallback_A[i].arrowDown(); // Only is informed that any arrow is down, not more information in the callback, they can know more trought the key status.
		}
	}
}
GameCallback.prototype.arrowDownCallback_A = new Array(); // initializing the value.



// GAMECALLBACK CLASS END
// =============================================================================


