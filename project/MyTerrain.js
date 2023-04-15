import {CGFobject, CGFshader, CGFtexture} from '../lib/CGF.js'
import { MyPlane } from './MyPlane.js'

export class MyTerrain extends CGFobject {
    constructor(scene, size) {
        super(scene)

        this.plane = new MyPlane(this.scene, size);

        this.initTextures()

        this.initShaders();
    }

    initTextures() {
        this.texture = new CGFtexture(this.scene, "images/terrain.jpg");
        this.heightMap = new CGFtexture(this.scene, "images/heightmap.jpg");
    }

    initShaders() {
        this.shader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        this.shader.setUniformsValues({uSampler1: 1, uSampler2: 2});
    }

    display() {
        this.scene.setActiveShader(this.shader);
        this.scene.pushMatrix();
        this.texture.bind(1);
        this.heightMap.bind(2);
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2.0, 1, 0, 0);
        this.scene.scale(50, 50, 8);
        this.plane.display();
        this.scene.popMatrix();
    }
}