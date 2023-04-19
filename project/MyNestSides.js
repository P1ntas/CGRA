import {CGFobject} from '../lib/CGF.js';

export class MyNestSides extends CGFobject {
  constructor(scene, slices, stacks, radius, mode) {
    super(scene);
    this.slices = slices;
    this.stacks = stacks * 2;
    this.radius = radius;
    this.mode = mode;

    this.initBuffers();
  }
  initBuffers() {

    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var alpha = Math.PI / 2;
    var theta = 0;
    var alphaInc = Math.PI / (this.stacks * 2);
    var thetaInc = (2 * Math.PI) / this.slices;
    var latVertexes = this.slices + 1;

    var textLong = 0;
    var textLat = 0;
    var textLongInv = 1 / this.slices;
    var textLatInv= 1 / this.stacks;

    for (let i = 0; i <= this.stacks; i++) {
      var sinAlpha = Math.sin(alpha);
      var cosAlpha = Math.cos(alpha);

      theta = 0;
      textLong = 0;

      for (let j = 0; j <= this.slices; j++) {

        var x = this.radius * Math.cos(theta) * sinAlpha;
        var y = this.radius * cosAlpha;
        var z = this.radius * Math.sin(-theta) * sinAlpha;

        if (i < this.stacks / 2) {
            y *= 0.8; // Scale the top hemisphere more in the y direction
          } else {
            y *= 0.75; // Scale the bottom hemisphere less in the y direction
          }

        this.vertices.push(x, y, z);
        
        this.texCoords.push(textLong, textLat);

        if (i < this.stacks && j < this.slices) {

          var current = i * latVertexes + j;
          var next = current + latVertexes;

            if (this.mode == "outside") {
                this.indices.push(current + 1, current, next);
                this.indices.push(current + 1, next, next + 1);
            }
            else if (this.mode == "inside") {
                this.indices.push(current, current + 1, next);
                this.indices.push(next, current + 1, next + 1);

            }
        }

        if (this.mode == "outside") this.normals.push(x, y, z);
        else if (this.mode == "inside") this.normals.push(-x, -y, -z);
        
        theta += thetaInc;

        textLong += textLongInv;
      }
      alpha += alphaInc;
      textLat += textLatInv;
    }


    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
  updateSlices(complexity){
    this.slices=complexity;

    this.initBuffers();
    this.initNormalVizBuffers();
  }
  updateStacks(complexity){
    this.stacks=complexity*2;

    this.initBuffers();
    this.initNormalVizBuffers();
    }
    updateTextCoords(coords) {
      this.textCoords = [...coords];
      this.updateTexCoordsGLBuffers
    }
  }
  