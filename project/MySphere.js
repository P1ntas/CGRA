import {CGFobject} from '../lib/CGF.js';

export class MySphere extends CGFobject {
  constructor(scene, slices, stacks) {
    super(scene);
    this.longDivs = slices;
    this.latDivs = stacks * 2;

    this.initBuffers();
  }
  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var alpha = 0;
    var theta = 0;
    var alphaInc = Math.PI / this.latDivs;
    var thetaInc = (2 * Math.PI) / this.longDivs;
    var latVertices = this.longDivs + 1;

    var textmaplongitude = 0;
    var textmaplatitude = 0;
    var textmaplongpart = 1 / this.longDivs;
    var textmaplatpart= 1 / this.latDivs;

    for (let i = 0; i <= this.latDivs; i++) {
      var sinAlpha = Math.sin(alpha);
      var cosAlpha = Math.cos(alpha);

      theta = 0;
      textmaplongitude = 0;

      for (let j = 0; j <= this.longDivs; j++) {
        var x = Math.cos(theta) * sinAlpha;
        var y = cosAlpha;
        var z = Math.sin(-theta) * sinAlpha;
        this.vertices.push(x, y, z);
        
        this.texCoords.push(textmaplongitude, textmaplatitude);

        if (i < this.latDivs && j < this.longDivs) {
          var current = i * latVertices + j;
          var next = current + latVertices;
          
          this.indices.push(current + 1, current, next);
          this.indices.push(current + 1, next, next + 1);
        }

        this.normals.push(x, y, z);
        theta += thetaInc;

        textmaplongitude += textmaplongpart;
      }
      alpha += alphaInc;
      textmaplatitude += textmaplatpart;
    }


    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
  updateSlices(complexity){
    this.longDivs=complexity;

    this.initBuffers();
    this.initNormalVizBuffers();
  }
  updateStacks(complexity){
    this.latDivs=complexity*2;

    this.initBuffers();
    this.initNormalVizBuffers();
    }
    updateTextCoords(coords) {
      this.textCoords = [...coords];
      this.updateTexCoordsGLBuffers
    }
  }