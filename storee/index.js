
// Simulate loading progress
let progress = 0;
const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
            document.querySelector('.loading-screen').style.opacity = '0';
            setTimeout(() => {
                document.querySelector('.loading-screen').style.display = 'none';
                init3DShowroom();
            }, 500);
        }, 300);
    }
    document.getElementById('loading-progress').style.width = progress + '%';
}, 200);



// 3D Showroom implementation
function init3DShowroom() {
    const container = document.getElementById('3d-container');
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x121212);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xD4AF37, 2, 10);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);

    // Current model placeholder (would load actual models in production)
    let currentModel;

    // Model rotation animation
    function animateModel() {
        if (currentModel) {
            currentModel.rotation.y += 0.005;
        }
    }

    // Predefined model positions (would be loaded from files in production)
    const models = [
        () => {
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshPhongMaterial({
                color: 0x7B2D26,
                specular: 0xD4AF37,
                shininess: 100
            });
            return new THREE.Mesh(geometry, material);
        },
        () => {
            const geometry = new THREE.ConeGeometry(0.8, 1.5, 32);
            const material = new THREE.MeshPhongMaterial({
                color: 0x4A4E69,
                specular: 0xD4AF37,
                shininess: 100
            });
            return new THREE.Mesh(geometry, material);
        },
        () => {
            const geometry = new THREE.IcosahedronGeometry(1, 0);
            const material = new THREE.MeshPhongMaterial({
                color: 0x22333B,
                specular: 0xD4AF37,
                shininess: 100,
                wireframe: false
            });
            return new THREE.Mesh(geometry, material);
        }
    ];

    let currentModelIndex = 0;

    function loadModel(index) {
        if (currentModel) scene.remove(currentModel);

        currentModel = models[index]();
        currentModel.scale.set(1.5, 1.5, 1.5);
        scene.add(currentModel);
    }

    // Initial model load
    loadModel(currentModelIndex);

    // Navigation buttons
    document.getElementById('next-btn').addEventListener('click', () => {
        currentModelIndex = (currentModelIndex + 1) % models.length;
        loadModel(currentModelIndex);
    });

    document.getElementById('prev-btn').addEventListener('click', () => {
        currentModelIndex = (currentModelIndex - 1 + models.length) % models.length;
        loadModel(currentModelIndex);
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        animateModel();
        renderer.render(scene, camera);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    animate();
}

// Gallery item hover animations
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px)';
        const img = item.querySelector('img');
        img.style.transform = 'scale(1.05)';
        const info = item.querySelector('.item-info');
        info.style.transform = 'translateY(0)';
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
        const img = item.querySelector('img');
        img.style.transform = 'scale(1)';
        const info = item.querySelector('.item-info');
        info.style.transform = 'translateY(30px)';
    });
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
// Sticky navigation
window.addEventListener('scroll', function () {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    } else {
        nav.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    }
});

// Simple JavaScript for smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
}); 
