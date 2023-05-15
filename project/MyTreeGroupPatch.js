import {CGFobject,  CGFappearance} from '../lib/CGF.js';
import { MyBillboard } from './MyBillboard.js';

export class MyTreeGroupPatch extends CGFobject {
  constructor(scene) {
    super(scene);
    
    this.positions = [[-4, 4.9, 3 - 7], [-1, 4.9, 3 - 7], [2, 4.9, 3 - 7], [-4, 4.9, 0 - 7], [-1, 4.9, 0 - 7], [2, 4.9, 0 - 7], [-4, 4.9, -3 - 7], [-1, 4.9, -3 - 7], [2,4.9, -3 - 7]];

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