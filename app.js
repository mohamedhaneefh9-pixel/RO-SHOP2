// Global variables for products and cart
let products = [];
let adminToken = sessionStorage.getItem('admin_token') || '';
let uploadedImageBase64 = ''; // Store custom product image upload as base64
let cart = [];

// Image stock lists
const imageList = [
  'WhatsApp Image 2026-06-07 at 13.16.29.jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.30 (1).jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.30 (2).jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.30.jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.31 (1).jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.31.jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.32.jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.33 (1).jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.33.jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.34 (1).jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.34.jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.35 (1).jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.35.jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.36.jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.37.jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.38.jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.41 (1).jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.41.jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.42.jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.43 (1).jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.43.jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.44.jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.45 (1).jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.45.jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.46 (1).jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.46.jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.47 (1).jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.47.jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.48 (1).jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.48.jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.49 (1).jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.49.jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.50.jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.51 (1).jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.51.jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.52 (1).jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.52.jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.53.jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.54.jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.55.jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.56.jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.57 (1).jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.57.jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.58 (1).jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.58.jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.59 (1).jpeg',
  'WhatsApp Image 2026-06-07 at 13.16.59.jpeg',
  'WhatsApp Image 2026-06-07 at 13.17.00 (1).jpeg',
  'WhatsApp Image 2026-06-07 at 13.17.00.jpeg',
  'WhatsApp Image 2026-06-07 at 13.17.01 (1).jpeg',
  'WhatsApp Image 2026-06-07 at 13.17.01.jpeg',
  'WhatsApp Image 2026-06-07 at 13.17.02.jpeg',
  'WhatsApp Image 2026-06-07 at 13.17.03 (1).jpeg',
  'WhatsApp Image 2026-06-07 at 13.17.03.jpeg',
  'WhatsApp Image 2026-06-07 at 13.17.04.jpeg',
  'WhatsApp Image 2026-06-07 at 13.17.05.jpeg'
];

// Default Products list for offline/local fallback
const defaultProducts = [
  {
    id: 1,
    name: 'Raja Aqua Premium Alkaline RO',
    price: 8499,
    capacity: '12L',
    tech: 'RO + UV + UF + TDS Controller + Alkaline',
    image: 'WhatsApp Image 2026-06-07 at 13.16.41.jpeg',
    features: ['Alkaline pH Booster', 'Active Copper Technology', 'Multi-stage purification', '12L Storage Capacity']
  },
  {
    id: 2,
    name: 'Raja Aqua Copper+ Zinc RO',
    price: 9999,
    capacity: '10L',
    tech: 'RO + UV + Active Copper + Zinc Booster',
    image: 'WhatsApp Image 2026-06-07 at 13.16.44.jpeg',
    features: ['Copper & Zinc Infusion', 'Mineral Retention System', 'Detachable Water Tank', 'Auto Shut-off Indicator']
  },
  {
    id: 3,
    name: 'Raja Aqua Eco-Smart RO',
    price: 7499,
    capacity: '8L',
    tech: 'RO + UV + Eco-Water Saving Tech',
    image: 'WhatsApp Image 2026-06-07 at 13.16.45.jpeg',
    features: ['50% Water Recovery Tech', 'Compact Wall-Mount Design', 'Smart LED Alert Panel', 'Food Grade ABS Casing']
  },
  {
    id: 4,
    name: 'Raja Aqua Commercial RO 50 LPH',
    price: 18999,
    capacity: '50 LPH',
    tech: 'High-Flow Double Membrane RO System',
    image: 'WhatsApp Image 2026-06-07 at 13.16.32.jpeg',
    features: ['Double RO Membranes', 'Purifies 50 Liters/Hour', 'Stainless Steel Skid Frame', 'Suitable for Offices & Cafes']
  }
];

// Fetch products from API backend (with local storage & defaults fallback)
async function initProducts() {
  let loaded = false;
  
  if (window.location.protocol !== 'file:') {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        products = await response.json();
        loaded = true;
      }
    } catch (err) {
      console.warn('Network error loading products, falling back to local database:', err);
    }
  }

  // Fallback if running via file:// or if the server API fails to respond
  if (!loaded) {
    console.info('Fallback: Loading products from local store.');
    const storedProducts = localStorage.getItem('raja_aqua_products');
    if (storedProducts) {
      products = JSON.parse(storedProducts);
    } else {
      products = [...defaultProducts];
      localStorage.setItem('raja_aqua_products', JSON.stringify(products));
    }
  }

  renderProducts();
  updateCartUI();
}

// Shopping Cart State
function loadCart() {
  const storedCart = localStorage.getItem('raja_aqua_cart');
  if (storedCart) {
    cart = JSON.parse(storedCart);
  }
  updateCartUI();
}

function saveCart() {
  localStorage.setItem('raja_aqua_cart', JSON.stringify(cart));
  updateCartUI();
}

function addToCart(productId) {
  const product = products.find(p => p.id === parseInt(productId));
  if (!product) return;

  const cartItem = cart.find(item => item.product.id === product.id);
  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }
  
  saveCart();
  showCartDrawer();
  
  const cartBtn = document.getElementById('cart-toggle-btn');
  if (cartBtn) {
    cartBtn.classList.add('scale-110');
    setTimeout(() => {
      cartBtn.classList.remove('scale-110');
    }, 250);
  }
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.product.id !== parseInt(productId));
  saveCart();
}

function updateQuantity(productId, quantity) {
  const cartItem = cart.find(item => item.product.id === parseInt(productId));
  if (cartItem) {
    cartItem.quantity = parseInt(quantity);
    if (cartItem.quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveCart();
    }
  }
}

