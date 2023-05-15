import {CGFobject} from '../lib/CGF.js';
import { MyBillboard } from './MyBillboard.js';

export class MyTreeRowPatch extends CGFobject {
  constructor(scene) {
    super(scene);
    
    this.positions = [[-5 -11, 4.9, 5], [-5 -9, 4.9, 4.5], [-5 -7, 4.9, 5.5], [-5 -5, 4.9, 4.7], [-5 -3, 4.9, 5.3], [-5 -1, 4.9, 4.8]];

    this.trees = [];
    for (let i = 0; i < 6; i++) {
        let billboard = new MyBillboard(this.scene, this.positions[i][0], this.positions[i][1], this.positions[i][2]);
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

        this.trees.forEach(billboard => {
            billboard.display()
        });

    }

  }