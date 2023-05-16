import { CGFobject, CGFscene } from '../lib/CGF.js';
import { MySphere} from './MySphere.js';
import { MyCone } from './MyCone.js';
import { MyWing } from './MyWing.js'
import { MyTriangleBig } from './MyTriangleBig.js';
/**
 * MyTangram
 * @constructor
 */
export class MyBird extends CGFobject {
  constructor(scene) {
		super(scene);

    //---------------
    //Initialize scene objects
    
    
    this.BirdBody = new MySphere(this.scene,24,10,5,"sphere");
    this.BirdHead = new MySphere(this.scene,24,10,2,"sphere");
    this.BirdBeack = new MyCone(this.scene,24,24);

    this.BirdLeftTail = new MyTriangleBig(this.scene);
    this.BirdRightTail = new MyTriangleBig(this.scene);
    this.BirdLeftWing = new MyWing(this.scene,false);
    this.BirdRightWing = new MyWing(this.scene,true);
  
    //Objects connected to MyInterface
    
    this.displayBody = true;
    this.displayHead = true;
    this.displayBeack = true;
    this.displayLeftTail = true;
    this.displayRightTail = true;
    this.displayRightWing = true;
    this.displayLeftWing = true;


    this.time = 0;
    this.velocity = 0.02;
   
    this.wingAngle = 0;
   
    this.bodyPosition = 0;
    this.beackPosition = 0;
    this.tailPosition = 0;
    this.wingsPosition = 0;

  }

  wingsMotion() {
    
    this.wingAngle = Math.PI * Math.sin(this.time)/4;

    this.BirdRightWing.update(this.velocity);
    this.BirdLeftWing.update(this.velocity);

    this.wingsPosition = Math.sin(this.time)/2;
  }
  bodyMotion(){
   
   this.bodyPosition = Math.sin(this.time);
  }
  beackMotion(){
    this.beackPosition = Math.sin(this.time) * 2;
  }
  tailMotion(){
    this.tailPosition = Math.sin(this.time)*2;
  }
  update(){
    this.time +=this.velocity;
    this.bodyMotion();
    this.beackMotion();
    this.tailMotion();
    this.wingsMotion();
  }


  display() {
    
    
    if(this.displayBody){
        this.scene.pushMatrix();
        this.scene.scale(0.4,0.5,1.1);
        this.scene.translate(0,this.bodyPosition,0);
        this.BirdBody.display();
        this.scene.popMatrix();
    }
    if(this.displayHead){
        this.scene.pushMatrix();
        this.scene.scale(0.4,0.4,0.5);
        this.scene.translate(0,0,2);
        this.scene.translate(0,this.bodyPosition,0);
        this.BirdHead.display();
        this.scene.popMatrix();
    }
    if(this.displayBeack){
        this.scene.pushMatrix();
        this.scene.scale(0.2,0.2,0.6);
        this.scene.rotate(Math.PI,0,1,1);
        this.scene.translate(0,2,-0.5);
        this.scene.translate(0,0,this.beackPosition);
        this.BirdBeack.display();
        this.scene.popMatrix();
    }

    if(this.displayLeftTail){

        this.scene.pushMatrix();
        this.scene.translate(0.42,0,-1.2);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.rotate(Math.PI/4,0,0,1);
        
        this.scene.scale(0.3,0.3,0.3);
        this.scene.translate(0,0,this.tailPosition);
        this.BirdLeftTail.display();
        this.scene.popMatrix();
    }
    if(this.displayRightTail){

        this.scene.pushMatrix();
        this.scene.translate(-0.42,0,-1.2);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.rotate(-Math.PI/4,0,0,1);
        
        this.scene.scale(0.3,0.3,0.3);
        this.scene.translate(0,0,this.tailPosition);
        this.BirdLeftTail.display();
        this.scene.popMatrix();
    }

    if(this.displayRightWing) {
      this.scene.pushMatrix();
      this.scene.translate(-0.2,this.wingsPosition,0);
      this.scene.rotate(this.wingAngle,0,0,1);
      this.BirdRightWing.display();
      this.scene.popMatrix();
    }
    if(this.displayLeftWing) {
      this.scene.pushMatrix();
      this.scene.translate(0.2,this.wingsPosition,0);
      this.scene.rotate(Math.PI,0,0,1);
      this.scene.rotate(-this.wingAngle,0,0,1);
      this.BirdLeftWing.display();
      this.scene.popMatrix();
    }

  }
  enableNormalViz() {
    this.BirdRightWing.enableNormalViz();
  
  }
}