function updateCartUI() {
  const cartCountBadges = document.querySelectorAll('.cart-count');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartSubtotal = document.getElementById('cart-subtotal');
  
  let totalItems = 0;
  let subtotal = 0;
  let itemsHTML = '';

  cart.forEach(item => {
    totalItems += item.quantity;
    const itemTotal = item.product.price * item.quantity;
    subtotal += itemTotal;

    itemsHTML += `
      <div class="flex items-center justify-between p-4 mb-3 bg-white dark:bg-slate-850 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all duration-300">
        <div class="w-14 h-14 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-900 flex-shrink-0 flex items-center justify-center p-1 border border-slate-200 dark:border-slate-750">
          <img src="${item.product.image}" alt="${item.product.name}" class="w-full h-full object-contain" loading="lazy">
        </div>
        <div class="flex-grow ml-3 mr-2">
          <h4 class="text-xs font-semibold text-slate-800 dark:text-white line-clamp-1">${item.product.name}</h4>
          <div class="text-xs font-bold text-sky-600 dark:text-sky-400">₹${itemTotal.toLocaleString('en-IN')}</div>
        </div>
        <div class="flex flex-col items-end justify-between h-14">
          <button onclick="removeFromCart(${item.product.id})" class="text-slate-400 hover:text-red-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
          <div class="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
            <button onclick="updateQuantity(${item.product.id}, ${item.quantity - 1})" class="px-1.5 py-0.5 text-slate-600 dark:text-slate-350 hover:bg-slate-250 dark:hover:bg-slate-700 text-xs">-</button>
            <span class="px-1.5 text-[11px] font-semibold text-slate-800 dark:text-white">${item.quantity}</span>
            <button onclick="updateQuantity(${item.product.id}, ${item.quantity + 1})" class="px-1.5 py-0.5 text-slate-600 dark:text-slate-350 hover:bg-slate-250 dark:hover:bg-slate-700 text-xs">+</button>
          </div>
        </div>
      </div>
    `;
  });

  cartCountBadges.forEach(badge => {
    badge.innerText = totalItems;
    if (totalItems > 0) {
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  });

  if (cartItemsContainer) {
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="flex flex-col items-center justify-center h-64 text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-3 opacity-55" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <p class="text-xs font-semibold">Your cart is empty</p>
          <button onclick="hideCartDrawer()" class="mt-3 text-xs font-bold text-sky-600 hover:text-sky-850 uppercase tracking-widest">Start Shopping</button>
        </div>
      `;
    } else {
      cartItemsContainer.innerHTML = itemsHTML;
    }
  }

  if (cartSubtotal) {
    cartSubtotal.innerText = `₹${subtotal.toLocaleString('en-IN')}`;
  }
  
  const productSelectors = ['checkout-product-select', 'order-product-select'];
  productSelectors.forEach(selId => {
    const select = document.getElementById(selId);
    if (select) {
      let selectHTML = '<option value="">-- Choose System --</option>';
      products.forEach(p => {
        selectHTML += `<option value="${p.id}">${p.name} (₹${p.price.toLocaleString('en-IN')})</option>`;
      });
      select.innerHTML = selectHTML;
    }
  });
}

function showCartDrawer() {
  document.getElementById('cart-drawer').classList.add('open');
  document.getElementById('cart-overlay').classList.add('open');
  document.body.classList.add('overflow-hidden');
}

function hideCartDrawer() {
  document.getElementById('cart-drawer').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('open');
  document.body.classList.remove('overflow-hidden');
}

function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  grid.innerHTML = products.map(product => `
    <div class="product-card glass-panel flex flex-col justify-between" data-id="${product.id}">
      <div>
        <div class="img-container h-52 flex items-center justify-center p-5 bg-slate-50 dark:bg-slate-900 rounded-t-2xl border-b border-slate-100 dark:border-slate-800">
          <img src="${product.image}" alt="${product.name}" class="max-w-full max-h-full object-contain pointer-events-none drop-shadow-md" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1585837575652-267c041d77d4?w=500&auto=format&fit=crop&q=60'">
        </div>
        <div class="p-5">
          <div class="flex items-center justify-between mb-2">
            <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-300 rounded-full">${product.capacity}</span>
            <span class="text-xs font-bold text-slate-700 dark:text-slate-300">⭐ 4.9</span>
          </div>
          <h3 class="text-base font-bold text-slate-900 dark:text-white mb-1 leading-snug line-clamp-1">${product.name}</h3>
          <p class="text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-3 h-8 overflow-hidden">${product.tech}</p>
          <ul class="space-y-1 mb-4">
            ${(product.features || []).slice(0, 3).map(feat => `
              <li class="flex items-center text-[11px] text-slate-650 dark:text-slate-300">
                <svg class="w-3.5 h-3.5 mr-1.5 text-sky-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                ${feat}
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
      <div class="p-5 pt-0 border-t border-slate-50 dark:border-slate-800/40 mt-auto flex items-center justify-between">
        <div>
          <span class="text-[10px] text-slate-400 block leading-none mb-0.5">Special Price</span>
          <span class="text-lg font-black text-sky-600 dark:text-sky-400">₹${product.price.toLocaleString('en-IN')}</span>
        </div>
        <button onclick="addToCart(${product.id})" class="btn-ripple btn-primary px-3 py-2 rounded-xl text-[11px] font-bold flex items-center">
          <svg class="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
          Add to Cart
        </button>
      </div>
    </div>
  `).join('');
}

// Three.js Render Optimization Flags
let isWaveVisible = true;
let isPurifierVisible = true;

function initIntersectionObserver() {
  if (!('IntersectionObserver' in window)) return;

  const waveObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isWaveVisible = entry.isIntersecting;
    });
  }, { threshold: 0.05 });

  const purObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isPurifierVisible = entry.isIntersecting;
    });
  }, { threshold: 0.05 });

  const waveContainer = document.getElementById('water-bg');
  const purContainer = document.getElementById('purifier-3d');

  if (waveContainer) waveObserver.observe(waveContainer);
  if (purContainer) purObserver.observe(purContainer);
}

// ----------------- THREE.JS WATER WAVE BACKGROUND -----------------
let waveScene, waveCamera, waveRenderer, wavePlane;
const floatingDroplets = [];
let ripples = [];
const maxRipples = 6;
let lastMouseRippleTime = 0;
const mouseRippleCooldown = 100;
let clock; // Declared globally for ripples callback

// Object-pooled splash particles
const splashPool = [];
const maxSplashParticles = 24;
let splashGroup;

