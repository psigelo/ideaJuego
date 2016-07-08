class Camera
{
	constructor(  )
	{
		this.cameraView = new Float32Array(16);
		this.perspectiveMatrix = new Float32Array(16);
	}

	createPerspectiveCamera(fieldOfViewInRadians, aspectRatio, nearClippingPlaneDistance, farClippingPlaneDistance  )
	{
		mat4.perspective( this.perspectiveMatrix, fieldOfViewInRadians, aspectRatio, nearClippingPlaneDistance, farClippingPlaneDistance );
	}

	createOrthoCamera( left, right, bottom, top, near, far )
	{
		mat4.ortho( this.perspectiveMatrix, left, right, bottom, top, near, far );
	}

	lookAt(eye, center, up)// eye: position of the view, center: Point the viewer is looking at, up: vec3 pointing up
	{
		mat4.lookAt( this.cameraView, eye, center, up ); 
	}

	get view()
	{
		return this.cameraView;
	}

	get perspective()
	{
		return this.perspectiveMatrix;
	}
}