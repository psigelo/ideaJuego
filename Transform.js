class Transform  
{
	constructor( transformMatrix )
	{
		this.transformMatrix = transformMatrix;
	}

	get position ()
	{
		return [ this.transformMatrix[12], this.transformMatrix[13], this.transformMatrix[14] ];
	}
	
	translate( translateXYZ )
	{
		mat4.translate( this.transformMatrix, this.transformMatrix, translateXYZ );
	}

	consolePrint()
	{
		console.log( "Transform.position:: " + this.position );
	}
}