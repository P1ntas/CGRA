import {CGFobject,  CGFappearance, CGFtexture} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

export class MyBillboard extends CGFobject {
  constructor(scene) {
    super(scene);

    this.quad = new MyQuad(scene);


    this.initTextures(scene);
  }
  initTextures(scene) {
    this.texture = new CGFtexture(this, "images/nest.jpg")
    this.tex = new CGFappearance(scene);
    this.tex.setAmbient(1.0, 1.0, 1.0, 1);
    this.tex.setDiffuse(0.9, 0.9, 0.9, 1);
    this.tex.setSpecular(1, 1, 1, 1);
    this.tex.setShininess(10.0);
    this.tex.setTexture(this.texture);
    this.tex.setTextureWrap('REPEAT', 'REPEAT');
  }

  updateTexCoords() {
    this.quad.updateTexCoords(this.texCoords);
    }


    display() {
      this.scene.pushMatrix()


      //this.tex.apply()
      this.quad.display();

      this.scene.popMatrix();
  }

  }