function initThreeWaves() {
  const container = document.getElementById('water-bg');
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  // Scene
  waveScene = new THREE.Scene();

  // Clock
  clock = new THREE.Clock();

  // Camera
  waveCamera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
  waveCamera.position.set(0, 12, 25);
  waveCamera.lookAt(0, -3, 0);

  // Renderer
  waveRenderer = new THREE.WebGLRenderer({ canvas: document.getElementById('water-canvas'), antialias: true, alpha: true });
  waveRenderer.setSize(width, height);
  waveRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  // Geometry (Stylized water plane) - 20x20 segments
  const planeGeo = new THREE.PlaneGeometry(120, 120, 20, 20);
  
  // Custom Phong Material for water surface reflections
  const planeMat = new THREE.MeshPhongMaterial({
    color: 0x0077b6,
    emissive: 0x020438,
    specular: 0x90e0ef,
    shininess: 125,
    flatShading: true,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.85
  });

  wavePlane = new THREE.Mesh(planeGeo, planeMat);
  wavePlane.rotation.x = -Math.PI / 2;
  wavePlane.position.y = -5;
  waveScene.add(wavePlane);

  // --- BUILD 3D TEARDROP GEOMETRY ---
  const points = [];
  for (let i = 0; i <= 15; i++) {
    const t = (i / 15) * Math.PI;
    const x = Math.sin(t) * (1.0 + Math.cos(t)) * 0.35; // width radius
    const y = -Math.cos(t) * 0.7; // height
    points.push(new THREE.Vector2(x, y));
  }
  const teardropGeo = new THREE.LatheGeometry(points, 16);

  // Droplet Material
  const dropMat = new THREE.MeshPhongMaterial({
    color: 0xe0f2fe,
    emissive: 0x0c4a6e,
    specular: 0xffffff,
    shininess: 150,
    transparent: true,
    opacity: 0.75,
    flatShading: false
  });

  // Spawn Droplets Group
  const dropletsGroup = new THREE.Group();
  waveScene.add(dropletsGroup);

  // 1. Spawn 8 Floating/Bobbing Droplets
  const numFloating = 8;
  for (let i = 0; i < numFloating; i++) {
    const droplet = new THREE.Mesh(teardropGeo, dropMat);
    const rx = (Math.random() - 0.5) * 50;
    const rz = (Math.random() - 0.5) * 50;
    const ry = -2 + Math.random() * 8;
    
    droplet.position.set(rx, ry, rz);
    droplet.scale.set(0.6, 0.6, 0.6);
    
    droplet.userData = {
      isFalling: false,
      initialX: rx,
      initialY: ry,
      initialZ: rz,
      speed: 0.5 + Math.random() * 0.8,
      bobScale: 1.5 + Math.random() * 2,
      driftScale: 1 + Math.random() * 2,
      phaseOffset: Math.random() * Math.PI * 2
    };
    
    dropletsGroup.add(droplet);
    floatingDroplets.push(droplet);
  }

  // 2. Spawn 12 Falling Droplets
  const numFalling = 12;
  for (let i = 0; i < numFalling; i++) {
    const droplet = new THREE.Mesh(teardropGeo, dropMat);
    const rx = (Math.random() - 0.5) * 50;
    const rz = (Math.random() - 0.5) * 50;
    const ry = 8 + Math.random() * 12;
    
    droplet.position.set(rx, ry, rz);
    droplet.scale.set(0.4, 0.4, 0.4);
    
    droplet.userData = {
      isFalling: true,
      speed: 8 + Math.random() * 6,
      initialX: rx,
      initialZ: rz
    };
    
    dropletsGroup.add(droplet);
    floatingDroplets.push(droplet);
  }

  // --- INITIALIZE SPLASH PARTICLE POOL ---
  splashGroup = new THREE.Group();
  waveScene.add(splashGroup);
  
  const splashGeo = new THREE.DodecahedronGeometry(0.06, 0);
  const splashMat = new THREE.MeshPhongMaterial({
    color: 0x90e0ef,
    specular: 0xffffff,
    shininess: 100,
    transparent: true,
    opacity: 0.8
  });

  for (let i = 0; i < maxSplashParticles; i++) {
    const p = new THREE.Mesh(splashGeo, splashMat);
    p.visible = false;
    p.userData = {
      active: false,
      vx: 0,
      vy: 0,
      vz: 0
    };
    splashGroup.add(p);
    splashPool.push(p);
  }

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  waveScene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.85);
  dirLight1.position.set(10, 40, 20);
  waveScene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0x00b4d8, 0.5);
  dirLight2.position.set(-20, 20, -10);
  waveScene.add(dirLight2);

  // Mouse Variables for interactive waves
  let targetX = 0;
  let targetY = 0;
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let hasMouse = false;

  window.addEventListener('mousemove', (e) => {
    if (!isWaveVisible) return;
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    targetX = mouse.x * 3;
    targetY = mouse.y * 3;
    hasMouse = true;
  });

  function animate() {
    requestAnimationFrame(animate);

    if (isWaveVisible) {
      const time = clock.getElapsedTime();
      const dt = Math.min(clock.getDelta(), 0.1);
      
      // Raycasting mouse position for ripples
      if (hasMouse) {
        raycaster.setFromCamera(mouse, waveCamera);
        const intersects = raycaster.intersectObject(wavePlane);
        if (intersects.length > 0) {
          const pt = intersects[0].point;
          createMouseRipple(pt.x, pt.z);
        }
      }

      // Filter active ripples
      const activeRipples = [];
      ripples.forEach(r => {
        const age = time - r.startTime;
        if (age < r.duration) {
          activeRipples.push(r);
        }
      });
      ripples = activeRipples;

      // Deform wave plane geometry
      const pos = wavePlane.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i); // corresponds to world Z

        // Ocean swell sin equations
        let z = Math.sin(x * 0.07 + time * 1.5) * 1.2 + 
                Math.cos(y * 0.05 + time * 1.1) * 1.2 +
                Math.sin((x + y) * 0.03 + time * 0.8) * 0.7;

        // Apply dynamic ripples
        ripples.forEach(r => {
          const dx = x - r.x;
          const dy = y - r.z;
          const dist = Math.sqrt(dx*dx + dy*dy);
          
          const age = time - r.startTime;
          const rPos = age * r.speed;

          if (dist < rPos + 4.0 && dist > rPos - 4.0) {
            const distFromWave = Math.abs(dist - rPos);
            const fade = Math.max(0, 1.0 - age / r.duration) * Math.max(0, 1.0 - distFromWave / 4.0);
            z += Math.sin((dist - rPos) * 2.0) * r.amplitude * fade;
          }
        });

        pos.setZ(i, z);
      }
      
      wavePlane.geometry.computeVertexNormals();
      pos.needsUpdate = true;

      // Update splash particles
      const grav = 14.0;
      splashPool.forEach(p => {
        if (p.userData.active) {
          p.position.x += p.userData.vx * dt;
          p.position.y += p.userData.vy * dt;
          p.position.z += p.userData.vz * dt;
          p.userData.vy -= grav * dt;

          if (p.position.y < -5.6) {
            p.userData.active = false;
            p.visible = false;
          }
        }
      });

      // Animate teardrop droplets
      floatingDroplets.forEach((drop, idx) => {
        const ud = drop.userData;
        if (ud.isFalling) {
          drop.position.y -= ud.speed * dt;

          const waveHeight = Math.sin(drop.position.x * 0.07 + time * 1.5) * 1.2 + 
                             Math.cos(drop.position.z * 0.05 + time * 1.1) * 1.2;
          const impactY = -5.0 + waveHeight;

          if (drop.position.y <= impactY) {
            createRipple(drop.position.x, drop.position.z, 0.45, 11.0, 1.3);
            spawnSplash(drop.position.x, impactY, drop.position.z);

            drop.position.y = 10 + Math.random() * 8;
            drop.position.x = (Math.random() - 0.5) * 55;
            drop.position.z = (Math.random() - 0.5) * 55;
            ud.speed = 8 + Math.random() * 6;
          }
          drop.rotation.y += 0.02;
        } else {
          const phase = time * ud.speed + ud.phaseOffset;
          drop.position.y = ud.initialY + Math.sin(phase) * ud.bobScale * 0.4;
          drop.position.x = ud.initialX + Math.sin(phase * 0.5) * ud.driftScale * 0.3;
          drop.position.z = ud.initialZ + Math.cos(phase * 0.6) * ud.driftScale * 0.3;
          
          drop.rotation.x = time * 0.1 + idx;
          drop.rotation.y = time * 0.15;
        }
      });

      waveCamera.position.x += (targetX - waveCamera.position.x) * 0.05;
      waveCamera.position.y += (12 + targetY - waveCamera.position.y) * 0.05;
      waveCamera.lookAt(0, -3, 0);

      waveRenderer.render(waveScene, waveCamera);
    }
  }

  animate();

  window.addEventListener('resize', () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    
    waveCamera.aspect = w / h;
    waveCamera.updateProjectionMatrix();
    
    waveRenderer.setSize(w, h);
  });
}

