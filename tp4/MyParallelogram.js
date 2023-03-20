import {CGFobject} from '../lib/CGF.js';

export class MyParallelogram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0, 0, 0,	//0
			1, 0, 0,	//1
			2, 0, 0,	//2
            3, 1, 0,    //3
			2, 1, 0,    //4
			1, 1, 0,     //5

			0, 0, 0,	//0
			1, 0, 0,	//1
			2, 0, 0,	//2
            3, 1, 0,    //3
			2, 1, 0,    //4
			1, 1, 0,     //5
	
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 5,
			1, 4, 5,
			1, 2, 4,
			2, 3, 4,

			11, 7, 6,
			11, 10, 7,
			10, 8, 7,
			10, 9, 8
			
		];

		this.normals = [

			0,0,1,
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,1,

			0,0,-1,
			0,0,-1,
			0,0,-1,
			0,0,-1,
			0,0,-1,
			0,0,-1,




		];

		this.texCoords = [

		]

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}