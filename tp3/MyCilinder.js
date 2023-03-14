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
                this.vertices.push(x, y, z);

                var alpha = Math.cos(ang - (periode/ 2));
                var beta = Math.sin(ang - (periode/ 2));
                var gamma = 0;
                this.normals.push(alpha, beta, gamma);

                var zeta = Math.cos(ang + (periode/ 2));
                var e = Math.sin(ang + (periode/ 2));
                var f = 0;
                this.normals.push(zeta, e, f);
            }
        }
		var level = 2 * (this.stacks + 1);
		for (var i = 0; i < this.stacks; i++) {
			for (var j = 0; j < this.slices ; j++) {

				var a = 1 + i * 2 + level * j;
				var b = a + 2;
				var c = a + level - 1;
				var d = c + 2;

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