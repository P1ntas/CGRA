import { CGFobject, CGFscene } from '../lib/CGF.js';
import { MyDiamond } from "../tp2/MyDiamond.js";
import { MyParallelogram } from "../tp2/MyParallelogram.js";
import { MyTriangle } from "../tp2/MyTriangle.js";
import { MyTriangleSmall } from "../tp2/MyTriangleSmall.js";
import { MyTriangleBig } from "../tp2/MyTriangleBig.js";

/**
 * MyTangram
 * @constructor
 */
export class MyTangram extends CGFobject {
  constructor(scene) {
		super(scene);

    //---------------
    //Initialize scene objects
    
    this.diamond = new MyDiamond(this.scene);
    this.triangle1 = new MyTriangle(this.scene);
    this.triangle2 = new MyTriangle(this.scene);
    this.triangle3 = new MyTriangleBig(this.scene);
    this.parallelogram = new MyParallelogram(this.scene);
    this.triangle4 = new MyTriangleSmall(this.scene);
    this.triangle5 = new MyTriangleSmall(this.scene);
    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displayDiamond = true;
    this.displayTriangle1 = true;//big
    this.displayTriangle2 = true;//big

    this.displayTriangle3 = true;//bigger

    this.displayTriangle4 = true;//smallone
    this.displayTriangle5 =true;
    this.displayParallelogram = true;
  }
  display() {
    
    var MatrixRotate =  [  0.707, 0.707, 0, 0,
                           -0.707, 0.707, 0, 0,
                           0, 0, 1, 0,
                           0, 0, 0, 1];

    //Diamond
    this.scene.pushMatrix();
    //this.scene.rotate(Math.PI/4,0,0,1);
    this.scene.multMatrix(MatrixRotate);
    if(this.displayDiamond) this.diamond.display();
    this.scene.popMatrix();
    


      
   
    //Big triangle orange right
    this.scene.pushMatrix();
    this.scene.translate(2.1,-0.9,0);
    if(this.displayTriangle1) this.triangle1.display();
    this.scene.popMatrix();


    //Big triangle blue left
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI,0,1,0);
    this.scene.translate(2.1,-0.9,0);
    if(this.displayTriangle2) this.triangle2.display();
    this.scene.popMatrix();

    //Triangle middle light pink
    this.scene.pushMatrix();
    this.scene.translate(-0.71,2.107,0);
    this.scene.rotate(Math.PI,0,0,1);
    this.scene.scale(0.705,0.716,1);
    
    if(this.displayTriangle3) this.triangle3.display();
    this.scene.popMatrix();
    


    //Parallelogram
    this.scene.pushMatrix();
    this.scene.translate(-0.7,0.7,0);

    this.scene.rotate(Math.PI,0,1,0);
    this.scene.rotate(3*Math.PI/4,0,0,1);
    
    
    if(this.displayParallelogram) this.parallelogram.display();
    this.scene.popMatrix();


    //Smnall triangle left
    this.scene.pushMatrix();
    this.scene.translate(-2.1,1.1,0);
    this.scene.rotate(-Math.PI/2,0,0,1);
    if(this.displayTriangle4) this.triangle4.display();
    this.scene.popMatrix();


    //Small triangle right
    this.scene.pushMatrix();
    this.scene.translate(2.1,1.1,0);
    this.scene.rotate(Math.PI/2,0,0,1);
    if(this.displayTriangle5) this.triangle5.display();
    this.scene.popMatrix();

    
    
  }
}