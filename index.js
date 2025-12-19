<!DOCTYPE html>
<html>
<head>
    <style>
        body { margin: 0; background: #000; overflow: hidden; }
        #three-container { width: 100vw; height: 100vh; }
    </style>
</head>
<body>
    <div id="three-container"></div>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    
    <script>
    (function() {
        const container = document.getElementById('three-container');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 2.2;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        const loader = new THREE.TextureLoader();
        // Matcap textura pro ten rtuťový efekt
        const matcap = loader.load('https://raw.githubusercontent.com/nidorx/matcaps/master/1024/E6E6E6_333333_666666_999999-1024px.png');

        const material = new THREE.MeshMatcapMaterial({ matcap: matcap });
        const geometry = new THREE.IcosahedronGeometry(1, 64);
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        const clock = new THREE.Clock();

        function animate() {
            requestAnimationFrame(animate);
            const t = clock.getElapsedTime() * 0.5;
            const pos = mesh.geometry.attributes.position;
            const v = new THREE.Vector3();
            for (let i = 0; i < pos.count; i++) {
                v.fromBufferAttribute(pos, i);
                const noise = Math.sin(v.x * 1.5 + t) * 0.15 + Math.sin(v.y * 2.0 + t) * 0.15;
                v.normalize().multiplyScalar(1 + noise);
                pos.setXYZ(i, v.x, v.y, v.z);
            }
            pos.needsUpdate = true;
            mesh.rotation.y += 0.002;
            renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    })();
    </script>
</body>
</html>
