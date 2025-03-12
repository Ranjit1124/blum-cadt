import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Configurator {

    constructor(container) {
        this.container = container;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.init();
    }

    init() {
         this.scene = new THREE.Scene();
                this.scene.background = new THREE.Color("#E5E4E2");
        
        
                this.renderer = new THREE.WebGLRenderer({
                    antialias: true,       
                    preserveDrawingBuffer: true 
                });
                this.renderer.shadowMap.enabled = true;
                this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
                        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
                this.container.appendChild(this.renderer.domElement);
        
                this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.5, 1000);
                this.camera.position.set(0, 0, 5);
        
                this.controls = new OrbitControls(this.camera, this.renderer.domElement);
                const sunLight = new THREE.DirectionalLight('white', 1);
                sunLight.position.set(5, 5, 10);
                sunLight.castShadow = true; 
                this.scene.add(sunLight);
        
                const light = new THREE.AmbientLight("white", 5);
                this.scene.add(light);
                
                window.addEventListener("resize", () => this.handleResize());
        
            this.object()
                this.animate();
    }
    object(){
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        this.scene.add( cube );
        
        this.camera.position.z = 5;        
    }
     handleResize() {
        this.camera.aspect =
          this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(
          this.container.clientWidth,
          this.container.clientHeight
        );
      }
    
      animate() {
        requestAnimationFrame(() => this.animate());
        this.render();
      }
    
      render() {
        this.renderer.render(this.scene, this.camera);
      }
    }