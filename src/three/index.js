import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";


export default class Configurator {
  constructor(container) {
    this.container = container;
    this.scene = null;
    this.camera = null;
    this.renderer = null;

    this.cabinetHeight = 2.5;
    this.cabinetWidth = 2;
    this.cabinetDepth = 1.5;
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
    this.camera.position.set(3, 1,5);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    const sunLight = new THREE.DirectionalLight("white", 1);
    sunLight.position.set(2, 2, 10);
    sunLight.castShadow = true;
    this.scene.add(sunLight);

    const light = new THREE.AmbientLight("white", 2);
    this.scene.add(light);

    window.addEventListener("resize", () => this.handleResize());

    this.createCabinet();

    this.animate();
  }

  createCabinet(newDimensions) {
    if (newDimensions) {
      // Remove old cabinet meshes
      if (this.cabinetMeshes && this.cabinetMeshes.length > 0) {
        this.cabinetMeshes.forEach(mesh => this.scene.remove(mesh));
      }
      this.cabinetMeshes = []; // Reset array after removal

      // Update cabinet dimensions
      this.cabinetWidth = newDimensions.width;
      this.cabinetHeight = newDimensions.height;
      this.cabinetDepth = newDimensions.depth;
    }

    let texture = new THREE.TextureLoader().load("images/wood4.jpg");

    const materials = [
      new THREE.MeshStandardMaterial({ map: texture,roughness:0.5}),
      new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.3, visible: false }),
      new THREE.MeshStandardMaterial({ map: texture,roughness:0.5}),
      new THREE.MeshStandardMaterial({ map: texture,roughness:0.5}),
      new THREE.MeshStandardMaterial({ map: texture,roughness:0.5}),
      new THREE.MeshStandardMaterial({ map: texture,roughness:0.5}),
      new THREE.MeshStandardMaterial({ map: texture,roughness:0.5}),
      new THREE.MeshStandardMaterial({ map: texture,roughness:0.5}),
      new THREE.MeshStandardMaterial({ map: texture,roughness:0.5}),
      new THREE.MeshStandardMaterial({ map: texture,roughness:0.5})
    ];

    const dimensions = [
      { w: this.cabinetWidth, h: this.cabinetHeight, d: this.panelThickness, x: 0, y: this.cabinetHeight / 2, z: -this.cabinetDepth / 2 + this.panelThickness / 2 },
      { w: this.cabinetWidth, h: this.cabinetHeight, d: this.panelThickness, x: 0, y: this.cabinetHeight / 2, z: this.cabinetDepth / 2 - this.panelThickness / 2 },
      { w: this.cabinetWidth, h: this.panelThickness, d: this.cabinetDepth, x: 0, y: this.cabinetHeight - this.panelThickness / 2, z: 0 },
      { w: this.cabinetWidth, h: this.panelThickness, d: this.cabinetDepth, x: 0, y: this.panelThickness / 2, z: 0 },
      { w: this.panelThickness, h: this.cabinetHeight, d: this.cabinetDepth, x: -this.cabinetWidth / 2 + this.panelThickness / 2, y: this.cabinetHeight / 2, z: 0 },
      { w: this.panelThickness, h: this.cabinetHeight, d: this.cabinetDepth, x: this.cabinetWidth / 2 - this.panelThickness / 2, y: this.cabinetHeight / 2, z: 0 },
      { w: this.cabinetWidth, h: this.panelThickness, d: this.cabinetDepth, x: 0, y: this.cabinetHeight / 3, z: 0 },
      { w: this.cabinetWidth, h: this.panelThickness, d: this.cabinetDepth, x: 0, y: (this.cabinetHeight * 2) / 3, z: 0 },
      // { w: this.panelThickness, h: this.cabinetHeight, d: this.cabinetDepth, x: 0, y: this.cabinetHeight / 2, z: 0 },
    ];

    this.cabinetMeshes = dimensions.map((dim, index) => {
      const geometry = new THREE.BoxGeometry(dim.w, dim.h, dim.d);
      const mesh = new THREE.Mesh(geometry, materials[index % materials.length]); // Ensure index is within materials length
      mesh.position.set(dim.x, dim.y, dim.z);
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
    this.render();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}