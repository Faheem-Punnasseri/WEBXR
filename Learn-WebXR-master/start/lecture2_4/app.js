import * as THREE from '../../libs/three/three.module.js';
import { OrbitControls } from '../../libs/three/jsm/OrbitControls.js';

class App {
    constructor() {
        const container = document.createElement('div');
        document.body.appendChild(container);

        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
        //this.camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.5, 200);
        this.camera.position.set(-10, 0, 100);

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xaaaaaa);

        const ambient = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 0.3);
        this.scene.add(ambient);

        const light = new THREE.DirectionalLight();
        light.position.set(0.2, 1, 1);
        this.scene.add(light);

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(this.renderer.domElement);

        //Replace Box with Circle, Cone, Cylinder, Dodecahedron, Icosahedron, Octahedron, Plane, Sphere, Tetrahedron, Torus or TorusKnot
        const heartShape = new THREE.Shape();

        heartShape.moveTo(25, 25);
        heartShape.bezierCurveTo(25, 25, 20, 0, 0, 0);
        heartShape.bezierCurveTo(-30, 0, -30, 35, -30, 35);
        heartShape.bezierCurveTo(-30, 55, -10, 77, 25, 95);
        heartShape.bezierCurveTo(60, 77, 80, 55, 80, 35);
        heartShape.bezierCurveTo(80, 35, 80, 0, 50, 0);
        heartShape.bezierCurveTo(35, 0, 25, 25, 25, 25);

        const extrudeSettings = { depth: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

        const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);

        const mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial());
        //const geometry = new THREE.CircleBufferGeometry(1, 32, 0, Math.PI);

        /*const shape = new THREE.Shape();
        const outerRadius = 0.8;
        const innerRadius = 0.4;
        const PI2 = Math.PI * 2;
        const inc = PI2 / 10;

        shape.moveTo(outerRadius, 0);
        let inner = true;

        for (let theta = inc; theta < PI2; theta += inc) {
            const radius = (inner) ? innerRadius : outerRadius;
            shape.lineTo(Math.cos(theta) * radius, Math.sin(theta) * radius);
            inner = !inner;
        }

        const extrudeSettings = {
            steps: 1,
            depth: 1,
            bevelEnabled: false
        }

        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);*/

        //const material = new THREE.MeshStandardMaterial({ color: 0xFF0000 });

        //this.mesh = new THREE.Mesh(geometry, material);

        this.scene.add(mesh);
        //this.scene.add(this.meSh);
        //this.scene.add(cylinder);

        const controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.renderer.setAnimationLoop(this.render.bind(this));

        window.addEventListener('resize', this.resize.bind(this));
    }

    resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    render() {
        //this.mesh.rotateX(0.05);
        //this.meSh.rotateY(0.02);
        this.renderer.render(this.scene, this.camera);
    }
}

export { App };