function createRipple(x, z, amplitude = 0.5, speed = 8.0, duration = 1.5) {
  if (ripples.length >= maxRipples) {
    ripples.shift();
  }
  ripples.push({
    x,
    z,
    startTime: clock.getElapsedTime(),
    amplitude,
    speed,
    duration
  });
}

function createMouseRipple(x, z) {
  const now = performance.now();
  if (now - lastMouseRippleTime > mouseRippleCooldown) {
    createRipple(x, z, 0.22, 10.0, 1.0);
    lastMouseRippleTime = now;
  }
}

function spawnSplash(x, y, z) {
  let spawned = 0;
  for (let i = 0; i < maxSplashParticles; i++) {
    const p = splashPool[i];
    if (!p.userData.active) {
      p.position.set(x, y + 0.1, z);
      p.visible = true;
      p.userData.active = true;

      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 2;
      p.userData.vx = Math.cos(angle) * speed * 0.5;
      p.userData.vy = 3 + Math.random() * 3;
      p.userData.vz = Math.sin(angle) * speed * 0.5;

      spawned++;
      if (spawned >= 4) break;
    }
  }
}

// ----------------- LUXURY 3D PURIFIER ENGINE -----------------
let purScene, purCamera, purRenderer, purGroup;

function initThreePurifier() {
  const container = document.getElementById('purifier-3d');
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  // Scene
  purScene = new THREE.Scene();

  // Camera
  purCamera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
  purCamera.position.set(0, 0, 22);

  // Renderer
  purRenderer = new THREE.WebGLRenderer({ canvas: document.getElementById('purifier-canvas'), antialias: true, alpha: true });
  purRenderer.setSize(width, height);
  purRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  // Purifier Model Group
  purGroup = new THREE.Group();
  purScene.add(purGroup);

  // --- BUILD PROCEDURAL LUXURY PURIFIER ---

  // Premium Midnight Cobalt Navy Material
  const chassisMat = new THREE.MeshPhongMaterial({
    color: 0x03071e, 
    emissive: 0x0a1128, 
    specular: 0x00b4d8, 
    shininess: 120
  });

  // Champagne Gold Accent Material
  const goldMat = new THREE.MeshPhongMaterial({
    color: 0xd4af37, 
    emissive: 0x221802,
    specular: 0xffe875, 
    shininess: 100
  });

  const whiteMat = new THREE.MeshPhongMaterial({ color: 0xf8f9fa, shininess: 60 });

  // 1. Backplate Casing
  const backPlate = new THREE.Mesh(new THREE.BoxGeometry(6.6, 10.4, 0.9), chassisMat);
  backPlate.position.z = -1.4;
  purGroup.add(backPlate);

  // 2. Main Upper Housing
  const bodyMesh = new THREE.Mesh(new THREE.BoxGeometry(6.4, 3.2, 3.6), chassisMat);
  bodyMesh.position.y = 3.3;
  purGroup.add(bodyMesh);

  // 3. Digital Display with Gold Border
  const displayBorder = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.2, 0.05), goldMat);
  displayBorder.position.set(0, 3.3, 1.79);
  purGroup.add(displayBorder);

  const screenMat = new THREE.MeshPhongMaterial({ color: 0x090d16, shininess: 80 });
  const screen = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.0, 0.1), screenMat);
  screen.position.set(0, 3.3, 1.82);
  purGroup.add(screen);

  const led = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.05, 8), new THREE.MeshBasicMaterial({ color: 0x10b981 }));
  led.rotation.x = Math.PI / 2;
  led.position.set(-0.7, 3.3, 1.87);
  purGroup.add(led);

  // 4. Transparent Smoked Sapphire Water Tank
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x7dd3fc,
    transmission: 0.7,
    opacity: 0.5,
    transparent: true,
    roughness: 0.08,
    metalness: 0.1,
    ior: 1.45,
    side: THREE.DoubleSide
  });
  const tank = new THREE.Mesh(new THREE.BoxGeometry(6.2, 4.6, 3.4), glassMat);
  tank.position.y = -0.5;
  purGroup.add(tank);

  // 5. Glowing Aqua Water inside tank
  const waterMat = new THREE.MeshPhongMaterial({
    color: 0x0ea5e9,
    emissive: 0x0369a1,
    transparent: true,
    opacity: 0.7,
    shininess: 95,
    specular: 0xffffff
  });
  const water = new THREE.Mesh(new THREE.BoxGeometry(6.0, 3.0, 3.2), waterMat);
  water.position.set(0, -1.2, 0);
  purGroup.add(water);

  // 6. Bottom Casing
  const bottomMesh = new THREE.Mesh(new THREE.BoxGeometry(6.4, 1.8, 3.6), chassisMat);
  bottomMesh.position.y = -3.7;
  purGroup.add(bottomMesh);

  // 7. Gold Trim Strip
  const trimStrip = new THREE.Mesh(new THREE.BoxGeometry(6.42, 0.12, 3.62), goldMat);
  trimStrip.position.y = -2.8;
  purGroup.add(trimStrip);

  // 8. Filters at bottom (navy blue with gold caps)
  const filterGroup = new THREE.Group();
  filterGroup.position.set(0, -3.7, 0.4);
  const filterGeo = new THREE.CylinderGeometry(0.65, 0.65, 1.4, 12);
  const filterCapGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.18, 12);
  const deepBlueMat = new THREE.MeshPhongMaterial({ color: 0x0f172a, shininess: 80 });
  
  for (let i = 0; i < 3; i++) {
    const filter = new THREE.Mesh(filterGeo, i === 1 ? goldMat : deepBlueMat);
    filter.position.x = (i - 1) * 1.6;
    filterGroup.add(filter);

    const filterCap = new THREE.Mesh(filterCapGeo, goldMat);
    filterCap.position.set((i - 1) * 1.6, 0.75, 0);
    filterGroup.add(filterCap);
  }
  purGroup.add(filterGroup);

  // 9. Faucet Champagne Gold tap
  const tapGroup = new THREE.Group();
  tapGroup.position.set(0, -1.8, 1.75);
  const tapBase = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.5, 12), goldMat);
  tapBase.rotateX(Math.PI / 2);
  tapGroup.add(tapBase);
  const tapLever = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.4, 0.25), goldMat);
  tapLever.position.set(0, 0.35, 0);
  tapGroup.add(tapLever);
  purGroup.add(tapGroup);

  // 10. Water Droplets
  const dropletsGroup = new THREE.Group();
  purGroup.add(dropletsGroup);
  const purDropGeo = new THREE.DodecahedronGeometry(0.06, 1);
  const purDropMat = new THREE.MeshPhongMaterial({ color: 0xe0f2fe, transparent: true, opacity: 0.85 });
  
  const droplets = [];
  for (let i = 0; i < 4; i++) {
    const drop = new THREE.Mesh(purDropGeo, purDropMat);
    drop.position.set(0, 1.8 - (i * 0.7), 0);
    drop.scale.set(1, 1.4, 1);
    dropletsGroup.add(drop);
    droplets.push(drop);
  }

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
  purScene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0xffffff, 0.95, 100);
  pointLight1.position.set(8, 12, 12);
  purScene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0x00b4d8, 0.5, 100);
  pointLight2.position.set(-8, -8, 8);
  purScene.add(pointLight2);

  // Mouse hover tilt & drag
  let isDragging = false;
  let targetRotX = 0;
  let targetRotY = 0;
  let prevMouse = { x: 0, y: 0 };

  container.addEventListener('mousedown', () => { isDragging = true; });
  window.addEventListener('mouseup', () => { isDragging = false; });
  container.addEventListener('mousemove', (e) => {
    if (!isPurifierVisible) return;
    const deltaX = e.clientX - prevMouse.x;
    const deltaY = e.clientY - prevMouse.y;

    if (isDragging) {
      targetRotY += deltaX * 0.005;
      targetRotX += deltaY * 0.005;
      targetRotX = Math.max(-0.4, Math.min(0.4, targetRotX));
    } else {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / container.clientWidth - 0.5;
      const y = (e.clientY - rect.top) / container.clientHeight - 0.5;
      targetRotY = x * 0.6;
      targetRotX = y * 0.3;
    }
    prevMouse = { x: e.clientX, y: e.clientY };
  });

  const clockPur = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    if (isPurifierVisible) {
      const time = clockPur.getElapsedTime();

      if (!isDragging) {
        purGroup.rotation.y = (Math.sin(time * 0.4) * 0.08) + targetRotY;
        purGroup.rotation.x = targetRotX;
      } else {
        purGroup.rotation.y += (targetRotY - purGroup.rotation.y) * 0.1;
        purGroup.rotation.x += (targetRotX - purGroup.rotation.x) * 0.1;
      }

      // floating idle
      purGroup.position.y = Math.sin(time * 1.3) * 0.2;

      // falling faucet droplets
      droplets.forEach(drop => {
        drop.position.y -= 0.035;
        if (drop.position.y < -0.9) {
          drop.position.y = 1.8;
        }
      });

      // water pulsing
      water.scale.y = 1 + Math.sin(time * 2.5) * 0.015;

      purRenderer.render(purScene, purCamera);
    }
  }

  animate();

  window.addEventListener('resize', () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    
    purCamera.aspect = w / h;
    purCamera.updateProjectionMatrix();
    
    purRenderer.setSize(w, h);
  });
}

