var createGLProgram = function( vertexShaderText, fragmentShaderText, glController  )
{
	//
	// Create shaders
	// 
	var gl = glController.gl;
	var vertexShader = gl.createShader( gl.VERTEX_SHADER );
	var fragmentShader = gl.createShader( gl.FRAGMENT_SHADER );

	gl.shaderSource(vertexShader, vertexShaderText);
	gl.shaderSource(fragmentShader, fragmentShaderText);

	gl.compileShader(vertexShader);
	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
		return;
	}

	gl.compileShader(fragmentShader);
	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
		return;
	}

	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.error('ERROR linking program!', gl.getProgramInfoLog(program));
		return;
	}
	gl.validateProgram(program);
	if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
		console.error('ERROR validating program!', gl.getProgramInfoLog(program));
		return;
	}

	return program;
}



class GlController
{
	constructor( canvasId )
	{
		this.canvas = document.getElementById( canvasId );
		this.gl = this.canvas.getContext( 'webgl' ); // Aqui empieza la magia
		if (!this.gl) {
			console.log('WebGL not supported, falling back on experimental-webgl');
			this.gl = canvas.getContext('experimental-webgl');
		}

		if (!this.gl) {
			alert('Your browser does not support WebGL');
			return;
		}

		this.clearBufferBit = 0;
		this.colorRGBA = new Float32Array(4);
	}

	setClearBufferBit( clearBufferBit )
	{
		this.clearBufferBit = clearBufferBit;
	}

	clear()
	{
		this.gl.clear( this.clearBufferBit );
	}

	setClearColor( colorRGBA )
	{
		this.colorRGBA = colorRGBA;
	}

	clearColor()
	{
		this.gl.clearColor( this.colorRGBA[0], this.colorRGBA[1], this.colorRGBA[2], this.colorRGBA[3] );	
	}

	get glHandler()
	{
		return this.gl;
	}
}
