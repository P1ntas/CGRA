import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MySphere} from './MySphere.js';
import { MyCone } from './MyCone.js';
import { MyWing } from './MyWing.js'
import { MyTriangleOW } from './MyTriangleOW.js';
/**
 * MyTangram
 * @constructor
 */
export class MyBird extends CGFobject {
  constructor(scene,position,speed) {
		super(scene);

    //---------------
    //Initialize scene objects
    
    
    this.BirdBody = new MySphere(this.scene,24,10,5,"sphere");
    this.BirdHead = new MySphere(this.scene,24,10,2,"sphere");
    this.BirdBeack = new MyCone(this.scene,24,24);

    this.BirdLeftTail = new MyTriangleOW(this.scene);
    this.BirdRightTail = new MyTriangleOW(this.scene);
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
    this.velocity = speed;
   
    this.wingAngle = 0;
    this.tailAngle = 0;
    this.bodyPosition = 0;
    this.beackPosition = 0;
    this.tailPosition = 0;
    this.wingsPosition = 0;
    this.egg = null;
    this.goingDown = false;
    this.goingDownTime = 0;

    this.birdAngle = 0;
    
    this.birdPosition = position;
    this.initialPosition = position;

    this.initTextures(scene);
  }

  initTextures(scene) {
    this.beack = new CGFappearance(scene);
    this.beack.setAmbient(1, 1, 1, 1);
    this.beack.setDiffuse(0.9, 0.9, 0.9, 1);
    this.beack.setSpecular(1, 1, 1, 1);
    this.beack.setShininess(10.0);
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
    this.tailAngle = Math.PI * Math.sin(this.time)/6;
    this.tailPosition = Math.sin(this.time) ;
  }
  update(){
    this.time +=this.velocity;
    this.bodyMotion();
    this.beackMotion();
    this.tailMotion();
    this.wingsMotion();

    // update horizontal position
    this.birdPosition[0] += this.velocity * Math.sin(this.birdAngle);
    this.birdPosition[2] += this.velocity * Math.cos(this.birdAngle);
  
    // update vertical position
    if (this.goingDown) {
      this.goingDownTime += 0.1;
      this.birdPosition[1] = this.scene.birdHeight - Math.sin(this.goingDownTime) * 5;
      if (this.goingDownTime > Math.PI) {
        this.goingDown = false;
        this.birdPosition[1] = this.scene.birdHeight;
      }
      var canCatch = this.goingDownTime > Math.PI/3 && this.goingDownTime < 2*Math.PI/3;
      if (!canCatch || this.hasAnEgg()) return;
      var tempEgg = this.scene.eggClose();
      if (tempEgg != null) 
        this.catchEgg(tempEgg);
    }
  }

  hasAnEgg(){
    return this.egg != null;
  }

  catchEgg(e){
    this.egg = e;
  }

  dropEgg() {
    var temp = this.egg;
    this.egg = null;
    return temp;
  }

  accelerate(){
    this.velocity += 0.03;
  }
  reset(){
    this.velocity = 0;
    this.position = this.initialPosition;
    this.birdAngle = 0;
  }
  brake(){
    if(this.velocity >= 0.01){
      this.velocity -= 0.01;
    }else{
      this.velocity = 0;
    }
  }
  turn(direction){
    if(direction == "left")
    {
      this.birdAngle += 0.1;
    }
    if(direction == "right")
    {
      this.birdAngle -= 0.1; 
    }
  }
  goDown() {
    if (this.goingDown) return;
    this.goingDown = true;
    this.goingDownTime = 0;
  }

  display() {
    this.scene.pushMatrix();
    this.scene.translate(this.birdPosition[0],this.birdPosition[1],this.birdPosition[2]);
    this.scene.scale(3,3,3);
    this.scene.rotate(this.birdAngle,0,1,0);
    
    
    if(this.displayBody){
        this.scene.pushMatrix();
        this.scene.scale(0.4,0.5,1.1);
        this.scene.translate(0,this.bodyPosition,0);
        this.beack.apply();
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
        this.beack.apply();
        this.BirdBeack.display();
        this.scene.popMatrix();
    }

    if(this.displayLeftTail){

        this.scene.pushMatrix();
        this.scene.translate(0,0,-1.4);
        this.scene.rotate(Math.PI/2,1,0,0);
        
        this.scene.scale(0.3,0.3,0.3);
        this.scene.translate(0,0,-this.tailPosition);
        this.scene.rotate(this.tailAngle,-1,0,0);
        this.BirdLeftTail.display();
        this.scene.popMatrix();
    }
    if(this.displayRightTail){

      this.scene.pushMatrix();
      this.scene.translate(0,0,-1.4);
      this.scene.rotate(Math.PI/2,1,0,0);
      this.scene.rotate(Math.PI,0,1,0);
      
      this.scene.scale(0.3,0.3,0.3);
      this.scene.translate(0,0,this.tailPosition);
      this.scene.rotate(-this.tailAngle,-1,0,0);
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
    if (this.egg != null) {
      this.scene.pushMatrix();
      this.scene.translate(0,this.bodyPosition/2-0.5,-1);
      this.scene.texture5.bind(0);
      this.scene.scale(1/3, 1/3, 1/3);
      this.scene.scale(0.8, 0.8 , 0.8 );
      this.scene.rotate(Math.PI/2,1,0,0);
      this.egg.display();
      this.scene.popMatrix();
    }
    this.scene.popMatrix();
  }
  enableNormalViz() {
    this.BirdRightWing.enableNormalViz();
  
  }
}
