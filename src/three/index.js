import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";


export default class Configurator {
  constructor(container) {
    this.container = container;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls=null;
    this.cabinetHeight = 6;
    this.cabinetWidth = 6;
    this.cabinetDepth = 6;
    this.panelThickness = 0.1;

    this.init();
  }

  init() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("white");

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true,
    });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;



    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(4,5,10);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    const sunLight = new THREE.DirectionalLight("white",2);
    sunLight.position.set(0,0,10)
    sunLight.castShadow = true;
    this.scene.add(sunLight);
    const light = new THREE.AmbientLight("white", 2);
    this.scene.add(light);

    window.addEventListener("resize", () => this.handleResize());

    this.createCabinet();

    this.animate();
  }
updatedDimensions(newDimensions) {
  if (newDimensions) {
    if (this.cabinetMeshes && this.cabinetMeshes.length > 0) {
      this.cabinetMeshes.forEach(mesh => {
        this.scene.remove(mesh);
        
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach(mat => mat.dispose());
          } else {
            mesh.material.dispose();
          }
        }
      });
    }

    this.cabinetMeshes = []; 

    this.cabinetWidth = newDimensions.width;
    this.cabinetHeight = newDimensions.height;
    this.cabinetDepth = newDimensions.depth;

    this.createCabinet();
  }
}

createCabinet(updatedthickness) {
  if (this.cabinetMeshes && this.cabinetMeshes.length > 0) {
    this.cabinetMeshes.forEach(mesh => {
      this.scene.remove(mesh);
      if (mesh.geometry) mesh.geometry.dispose();
      if (mesh.material) {
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(mat => mat.dispose());
        } else {
          mesh.material.dispose();
        }
      }
    });
    this.cabinetMeshes.length = 0;
  }

  let texture = new THREE.TextureLoader().load("images/wood4.jpg");
  const material = new THREE.MeshPhysicalMaterial({map: texture,clearcoat: 1,  clearcoatRoughness: 0.5, });
  
  let backPanelThickness = this.panelThickness;
  let topPanelThickness = this.panelThickness;
  let bottomPanelThickness = this.panelThickness;
  let rightPanelThickness = this.panelThickness;
  let leftPanelThickness = this.panelThickness;

  if (updatedthickness) {
    backPanelThickness = updatedthickness.backPanelThickness || backPanelThickness;
    topPanelThickness = updatedthickness.topPanelThickness || topPanelThickness;
    bottomPanelThickness = updatedthickness.bottomPanelThickness || bottomPanelThickness;
    rightPanelThickness = updatedthickness.rightPanelThickness || rightPanelThickness;
    leftPanelThickness = updatedthickness.leftPanelThickness || leftPanelThickness;
  }

  const parts = [
    { name: "back", w: this.cabinetWidth, h: this.cabinetHeight, d: backPanelThickness, x: 0, y: this.cabinetHeight / 2, z: -this.cabinetDepth / 2 + backPanelThickness / 2 },
    { name: "top", w: this.cabinetWidth, h: topPanelThickness, d: this.cabinetDepth, x: 0, y: this.cabinetHeight - topPanelThickness / 2, z: 0 },
    { name: "bottom", w: this.cabinetWidth, h: bottomPanelThickness, d: this.cabinetDepth, x: 0, y: bottomPanelThickness / 2, z: 0 },
    { name: "right", w: rightPanelThickness, h: this.cabinetHeight, d: this.cabinetDepth, x: this.cabinetWidth / 2 - rightPanelThickness / 2, y: this.cabinetHeight / 2, z: 0 },
    { name: "left", w: leftPanelThickness, h: this.cabinetHeight, d: this.cabinetDepth, x: -this.cabinetWidth / 2 + leftPanelThickness / 2, y: this.cabinetHeight / 2, z: 0 },
    { name: "shelf1", w: this.cabinetWidth, h: this.panelThickness, d: this.cabinetDepth, x: 0, y: this.cabinetHeight / 3, z: 0 },
    { name: "shelf2", w: this.cabinetWidth, h: this.panelThickness, d: this.cabinetDepth, x: 0, y: (this.cabinetHeight * 2) / 3, z: 0 },
  ];

  this.cabinetMeshes = parts.map((part) => {
    const geometry = new THREE.BoxGeometry(part.w, part.h, part.d);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(part.x, part.y, part.z);
    mesh.castShadow=true
    mesh.receiveShadow=true
    mesh.name = part.name;
    this.scene.add(mesh);
    return mesh;
  });
}

  handleResize() {
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.controls.update()
        this.render();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}