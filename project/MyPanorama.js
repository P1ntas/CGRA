import {CGFobject,  CGFappearance} from '../lib/CGF.js';
import { MySphere } from './MySphere.js';

export class MyPanorama extends CGFobject {
  constructor(scene, texture) {
    super(scene);
    this.texture = texture;
    this.sphere = new MySphere(scene, 32, 16, 200, "panorama");

    this.initTextures(scene);
  }
  initTextures(scene) {
    this.tex = new CGFappearance(scene);
    this.tex.setAmbient(0.1, 0.1, 0.1, 1);
    this.tex.setDiffuse(0.9, 0.9, 0.9, 1);
    this.tex.setSpecular(1, 1, 1, 1);
    this.tex.setShininess(10.0);
    this.tex.setTexture(this.texture);
    this.tex.setTextureWrap('REPEAT', 'REPEAT');
  }


    display() {
      this.scene.pushMatrix()


      this.tex.apply()
      this.sphere.display()

      this.scene.popMatrix();
  }

  }
  