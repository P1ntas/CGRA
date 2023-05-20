import {CGFobject,  CGFtexture, CGFshader} from '../lib/CGF.js';
import { MyBillboard } from './MyBillboard.js';

export class MyTreeGroupPatch extends CGFobject {
  constructor(scene) {
    super(scene);
    
    this.positions = [[-4 , 4.2 + 0.6, 3 - 12], [-2, 3.8 + 0.6, 3 - 12], [0, 3.3 + 0.6, 3 - 12], [-4, 4.5 + 0.6, 1 - 12], [-2, 3.8 + 0.6, 1 - 12], [0, 3.5 + 0.6, 1 - 12], [-4, 4.3 + 0.6, -1 - 12], [-2, 3.5 + 0.6, -1 - 12], [0, 3.5 + 0.6, -1 - 12]];

    this.trees = [];
    for (let i = 0; i < 9; i++) {
        let billboard = new MyBillboard(this.scene, this.positions[i][0], this.positions[i][2], this.positions[i][1]);
        this.trees.push(billboard);
    }
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
        this.scene.pushMatrix()
        this.trees.forEach(billboard => {
            billboard.display()
        });
        this.scene.popMatrix();
    }

  }