// ----------------- ADMIN DASHBOARD CLIENT OPERATIONS -----------------

function populateImageSelectors() {
  const selectors = ['prod-image', 'edit-prod-image'];
  selectors.forEach(selId => {
    const el = document.getElementById(selId);
    if (!el) return;
    
    let html = '<option value="">-- Choose Stock Photo --</option>';
    imageList.forEach(img => {
      html += `<option value="${img}">${img}</option>`;
    });
    el.innerHTML = html;
  });
}

// Switch tabs inside admin panel
let activeAdminTab = 'catalog';
function switchAdminTab(tabName) {
  activeAdminTab = tabName;
  const catalogTab = document.getElementById('admin-catalog-tab');
  const ordersTab = document.getElementById('admin-orders-tab');
  const catalogBtn = document.getElementById('admin-tab-catalog-btn');
  const ordersBtn = document.getElementById('admin-tab-orders-btn');

  if (tabName === 'catalog') {
    catalogTab.classList.remove('hidden');
    ordersTab.classList.add('hidden');
    catalogBtn.className = 'pb-2.5 text-xs font-bold uppercase tracking-wider border-b-2 border-brand-sky text-brand-sky transition-all duration-200';
    ordersBtn.className = 'pb-2.5 text-xs font-bold uppercase tracking-wider border-b-2 border-transparent text-slate-400 hover:text-slate-800 dark:hover:text-white transition-all duration-200';
    renderAdminProducts();
  } else {
    catalogTab.classList.add('hidden');
    ordersTab.classList.remove('hidden');
    ordersBtn.className = 'pb-2.5 text-xs font-bold uppercase tracking-wider border-b-2 border-brand-sky text-brand-sky transition-all duration-200';
    catalogBtn.className = 'pb-2.5 text-xs font-bold uppercase tracking-wider border-b-2 border-transparent text-slate-400 hover:text-slate-800 dark:hover:text-white transition-all duration-200';
    loadAdminOrders();
  }
}

// Customer orders listing
let adminOrders = [];

async function loadAdminOrders() {
  if (!adminToken) return;
  let loaded = false;

  if (window.location.protocol !== 'file:') {
    try {
      const response = await fetch('/api/orders', {
        headers: { 'Authorization': 'Bearer ' + adminToken }
      });
      if (response.ok) {
        adminOrders = await response.json();
        loaded = true;
      }
    } catch (err) {
      console.warn('Error fetching orders from server, using local storage fallback:', err);
    }
  }

  if (!loaded) {
    const storedOrders = localStorage.getItem('raja_aqua_orders');
    adminOrders = storedOrders ? JSON.parse(storedOrders) : [];
  }

  renderAdminOrders();
  const countEl = document.getElementById('admin-orders-count');
  if (countEl) countEl.innerText = adminOrders.length;
}

