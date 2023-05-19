  import {CGFobject,  CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
  import { MyQuad } from './MyQuad.js';

  export class MyBillboard extends CGFobject {
    constructor(scene, x, y, z) {
      super(scene);

      this.x = x;
      this.y = y;
      this.z = z;

      this.quad = new MyQuad(scene);


      this.initTextures(scene);

      this.initShaders();
    }
    initTextures(scene) {
      this.texture = new CGFtexture(this.scene, "images/billboardtree.png")
      this.tex = new CGFappearance(scene);
      this.tex.setAmbient(1.0, 1.0, 1.0, 1);
      this.tex.setDiffuse(0.9, 0.9, 0.9, 1);
      this.tex.setSpecular(1, 1, 1, 1);
      this.tex.setShininess(10.0);
      this.tex.setTexture(this.texture);
      this.tex.setTextureWrap('REPEAT', 'REPEAT');
      this.heightMap = new CGFtexture(this.scene, "images/heightmap.jpg");
    }

    initShaders() {

      this.shader = new CGFshader(this.scene.gl, "shaders/billboard.vert", "shaders/billboard.frag");
      this.shader.setUniformsValues({uSampler1: 1, treePosition: [this.x, this.z]});
    }

    updateTexCoords() {
      this.quad.updateTexCoords(this.texCoords);
      }


      display() {
        this.scene.setActiveShader(this.shader);
        this.scene.pushMatrix();
        this.texture.bind(0);
        this.heightMap.bind(1);
        let direction = [
          this.scene.camera.position[0] - this.scene.camera.target[0],
          0,
          this.scene.camera.position[2] - this.scene.camera.target[2]
      ];

      console.log(this.scene.camera.direction);
      console.log(direction);
      // Normalize the direction
      let length = Math.sqrt(direction[0]*direction[0] + direction[2]*direction[2]);
      direction[0] /= length;
      direction[2] /= length;
  
      // Calculate the rotation angle
      let angle = Math.acos(direction[2]); // Assuming the quad's normal is along the positive z-axis
      if (direction[0] < 0) angle = -angle;
      // Rotate the quad to face the camera
      this.scene.translate(this.x * 8, this.z * 8, this.y * 8);
      this.scene.rotate(angle, 0, 1, 0);
        this.scene.scale(2 * 8, 2 * 8, 2 * 8);
        
        //this.tex.apply();
        this.quad.display();
      
        this.scene.popMatrix();
      }
      

    }