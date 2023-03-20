import { CGFobject, CGFscene, CGFappearance } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

/**
 * MyUnitCubeQuad
 * @constructor
 */
export class MyUnitCubeQuad extends CGFobject {
  constructor(scene, top = undefined,
    front = undefined,
    right = undefined,
    back = undefined,
    left = undefined,
    bottom = undefined) {
		super(scene);

    this.topTexture = top
    this.sideTexture = right
    this.bottomTexture = bottom
    
    //Initialize scene objects
    this.quad = new MyQuad(this.scene);

    this.scaleFactor = 1;

    this.initTextures(scene);
  }

  initTextures(scene) {

    this.topTexture = new CGFappearance(scene);
    this.topTexture.setAmbient(0.1, 0.1, 0.1, 1);
    this.topTexture.setDiffuse(0.9, 0.9, 0.9, 1);
    this.topTexture.setSpecular(0.1, 0.1, 0.1, 1);
    this.topTexture.setShininess(10.0);
    this.topTexture.loadTexture('images/mineTop.png');
    this.topTexture.setTextureWrap('REPEAT', 'REPEAT');

    this.sideTexture = new CGFappearance(scene);
    this.sideTexture.setAmbient(0.1, 0.1, 0.1, 1);
    this.sideTexture.setDiffuse(0.9, 0.9, 0.9, 1);
    this.sideTexture.setSpecular(0.1, 0.1, 0.1, 1);
    this.sideTexture.setShininess(10.0);
    this.sideTexture.loadTexture('images/mineSide.png');
    this.sideTexture.setTextureWrap('REPEAT', 'REPEAT');

    this.bottomTexture = new CGFappearance(scene);
    this.bottomTexture.setAmbient(0.1, 0.1, 0.1, 1);
    this.bottomTexture.setDiffuse(0.9, 0.9, 0.9, 1);
    this.bottomTexture.setSpecular(0.1, 0.1, 0.1, 1);
    this.bottomTexture.setShininess(10.0);
    this.bottomTexture.loadTexture('images/mineBottom.png');
    this.bottomTexture.setTextureWrap('REPEAT', 'REPEAT');
  }

  display() {
    
    this.topTexture.apply()
    if(this.scene.nearestFilter)
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
    else
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
    
    this.scene.pushMatrix();
    this.scene.translate(0, 0.5, 0);
    this.scene.rotate(-Math.PI/2, 1, 0, 0);
    

    this.quad.display();
    this.scene.popMatrix();
    
    this.scene.pushMatrix();
    this.scene.translate(0, 0, -0.5);
    this.scene.rotate(Math.PI, 0, 1, 0);

    this.sideTexture.apply();
    if(this.scene.nearestFilter)
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
    else
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);


    this.quad.display();
    this.scene.popMatrix();




    this.scene.pushMatrix();
    this.scene.translate(-0.5, 0, 0);
    this.scene.rotate(-Math.PI/2, 0, 1, 0);

    this.quad.display();
    this.scene.popMatrix();


    this.scene.pushMatrix();
    this.scene.translate(0, -0.5, 0);
    this.scene.rotate(Math.PI/2, 1, 0, 0);

    this.bottomTexture.apply();
    if(this.scene.nearestFilter)
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
    else
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);

    this.quad.display();
    this.scene.popMatrix();

    this.sideTexture.apply();
    if(this.scene.nearestFilter)
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
    else
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);

    this.scene.pushMatrix();
    this.scene.translate(0.5, 0, 0);
    this.scene.rotate(Math.PI/2, 0, 1, 0);
    

    this.quad.display();
    this.scene.popMatrix();
    

    this.scene.pushMatrix();
    this.scene.translate(0, 0, 0.5);

    

    this.quad.display();
    this.scene.popMatrix();

  }
}