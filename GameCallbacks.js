// KEYBOARD HTML HANDLER FOR CREATE CALLBACKS




$('#DIV-game').bind('keydown', function( event ) 
{
    switch(event.keyCode){
       	case ARROW.LEFT.VALUE : 
       			GameCallback.arrowDown( ARROW.LEFT.VALUE, ARROW.LEFT.DIRECTION );
       		break;
       	case ARROW.RIGHT.VALUE : 
       			GameCallback.arrowDown( ARROW.RIGHT.VALUE, ARROW.RIGHT.DIRECTION );
       		break;
       	case ARROW.UP.VALUE : 
       			GameCallback.arrowDown( ARROW.UP.VALUE, ARROW.UP.DIRECTION );
       		break;
       	case ARROW.DOWN.VALUE : 
       			GameCallback.arrowDown( ARROW.DOWN.VALUE, ARROW.DOWN.DIRECTION );
       		break;
       	default:
    }
 });


$('#DIV-game').bind('keyup', function( event ) 
{

	 switch(event.keyCode){
       	case ARROW.LEFT.VALUE : 
       			GameCallback.arrowUp( ARROW.LEFT.VALUE, ARROW.LEFT.DIRECTION );
       		break;
       	case ARROW.RIGHT.VALUE : 
       			GameCallback.arrowUp( ARROW.RIGHT.VALUE, ARROW.RIGHT.DIRECTION );
       		break;
       	case ARROW.UP.VALUE : 
       			GameCallback.arrowUp( ARROW.UP.VALUE, ARROW.UP.DIRECTION );
       		break;
       	case ARROW.DOWN.VALUE : 
       			GameCallback.arrowUp( ARROW.DOWN.VALUE, ARROW.DOWN.DIRECTION );
       		break;
       	default:
    }
});


var ARROW =
{
	LEFT: { VALUE: 37, DIRECTION:[-1,0,0]},
	UP: { VALUE: 38, DIRECTION:[0,1,0]},
	RIGHT: { VALUE: 39, DIRECTION:[1,0,0]},
	DOWN: { VALUE: 40, DIRECTION:[0,-1,0]}
};

var KEYSTATUS = 
{
	DOWN: 0, // For all key
	UP: 1
};


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



	static arrowDown(arrowValue, arrowDirection)
	{
		// Se tiene un traker de cada flecha, para saber su estado anterior, esto se realiza a travez de un mapa llamado keyTraker. Esto sirve para saber si el usuario esta manteniendo o no la tecla desde antes.

		// si no existe o si el valor anterior era diferente, entonces realizar el callback
		if ( typeof GameCallback.prototype.keyTraker.get( arrowValue ) == "undefined" ||  ! (GameCallback.prototype.keyTraker.get( event.keyCode ) ==  KEYSTATUS.DOWN) )
		{
			
			GameCallback.prototype.keyTraker.set( arrowValue, KEYSTATUS.DOWN );
			
			for (var i = GameCallback.prototype.arrowDownCallback_A.length - 1; i >= 0; i--) {
				GameCallback.prototype.arrowDownCallback_A[i].arrowDown(arrowValue, arrowDirection);
			}
		}
	}


	static arrowUp(arrowValue, arrowDirection)
	{

		// Se tiene un traker de cada flecha, para saber su estado anterior, esto se realiza a travez de un mapa llamado keyTraker. Esto sirve para saber si el usuario esta manteniendo o no la tecla desde antes.
		
		// si no existe o si el valor anterior era diferente, entonces realizar el callback
		if ( typeof GameCallback.prototype.keyTraker.get( event.keyCode ) == "undefined" || !(GameCallback.prototype.keyTraker.get( event.keyCode ) ==  KEYSTATUS.UP) )
		{
			GameCallback.prototype.keyTraker.set( event.keyCode, KEYSTATUS.UP );
			for (var i = GameCallback.prototype.arrowDownCallback_A.length - 1; i >= 0; i--) {
				GameCallback.prototype.arrowDownCallback_A[i].arrowUp(arrowValue, arrowDirection);
			}
		}
	}




}
GameCallback.prototype.arrowDownCallback_A = new Array(); // initializing the value.
GameCallback.prototype.keyTraker = new Map();


// GAMECALLBACK CLASS END
// =============================================================================


