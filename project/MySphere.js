import {CGFobject} from '../lib/CGF.js';

export class MySphere extends CGFobject {

    constructor(scene, slices, stacks) {
      super(scene);
      this.lines = stacks * 2;
      this.columns = slices;
  
      this.initBuffers();
    }
  
    initBuffers() {
      this.vertices = [];
      this.indices = [];
      this.normals = [];
      this.textCoords = [];
  
      var alpha = 0;
      var theta = 0;
      var betha = Math.PI / this.lines;
      var delta = (2 * Math.PI) / this.columns;
      var horVertices = this.columns + 1;
  
      var textCol = 0;
      var textLine = 0;
      var text_col_div = 1 / this.columns;
      var text_line_div = 1 / this.lines;
  
      for (let latitude = 0; latitude <= this.lines; latitude++) {
        var sinAlpha = Math.sin(alpha);
        var cosAlpha = Math.cos(alpha);
  
        theta = 0;
        textCol = 0;
  
        for (let longitude = 0; longitude <= this.columns; longitude++) {
          var x = Math.cos(theta) * sinAlpha;
          var y = cosAlpha;
          var z = Math.sin(-theta) * sinAlpha;
          this.vertices.push(x, y, z);
          
          this.textCoords.push(textCol, textLine);
  
  
          if (latitude < this.lines && longitude < this.columns) {
            var current = latitude * horVertices + longitude;
            var next = current + horVertices;
            
            this.indices.push(next, current, current + 1);
            this.indices.push(next + 1, next, current + 1);
          }
  
   
          this.normals.push(-x, -y, -z);

          theta += delta;
          textCol += text_col_div;
        }
        alpha += betha;
        textLine += text_line_div;
      }
  
  
      this.primitiveType = this.scene.gl.TRIANGLES;
      this.initGLBuffers();
    }
    updateSlices(complexity){
      this.columns = complexity;
  
      this.initBuffers();
      this.initNormalVizBuffers();
    }
    updateStacks(complexity){
      this.lines=complexity*2;
      this.initBuffers();
      this.initNormalVizBuffers();
    }
  }