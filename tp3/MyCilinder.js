import {CGFobject} from '../lib/CGF.js';
/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks)
{
        super(scene);

        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
}


    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var periode = 2 * Math.PI / this.slices;

        for (var ang = 0; ang < 2 * Math.PI; ang += periode) {

            const x = Math.cos(ang);
            const y = Math.sin(ang);

            for (var i = 0; i <= this.stacks; i++) {

                var z = i * (1 / this.stacks);
                this.vertices.push(x, y, z);
                this.normals.push(x, y, 0);
            }
        }
		var level = this.stacks + 1;
		for (var i = 0; i < this.stacks; i++) {
			for (var j = 0; j < this.slices ; j++) {

				var a = i + level * j;
				var b = a + 1;
				var c = a + level;
				var d = c + 1;

				a = a >= (this.vertices.length / 3) ? a - this.vertices.length / 3 : a;
				b = b >= (this.vertices.length / 3) ? b - this.vertices.length / 3 : b;
				c = c >= (this.vertices.length / 3) ? c - this.vertices.length / 3 : c;
				d = d >= (this.vertices.length / 3) ? d - this.vertices.length / 3 : d;

				this.indices.push(a, b, c);
				this.indices.push(a, c, b);
				
				this.indices.push(b, c, d);
				this.indices.push(b, d, c);

			}
		}

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}