function renderAdminOrders() {
  const tbody = document.getElementById('admin-orders-list');
  if (!tbody) return;

  if (adminOrders.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="px-4 py-8 text-center text-xs text-slate-400 font-semibold italic">
          No customer orders found in the database.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = adminOrders.map(order => {
    const formattedDate = new Date(order.orderDate).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const paymentMethod = order.paymentMethod || 'UPI';
    const methodBadgeClass = paymentMethod.toUpperCase() === 'COD' ? 'badge-cod' : 'badge-upi';

    return `
      <tr class="border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-50/50 dark:hover:bg-slate-900/20 text-xs transition-colors">
        <td class="px-4 py-4 font-mono font-bold text-slate-900 dark:text-white">${order.orderId}</td>
        <td class="px-4 py-4 text-slate-400">${formattedDate}</td>
        <td class="px-4 py-4 text-slate-455">
          <span class="font-bold block text-slate-850 dark:text-slate-200">${order.customerName}</span>
          <a href="tel:${order.phone}" class="text-sky-500 font-bold block mt-0.5 hover:underline">${order.phone}</a>
          <span class="text-[10px] text-slate-400 block mt-1 max-w-[200px] truncate leading-tight" title="${order.address}">${order.address}</span>
        </td>
        <td class="px-4 py-4 font-semibold text-slate-850 dark:text-slate-250">${order.productName}</td>
        <td class="px-4 py-4 text-sky-600 dark:text-sky-400 font-black">₹${order.price.toLocaleString('en-IN')}</td>
        <td class="px-4 py-4">
          <span class="${methodBadgeClass}">${paymentMethod}</span>
        </td>
        <td class="px-4 py-4 text-right">
          <select onchange="updateOrderStatus('${order.orderId}', this.value)" class="status-select ${getStatusClass(order.status)}">
            <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Shipped" ${order.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
            <option value="Installed" ${order.status === 'Installed' ? 'selected' : ''}>Installed</option>
            <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </td>
      </tr>
    `;
  }).join('');
}

function getStatusClass(status) {
  switch (status) {
    case 'Pending': return 'status-pending';
    case 'Shipped': return 'status-shipped';
    case 'Installed': return 'status-installed';
    case 'Cancelled': return 'status-cancelled';
    default: return '';
  }
}

async function updateOrderStatus(orderId, newStatus) {
  if (!adminToken) return;
  let updated = false;

  if (window.location.protocol !== 'file:') {
    try {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + adminToken
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        updated = true;
      }
    } catch (err) {
      console.warn('Error updating status on server, falling back to local storage:', err);
    }
  }

  if (!updated) {
    const storedOrders = localStorage.getItem('raja_aqua_orders');
    if (storedOrders) {
      const ordersList = JSON.parse(storedOrders);
      const order = ordersList.find(o => o.orderId === orderId);
      if (order) {
        order.status = newStatus;
        localStorage.setItem('raja_aqua_orders', JSON.stringify(ordersList));
        updated = true;
      }
    }
  }

  if (updated) {
    const order = adminOrders.find(o => o.orderId === orderId);
    if (order) order.status = newStatus;
    renderAdminOrders();
  } else {
    alert('Failed to update status.');
  }
}

// Open Admin Panel
function openAdmin() {
  if (adminToken) {
    document.getElementById('admin-modal').classList.add('open');
    document.body.classList.add('overflow-hidden');
    switchAdminTab('catalog');
    return;
  }
  
  const pwd = prompt('Enter Admin Password:');
  if (pwd === null) return;

  const checkLocalPassword = () => {
    if (pwd === 'rajaaqua123') {
      adminToken = 'rajaaqua_secure_session_token_55682';
      sessionStorage.setItem('admin_token', adminToken);
      document.getElementById('admin-modal').classList.add('open');
      document.body.classList.add('overflow-hidden');
      switchAdminTab('catalog');
    } else {
      alert('Incorrect password! Try again.');
    }
  };

  if (window.location.protocol === 'file:') {
    checkLocalPassword();
    return;
  }

  fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: pwd })
  })
  .then(res => {
    if (res.ok) return res.json();
    if (res.status === 401) {
      throw { status: 401, message: 'Unauthorized' };
    }
    throw { status: res.status, message: 'Server Error' };
  })
  .then(data => {
    adminToken = data.token;
    sessionStorage.setItem('admin_token', adminToken);
    document.getElementById('admin-modal').classList.add('open');
    document.body.classList.add('overflow-hidden');
    switchAdminTab('catalog');
  })
  .catch(err => {
    if (err && err.status === 401) {
      alert('Incorrect password! Try again.');
    } else {
      console.warn('Backend login unavailable, falling back to local password check:', err);
      checkLocalPassword();
    }
  });
}

function closeAdmin() {
  document.getElementById('admin-modal').classList.remove('open');
  document.body.classList.remove('overflow-hidden');
  cancelEditProduct();
}

function renderAdminProducts() {
  const tbody = document.getElementById('admin-products-list');
  if (!tbody) return;

  tbody.innerHTML = products.map(product => `
    <tr class="border-b border-slate-100 dark:border-slate-800 text-sm">
      <td class="px-4 py-3 font-semibold text-slate-800 dark:text-white">${product.name}</td>
      <td class="px-4 py-3 text-sky-600 dark:text-sky-400 font-bold">₹${product.price.toLocaleString('en-IN')}</td>
      <td class="px-4 py-3 text-slate-650 dark:text-slate-300">${product.capacity}</td>
      <td class="px-4 py-3 text-right">
        <button onclick="openEditProduct(${product.id})" class="text-sky-500 hover:text-sky-700 font-bold mr-2 text-xs">Edit</button>
        <button onclick="deleteProduct(${product.id})" class="text-red-500 hover:text-red-750 font-bold text-xs">Delete</button>
      </td>
    </tr>
  `).join('');
}

// Add Product via API
async function handleAddProduct(e) {
  e.preventDefault();
  const name = document.getElementById('prod-name').value;
  const price = parseInt(document.getElementById('prod-price').value);
  const capacity = document.getElementById('prod-capacity').value;
  const tech = document.getElementById('prod-tech').value;
  const featuresText = document.getElementById('prod-features').value;

  let image = 'WhatsApp Image 2026-06-07 at 13.16.41.jpeg';
  if (uploadedImageBase64) {
    image = uploadedImageBase64;
  } else {
    const selectedStock = document.getElementById('prod-image').value;
    if (selectedStock) image = selectedStock;
  }

  const features = featuresText ? featuresText.split('\n').map(f => f.trim()).filter(f => f) : ['Premium Filter Technology'];
  
  try {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + adminToken
      },
      body: JSON.stringify({ name, price, capacity, tech, image, features })
    });
    if (res.ok) {
      uploadedImageBase64 = '';
      e.target.reset();
      await initProducts();
      switchAdminTab('catalog');
      alert('Product added successfully to server catalog!');
    } else {
      alert('Failed to add product to catalog.');
    }
  } catch (err) {
    console.error('Error adding product:', err);
  }
}

// Delete Product via API
async function deleteProduct(id) {
  if (confirm('Are you sure you want to delete this product?')) {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + adminToken }
      });
      if (res.ok) {
        await initProducts();
        switchAdminTab('catalog');
        removeFromCart(id);
        alert('Product deleted successfully!');
      } else {
        alert('Failed to delete product.');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  }
}

// Edit Product
let editingProductId = null;
function openEditProduct(id) {
  const p = products.find(prod => prod.id === id);
  if (!p) return;

  editingProductId = id;
  uploadedImageBase64 = '';
  
  document.getElementById('edit-prod-name').value = p.name;
  document.getElementById('edit-prod-price').value = p.price;
  document.getElementById('edit-prod-capacity').value = p.capacity;
  document.getElementById('edit-prod-tech').value = p.tech;
  
  const imgSelect = document.getElementById('edit-prod-image');
  if (imageList.includes(p.image)) {
    imgSelect.value = p.image;
  } else {
    imgSelect.value = '';
  }
  
  document.getElementById('edit-prod-features').value = (p.features || []).join('\n');

  document.getElementById('edit-product-section').classList.remove('hidden');
  document.getElementById('add-product-section').classList.add('hidden');
}

