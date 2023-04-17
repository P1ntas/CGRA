import {CGFobject,  CGFappearance} from '../lib/CGF.js';
import { MySphere } from './MySphere.js';

export class MyPanorama extends CGFobject {
  constructor(scene, texture) {
    super(scene);
    this.texture = texture;
    this.sphere = new MySphere(scene, 32, 16, 200);

    this.initTextures(scene);
  }
  initTextures(scene) {
    this.tex = new CGFappearance(scene);
    this.tex.setAmbient(0.1, 0.1, 0.1, 1);
    this.tex.setDiffuse(0.9, 0.9, 0.9, 1);
    this.tex.setSpecular(0.1, 0.1, 0.1, 1);
    this.tex.setShininess(10.0);
    this.tex.setTexture(this.texture);
    this.tex.setTextureWrap('REPEAT', 'REPEAT');
  }


    display() {
      this.scene.pushMatrix()


      this.tex.apply()
      this.sphere.display()

      this.scene.popMatrix();

      this.scene.pushMatrix();
      const distance = vec3.distance(this.scene.camera.position, this.center);

      // Scale the sphere based on the distance to the camera
      const scale = distance / this.radius;
      this.scene.pushMatrix();
      this.scene.scale(scale, scale, scale);

      // Translate the sphere to be centered on the camera position
      const cameraPosition = this.scene.camera.position;
      this.scene.translate(
      cameraPosition[0] - this.center[0],
      cameraPosition[1] - this.center[1],
      cameraPosition[2] - this.center[2]
    );

    super.display();

    this.scene.popMatrix();
  }

  }
  