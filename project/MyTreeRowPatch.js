import {CGFobject, CGFtexture, CGFshader} from '../lib/CGF.js';
import { MyBillboard } from './MyBillboard.js';

export class MyTreeRowPatch extends CGFobject {
  constructor(scene) {
    super(scene);
    
    this.positions = [[-5 -9, 3.9, 4.5], [-5 -7, 4.1, 3], [-5 -5, 4.15, 1.7], [-5 -3, 4, -0.5], [-5 -1, 4, -3.7], [-4, 3.9, -5]];

    this.trees = [];
    for (let i = 0; i < 6; i++) {
        let billboard = new MyBillboard(this.scene, this.positions[i][0], this.positions[i][2], this.positions[i][1]);
        this.trees.push(billboard);
    }
    //this.initTextures();

    //this.initShaders();
    }

  enableNormalViz() {
    this.trees.forEach(billboard => {
        billboard.enableNormalViz()
    });

}

disableNormalViz() {
    this.trees.forEach(billboard => {
        billboard.disableNormalViz()
    });
}


    display() {
        //this.scene.setActiveShader(this.trees[0].shader);
        this.trees.forEach(billboard => {
            billboard.display()
        });
        //this.scene.setActiveShader(this.scene.defaultShader);
    }

  }