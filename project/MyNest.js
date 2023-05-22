import {CGFobject,  CGFappearance, CGFtexture} from '../lib/CGF.js';
import { MyNestSides } from './MyNestSides.js';

export class MyNest extends CGFobject {
  constructor(scene, slices, stacks, radius) {
    super(scene);

    this.outside = new MyNestSides(scene, slices, stacks, radius, "outside");
    this.inside = new MyNestSides(scene, slices, stacks, radius, "inside");

    this.eggs = [];
    this.eggsPositions = [[1,1],[-1,1],[1,-1],[-1,-1]]

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
  addEgg(egg) {
    this.eggs.push(egg);
  }

  display() {
    this.scene.pushMatrix()


    this.tex.apply()
    this.outside.display();
    this.inside.display();

    this.scene.popMatrix();
    
    for(var i = 0; i < this.eggs.length; i++) {
      this.scene.pushMatrix();
      this.scene.texture5.bind(0);
      this.scene.translate(this.eggsPositions[i][0],0,this.eggsPositions[i][1]);
      this.scene.scale(0.8, 0.8 , 0.8 );
      this.eggs[i].display();
      this.scene.popMatrix();
    }
  }

  }
  