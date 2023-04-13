import {CGFobject,  CGFappearance} from '../lib/CGF.js';

export class MyPanorama extends CGFobject {
  constructor(scene, slices, stacks, radius, texture) {
    super(scene);
    this.longitude = slices;
    this.latitude = stacks * 2;
    this.radius = radius;
    this.texture = texture;

    this.initBuffers();

    //this.initTextures(scene);
  }
  initBuffers() {

    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var alpha = 0;
    var theta = 0;
    var alphaInc = Math.PI / this.latitude;
    var thetaInc = (2 * Math.PI) / this.longitude;
    var latVertexes = this.longitude + 1;

    var textLong = 0;
    var textLat = 0;
    var textLongInv = 1 / this.longitude;
    var textLatInv= 1 / this.latitude;

    var camPosX = this.scene.camera.position[0];
    var camPosY = this.scene.camera.position[1];
    var camPosZ = this.scene.camera.position[2];

    for (let i = 0; i <= this.latitude; i++) {
      var sinAlpha = Math.sin(alpha);
      var cosAlpha = Math.cos(alpha);

      theta = 0;
      textLong = 0;

      for (let j = 0; j <= this.longitude; j++) {

        var x = this.radius * Math.cos(theta) * sinAlpha;
        var y = this.radius * cosAlpha;
        var z = this.radius * Math.sin(-theta) * sinAlpha;

        x += camPosX;
        y += camPosY;
        z += camPosZ;

        this.vertices.push(x, y, z);
        
        this.texCoords.push(textLong, textLat);

        if (i < this.latitude && j < this.longitude) {

          var current = i * latVertexes + j;
          var next = current + latVertexes;
          
          this.indices.push(current, current + 1, next);
          this.indices.push(next, current + 1, next + 1);
        }

        this.normals.push(-x, -y, -z);
        theta += thetaInc;

        textLong += textLongInv;
      }
      alpha += alphaInc;
      textLat += textLatInv;
    }


    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }

  /*initTextures(scene) {
    this.tex = new CGFappearance(scene);
    this.tex.setAmbient(0.1, 0.1, 0.1, 1);
    this.tex.setDiffuse(0.9, 0.9, 0.9, 1);
    this.tex.setSpecular(0.1, 0.1, 0.1, 1);
    this.tex.setShininess(10.0);
    this.tex.loadTexture("images/panorama4.jpg");
    this.tex.setTextureWrap('REPEAT', 'REPEAT');
  }*/


  updateSlices(complexity){
    this.longitude=complexity;

    this.initBuffers();
    this.initNormalVizBuffers();
  }
  updateStacks(complexity){
    this.latitude=complexity*2;

    this.initBuffers();
    this.initNormalVizBuffers();
    }
    updateTextCoords(coords) {
      this.textCoords = [...coords];
      this.updateTexCoordsGLBuffers
    }

  /*display() {
    this.scene.pushMatrix();
    this.tex.apply();
    
    this.scene.popMatrix();
  }*/

  }
  