function cancelEditProduct() {
  editingProductId = null;
  uploadedImageBase64 = '';
  document.getElementById('edit-product-section').classList.add('hidden');
  document.getElementById('add-product-section').classList.remove('hidden');
  document.getElementById('edit-product-form').reset();
}

async function handleEditProduct(e) {
  e.preventDefault();
  if (editingProductId === null) return;

  const name = document.getElementById('edit-prod-name').value;
  const price = parseInt(document.getElementById('edit-prod-price').value);
  const capacity = document.getElementById('edit-prod-capacity').value;
  const tech = document.getElementById('edit-prod-tech').value;
  const featuresText = document.getElementById('edit-prod-features').value;

  const index = products.findIndex(p => p.id === editingProductId);
  if (index !== -1) {
    let image = products[index].image;
    if (uploadedImageBase64) {
      image = uploadedImageBase64;
    } else {
      const selectedStock = document.getElementById('edit-prod-image').value;
      if (selectedStock) image = selectedStock;
    }

    const features = featuresText ? featuresText.split('\n').map(f => f.trim()).filter(f => f) : ['Premium Filter Technology'];

    try {
      const res = await fetch(`/api/products/${editingProductId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + adminToken
        },
        body: JSON.stringify({ name, price, capacity, tech, image, features })
      });
      if (res.ok) {
        uploadedImageBase64 = '';
        await initProducts();
        cancelEditProduct();
        switchAdminTab('catalog');
        alert('Product updated successfully!');
      } else {
        alert('Failed to edit product.');
      }
    } catch (err) {
      console.error('Error editing product:', err);
    }
  }
}

// Reset Catalog via API
async function resetCatalogToDefault() {
  if (confirm('Are you sure you want to reset the catalog? All custom products will be removed.')) {
    try {
      const res = await fetch('/api/reset-catalog', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + adminToken }
      });
      if (res.ok) {
        await initProducts();
        cancelEditProduct();
        switchAdminTab('catalog');
        alert('Products catalog reset successfully!');
      }
    } catch (err) {
      console.error('Error resetting catalog:', err);
    }
  }
}

// Checkout Form Modal
function openCheckout(singleProductId = null) {
  hideCartDrawer();
  document.getElementById('checkout-modal').classList.add('open');
  document.body.classList.add('overflow-hidden');

  const select = document.getElementById('checkout-product-select');
  if (singleProductId) {
    select.value = singleProductId;
  } else if (cart.length > 0) {
    select.value = cart[0].product.id;
  }
  
  setPaymentMethod('upi');
}

function closeCheckout() {
  document.getElementById('checkout-modal').classList.remove('open');
  document.body.classList.remove('overflow-hidden');
  document.getElementById('payment-success-screen').classList.add('hidden');
  document.getElementById('checkout-form-screen').classList.remove('hidden');
  document.getElementById('checkout-form').reset();
}

let currentPaymentMethod = 'upi';

function setPaymentMethod(method) {
  currentPaymentMethod = method;
  const codForm = document.getElementById('cod-payment-form');
  const upiForm = document.getElementById('upi-payment-form');
  const codBtn = document.getElementById('pay-method-cod');
  const upiBtn = document.getElementById('pay-method-upi');

  if (method === 'cod') {
    if (codForm) codForm.classList.remove('hidden');
    if (upiForm) upiForm.classList.add('hidden');
    if (codBtn) codBtn.classList.add('border-sky-500', 'bg-sky-50/50', 'dark:bg-sky-950/20');
    if (upiBtn) upiBtn.classList.remove('border-sky-500', 'bg-sky-50/50', 'dark:bg-sky-950/20');
  } else {
    if (codForm) codForm.classList.add('hidden');
    if (upiForm) upiForm.classList.remove('hidden');
    if (upiBtn) upiBtn.classList.add('border-sky-500', 'bg-sky-50/50', 'dark:bg-sky-950/20');
    if (codBtn) codBtn.classList.remove('border-sky-500', 'bg-sky-50/50', 'dark:bg-sky-950/20');
  }
}

// Place Order API call
async function handleCheckoutSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('checkout-name').value;
  const phone = document.getElementById('checkout-phone').value;
  const address = document.getElementById('checkout-address').value;
  const productId = document.getElementById('checkout-product-select').value;
  
  if (!productId) {
    alert('Please select a system to order.');
    return;
  }

  const product = products.find(p => p.id === parseInt(productId));
  if (!product) return;

  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = `<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing Order...`;
  submitBtn.disabled = true;

  const paymentMethod = currentPaymentMethod.toUpperCase();
  const orderId = 'RO-DDG-' + Math.floor(100000 + Math.random() * 900000);

  const displaySuccess = (oId, pName, pPrice) => {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;

    // Transition to success screen
    document.getElementById('checkout-form-screen').classList.add('hidden');
    document.getElementById('success-order-id').innerText = oId;
    document.getElementById('success-product-name').innerText = pName;
    document.getElementById('success-amount').innerText = `₹${pPrice.toLocaleString('en-IN')}`;
    document.getElementById('success-address').innerText = address;

    // Customize the success heading based on payment type
    const heading = document.querySelector('#payment-success-screen h3');
    const subtext = document.querySelector('#payment-success-screen p');

    if (paymentMethod === 'UPI') {
      if (heading) heading.innerText = `Payment successfully completed with ₹${pPrice.toLocaleString('en-IN')}`;
      if (subtext) subtext.innerText = 'Thank you for ordering with Raja Aqua. Your online payment has been received and confirmed.';
    } else {
      if (heading) heading.innerText = 'Order Confirmed Successfully!';
      if (subtext) subtext.innerText = `Thank you for ordering with Raja Aqua. Amount due on delivery: ₹${pPrice.toLocaleString('en-IN')}.`;
    }

    // Build pre-filled WhatsApp text
    const waText = encodeURIComponent(`Hello Raja Aqua, I have placed an order!
Order ID: ${oId}
Customer Name: ${name}
Phone Number: ${phone}
Address: ${address}
Product Model: ${pName}
Total Price: ₹${pPrice.toLocaleString('en-IN')}
Payment Method: ${paymentMethod}`);

    // Update WhatsApp links
    const waBtn1 = document.getElementById('whatsapp-notify-btn-1');
    const waBtn2 = document.getElementById('whatsapp-notify-btn-2');
    if (waBtn1) waBtn1.href = `https://wa.me/919791454214?text=${waText}`;
    if (waBtn2) waBtn2.href = `https://wa.me/916385548048?text=${waText}`;

    document.getElementById('payment-success-screen').classList.remove('hidden');
    
    // Clear item from cart
    removeFromCart(productId);
  };

  const completeOrderLocally = () => {
    const storedOrders = localStorage.getItem('raja_aqua_orders') || '[]';
    const ordersList = JSON.parse(storedOrders);
    const newOrder = {
      orderId,
      customerName: name,
      phone,
      address,
      productId: product.id,
      productName: product.name,
      price: product.price,
      paymentMethod,
      orderDate: new Date().toISOString(),
      status: 'Pending'
    };
    ordersList.push(newOrder);
    localStorage.setItem('raja_aqua_orders', JSON.stringify(ordersList));

    displaySuccess(orderId, product.name, product.price);
  };

  if (window.location.protocol === 'file:') {
    completeOrderLocally();
    return;
  }

  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, address, productId, paymentMethod })
    });
    
    if (response.ok) {
      const data = await response.json();
      displaySuccess(data.orderId, data.order.productName, data.order.price);
    } else {
      console.warn('Order request failed on server, processing locally:', response.statusText);
      completeOrderLocally();
    }
  } catch (err) {
    console.warn('Checkout error on server, processing locally:', err);
    completeOrderLocally();
  }
}

function handleInlineOrderSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('order-name').value;
  const phone = document.getElementById('order-phone').value;
  const address = document.getElementById('order-address').value;
  const productId = document.getElementById('order-product-select').value;

  if (!productId) {
    alert('Please select a purifier model.');
    return;
  }

  openCheckout(productId);
  document.getElementById('checkout-name').value = name;
  document.getElementById('checkout-phone').value = phone;
  document.getElementById('checkout-address').value = address;
}

// FAQ Accordion
function initFaqAccordion() {
  const faqHeaders = document.querySelectorAll('.faq-header');
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.parentElement;
      const isActive = parent.classList.contains('active');
      
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });

      if (!isActive) {
        parent.classList.add('active');
      }
    });
  });
}

function handleContactSubmit(e) {
  e.preventDefault();
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = `Sending...`;
  submitBtn.disabled = true;

  setTimeout(() => {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    alert('Thank you for contacting Raja Aqua! S Mohammed Hanif and our engineering team will get in touch with you within 2 hours.');
    e.target.reset();
  }, 1000);
}

// Dark/Light Theme
function toggleTheme() {
  const body = document.body;
  body.classList.toggle('dark-theme');
  const isDark = body.classList.contains('dark-theme');
  localStorage.setItem('raja_aqua_theme', isDark ? 'dark' : 'light');
  
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    if (isDark) {
      btn.innerHTML = `<svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.46 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" clip-rule="evenodd" /></svg>`;
    } else {
      btn.innerHTML = `<svg class="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>`;
    }
  }
}

function loadTheme() {
  const theme = localStorage.getItem('raja_aqua_theme');
  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.innerHTML = `<svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.46 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" clip-rule="evenodd" /></svg>`;
    }
  }
}

// Custom image uploads conversion listener
function initImageUploadListener() {
  const fileInput = document.getElementById('prod-upload-file');
  const editFileInput = document.getElementById('edit-prod-upload-file');
  
  if (fileInput) {
    fileInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
          uploadedImageBase64 = evt.target.result;
          document.getElementById('prod-image').value = '';
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (editFileInput) {
    editFileInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
          uploadedImageBase64 = evt.target.result;
          document.getElementById('edit-prod-image').value = '';
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

// Native Scroll Reveal trigger using IntersectionObserver
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

// Initialise everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    const loader = document.getElementById('preloader');
    if (loader) {
      loader.classList.add('fade-out');
      setTimeout(() => loader.remove(), 450);
    }
  });

  setTimeout(() => {
    const loader = document.getElementById('preloader');
    if (loader) {
      loader.classList.add('fade-out');
      setTimeout(() => loader.remove(), 450);
    }
  }, 2500);

  // Initialize modules
  loadTheme();
  initProducts();
  loadCart();
  populateImageSelectors();
  initFaqAccordion();
  initImageUploadListener();
  initScrollReveal();

  // Initialize Three.js Canvases & Intersection Observers
  initIntersectionObserver();
  initThreeWaves();
  initThreePurifier();

  // GSAP Entrance Animations (Safeguarded in case CDN blocks)
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.hero-animate-title', { opacity: 0, y: 30, duration: 0.8, ease: 'power2.out', delay: 0.3, stagger: 0.1 });
    gsap.from('.hero-animate-sub', { opacity: 0, y: 20, duration: 0.8, ease: 'power2.out', delay: 0.5 });
    gsap.from('.hero-animate-btns', { opacity: 0, y: 15, duration: 0.8, ease: 'power2.out', delay: 0.6 });
    gsap.from('.hero-animate-canvas', { opacity: 0, scale: 0.95, duration: 0.9, ease: 'power1.out', delay: 0.5 });
  }

  // Bind Submit Handlers
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', handleCheckoutSubmit);
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }

  const inlineOrderForm = document.getElementById('inline-order-form');
  if (inlineOrderForm) {
    inlineOrderForm.addEventListener('submit', handleInlineOrderSubmit);
  }

  const addProductForm = document.getElementById('add-product-form');
  if (addProductForm) {
    addProductForm.addEventListener('submit', handleAddProduct);
  }

  const editProductForm = document.getElementById('edit-product-form');
  if (editProductForm) {
    editProductForm.addEventListener('submit', handleEditProduct);
  }
  
  // Sticky Navbar shadow trigger & Active Link Highlighting
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function highlightNavSection() {
    let scrollPos = window.scrollY;
    let activeId = '#home'; // Default fallback
    
    // Scan navbar links to map scroll position to section
    navLinks.forEach(link => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId.indexOf('#') !== 0) return;
      
      const sec = document.querySelector(targetId);
      if (!sec) return;
      
      const top = sec.offsetTop - 180;
      const height = sec.offsetHeight;
      
      if (scrollPos >= top && scrollPos < (top + height)) {
        activeId = targetId;
      }
    });

    // Handle very bottom of the page force contact
    if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
      activeId = '#contact';
    }

    // Toggle active highlights on desktop nav Links
    navLinks.forEach(link => {
      if (link.getAttribute('href') === activeId) {
        link.classList.add('text-brand-sky', 'border-brand-sky');
        link.classList.remove('border-transparent');
      } else {
        link.classList.remove('text-brand-sky', 'border-brand-sky');
        link.classList.add('border-transparent');
      }
    });

    // Toggle active highlights on mobile menu Links
    mobileNavLinks.forEach(link => {
      if (link.getAttribute('href') === activeId) {
        link.classList.add('text-brand-sky', 'border-l-4', 'border-brand-sky', 'bg-sky-500/5', 'dark:bg-sky-950/10', 'pl-2');
        link.classList.remove('pl-3', 'px-3');
        link.classList.add('pr-3');
      } else {
        link.classList.remove('text-brand-sky', 'border-l-4', 'border-brand-sky', 'bg-sky-500/5', 'dark:bg-sky-950/10', 'pl-2', 'pr-3');
        link.classList.add('px-3');
      }
    });
  }

  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 40) {
      nav.classList.add('shadow-md', 'py-2.5');
      nav.classList.remove('py-5');
    } else {
      nav.classList.remove('shadow-md', 'py-2.5');
      nav.classList.add('py-5');
    }
    highlightNavSection();
  });

  highlightNavSection();
});
