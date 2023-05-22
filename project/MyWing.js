import { CGFobject, CGFscene } from '../lib/CGF.js';
import { MySphere} from './MySphere.js';
import { MyCone } from './MyCone.js';
import { MyTriangleBig } from './MyTriangleBig.js';
import { MyTriangleOW } from './MyTriangleOW.js';
/**
 * MyWing
 * @constructor
 */
export class MyWing extends CGFobject {
  constructor(scene,right) {
		super(scene);

    this.innerWing = new MyTriangleOW(this.scene);
    this.outterWing = new MyTriangleOW(this.scene);

    this.displayInnerWing = true;
    this.displayOutterWing = true;

    this.right = right;

    this.time = 0;
    
   
    this.wingAngle = 0;
    this.wingsPosition = 0;

  }

  wingsMotion() {
    this.wingAngle = Math.PI * Math.sin(this.time)/4;

  }

  update(value){
    this.time =value;
    this.wingsMotion();
  }


  display() {


    if(this.displayInnerWing){

      this.scene.pushMatrix();
      this.scene.translate(0,0,0.6);
      this.scene.rotate(-Math.PI/2,1,0,0);
      this.scene.rotate(Math.PI,0,1,0);
      this.scene.scale(0.7,0.7,0.7);
      
      this.innerWing.display();
      this.scene.popMatrix();

    }

    if(this.displayOutterWing){

      this.scene.pushMatrix();
      this.scene.translate(-1.4,0,0.6);
      this.scene.rotate(-Math.PI/2,1,0,0);
      this.scene.rotate(Math.PI/4,0,0,1);
      if (this.right)
        this.scene.rotate(-this.wingAngle,1,0,0);
      else 
        this.scene.rotate(this.wingAngle,1,0,0);

      
      
      
      this.scene.scale(0.7,1,1);
      
      this.outterWing.display();
      this.scene.popMatrix();

    }

    
  }
  enableNormalViz() {
    this.outterWing.enableNormalViz();
    this.innerWing.enableNormalViz();
  
  }
}
