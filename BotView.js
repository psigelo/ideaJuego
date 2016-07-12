class BotView
{
	constructor( glController, camera )
	{
		this.camera = camera;
		this.glController = glController;
		this.vertexShaderText = 
			[
			'precision mediump float;',
			'',
			'attribute vec3 vertPosition;',
			'attribute vec3 vertColor;',
			'varying vec3 fragColor;',
			'uniform mat4 mWorld;',
			'uniform mat4 mView;',
			'uniform mat4 mProj;',
			'',
			'void main()',
			'{',
			'  fragColor = vertColor;',
			'  gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);',
			'}'
			].join('\n');

		this.fragmentShaderText =
			[
			'precision mediump float;',
			'',
			'varying vec3 fragColor;',
			'void main()',
			'{',
			'  gl_FragColor = vec4(fragColor, 1.0);',
			'}'
			].join('\n');

		this.program = createGLProgram( this.vertexShaderText, this.fragmentShaderText, glController );

		//
		// Create buffer
		//
		this.boxVertices = 
		[   // X, Y, Z           R, G, B
			-1, -1, 0,			0, 0, 1,
			1, 1, 0, 			0, 0, 1,
			1, -1, 0, 			0, 0, 1,
			-1, 1, 0, 			0, 0, 1
		];

		this.boxIndices =
		[
			0, 1, 2,
			0, 1, 3
		];

		var gl = this.glController.glHandler;
		this.boxVertexBufferObject = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.boxVertexBufferObject);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array( this.boxVertices ), gl.STATIC_DRAW);

		this.boxIndexBufferObject = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.boxIndexBufferObject);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( this.boxIndices ), gl.STATIC_DRAW);

		this.positionAttribLocation = gl.getAttribLocation(this.program, 'vertPosition');
		this.colorAttribLocation = gl.getAttribLocation(this.program, 'vertColor');		

		this.matWorldUniformLocation = gl.getUniformLocation(this.program, 'mWorld');
		this.matViewUniformLocation = gl.getUniformLocation(this.program, 'mView');
		this.matProjUniformLocation = gl.getUniformLocation(this.program, 'mProj');

		gl.vertexAttribPointer(
			this.positionAttribLocation, // Attribute location
			3, // Number of elements per attribute
			gl.FLOAT, // Type of elements
			gl.FALSE,
			6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
			0 // Offset from the beginning of a single vertex to this attribute
		);
		
		gl.vertexAttribPointer(
			this.colorAttribLocation, // Attribute location
			3, // Number of elements per attribute
			gl.FLOAT, // Type of elements
			gl.FALSE,
			6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
			3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
		);
	}



	draw( transform )
	{
		var gl = this.glController.glHandler;		

		gl.enableVertexAttribArray(this.positionAttribLocation);
		gl.enableVertexAttribArray(this.colorAttribLocation);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.boxVertexBufferObject);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array( this.boxVertices ), gl.STATIC_DRAW);

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.boxIndexBufferObject);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( this.boxIndices ), gl.STATIC_DRAW);


		gl.vertexAttribPointer(
			this.positionAttribLocation, // Attribute location
			3, // Number of elements per attribute
			gl.FLOAT, // Type of elements
			gl.FALSE,
			6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
			0 // Offset from the beginning of a single vertex to this attribute
		);
		
		gl.vertexAttribPointer(
			this.colorAttribLocation, // Attribute location
			3, // Number of elements per attribute
			gl.FLOAT, // Type of elements
			gl.FALSE,
			6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
			3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
		);

		gl.useProgram( this.program );


		gl.uniformMatrix4fv( this.matWorldUniformLocation, gl.FALSE, transform );
		gl.uniformMatrix4fv( this.matViewUniformLocation, gl.FALSE, this.camera.view );
		gl.uniformMatrix4fv( this.matProjUniformLocation, gl.FALSE, this.camera.perspective );

		gl.drawElements(gl.TRIANGLES, this.boxIndices.length, gl.UNSIGNED_SHORT, 0);

		gl.disableVertexAttribArray(this.positionAttribLocation);
		gl.disableVertexAttribArray(this.colorAttribLocation);
	}

}