import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }
    initKeys(){
        this.scene.gui=this;
        this.processKeyboard =function(){};
        this.activeKeys={};
    };

    processKeyDown(event) {

        this.activeKeys[event.code]=true;
    };
    processKeyUp(event){
        this.activeKeys[event.code]=false;
    };

    isKeyPressed(keyCode){
        return this.activeKeys[keyCode] || false;
    };

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        this.initKeys();

        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();
        
        

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'displayNormals').name("Display Normals");

        this.gui.add(this.scene,'displaySphere').name('Display Sphere');
        this.gui.add(this.scene,'displayPanorama').name('Display Pano');
        this.gui.add(this.scene,'displayTerrain').name('Display Terrain');
        this.gui.add(this.scene,'displayBird').name('Display Bird');


        this.gui.add(this.scene.camera, 'fov', 0.1, 3).name('Camera FOV');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');
        return true;
    }

    


}