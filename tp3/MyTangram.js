import { CGFobject, CGFscene, CGFappearance } from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";

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
    this.displayTriangle1 = true//big
    this.displayTriangle2 = true;//big

    this.displayTriangle3 = true;//bigger

    this.displayTriangle4 = true//smallone
    this.displayTriangle5 =true;
    this.displayParallelogram = true;
    this.initMaterials(scene);
  }

  initMaterials(scene) {

    // light green
    
    this.square = new CGFappearance(scene);
    this.square.setAmbient(144 / 255, 238 / 255, 144 / 255, 1.0);
    this.square.setDiffuse(144 / 255, 238 / 255, 144 / 255, 1.0);
    this.square.setSpecular(0.9, 0.9, 0.9, 1.0);
    this.square.setShininess(10.0);

    // orange
    this.rightTriangle = new CGFappearance(scene);
    this.rightTriangle.setAmbient(1, 165 / 255, 0, 1.0);
    this.rightTriangle.setDiffuse(1, 165 / 255, 0, 1.0);
    this.rightTriangle.setSpecular(0.9, 0.9, 0.9, 1.0);
    this.rightTriangle.setShininess(10.0);

    // light blue
    this.leftTriangle = new CGFappearance(scene);
    this.leftTriangle.setAmbient(0 / 255, 204 / 255, 255 / 255, 1.0);
    this.leftTriangle.setDiffuse(0 / 255, 204 / 255, 255 / 255, 1.0);
    this.leftTriangle.setSpecular(1.0, 0.9, 1.0, 1.0);
    this.leftTriangle.setShininess(10.0);

    // pink
    this.invTriangle = new CGFappearance(scene);
    this.invTriangle.setAmbient(1, 182 / 255, 193 / 255, 1.0);
    this.invTriangle.setDiffuse(1, 182 / 255, 193 / 255, 1.0);
    this.invTriangle.setSpecular(0.9, 0.9, 0.9, 1.0);
    this.invTriangle.setShininess(10.0);

    // yellow
    this.paral = new CGFappearance(scene);
    this.paral.setAmbient(1, 1, 0, 1.0);
    this.paral.setDiffuse(1, 1, 0, 1.0);
    this.paral.setSpecular(0.9, 0.9, 0.9, 1.0);
    this.paral.setShininess(10.0);

    // red
    this.smalLeftTriangle = new CGFappearance(scene);
    this.smalLeftTriangle.setAmbient(255/255, 0, 0, 1.0);
    this.smalLeftTriangle.setDiffuse(255/255, 0, 0, 1.0);
    this.smalLeftTriangle.setSpecular(0.9, 0.9, 0.9, 1.0);
    this.smalLeftTriangle.setShininess(10.0);
    // purple
    this.smalRightTriangle = new CGFappearance(scene);
    this.smalRightTriangle.setAmbient(186 / 255, 85 / 255, 211 / 255, 1.0);
    this.smalRightTriangle.setDiffuse(186 / 255, 85 / 255, 211 / 255, 1.0);
    this.smalRightTriangle.setSpecular(0.9, 0.9, 0.9, 1.0);
    this.smalRightTriangle.setShininess(10.0);
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
    //this.square.apply();
    this.scene.customMaterial.apply();

    if(this.displayDiamond) this.diamond.display();
    this.scene.popMatrix();
    


      
   
    //Big triangle orange right
    this.scene.pushMatrix();
    this.scene.translate(2.1,-0.9,0);
    this.rightTriangle.apply();
    if(this.displayTriangle1) this.triangle1.display();
    this.scene.popMatrix();


    //Big triangle blue left
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI,0,1,0);
    this.scene.translate(2.1,-0.9,0);
    this.leftTriangle.apply();
    if(this.displayTriangle2) this.triangle2.display();
    this.scene.popMatrix();

    //Triangle middle light pink
    this.scene.pushMatrix();
    this.scene.translate(-0.70,2.107,0);
    this.scene.rotate(Math.PI,0,0,1);
    this.scene.scale(0.705,0.716,1);
    this.invTriangle.apply();
    if(this.displayTriangle3) this.triangle3.display();
    this.scene.popMatrix();
    


    //Parallelogram
    this.scene.pushMatrix();
    this.scene.translate(-0.7,0.7,0);

    this.scene.rotate(Math.PI,0,1,0);
    this.scene.rotate(3*Math.PI/4,0,0,1);
    this.paral.apply();
    
    if(this.displayParallelogram) this.parallelogram.display();
    this.scene.popMatrix();


    //Smnall triangle left
    this.scene.pushMatrix();
    this.scene.translate(-2.1,1.1,0);
    this.scene.rotate(-Math.PI/2,0,0,1);

    this.smalLeftTriangle.apply();
    if(this.displayTriangle4) this.triangle4.display();
    this.scene.popMatrix();


    //Small triangle right
    this.scene.pushMatrix();
    this.scene.translate(2.1,1.1,0);
    this.scene.rotate(Math.PI/2,0,0,1);
    this.smalRightTriangle.apply();
    if(this.displayTriangle5) this.triangle5.display();
    this.scene.popMatrix();

    

    
    
  }

  enableNormalViz(){

    this.diamond.enableNormalViz();
    this.triangle1.enableNormalViz();
    this.triangle2.enableNormalViz();
    this.triangle3.enableNormalViz();
    this.triangle4.enableNormalViz();
    this.triangle5.enableNormalViz();
    this.parallelogram.enableNormalViz();
    

  }

  disableNormalViz(){
    this.diamond.disableNormalViz();
    this.triangle1.disableNormalViz();
    this.triangle2.disableNormalViz();
    this.triangle3.disableNormalViz();
    this.triangle4.disableNormalViz();
    this.triangle5.disableNormalViz();
    this.parallelogram.disableNormalViz();

  }





}