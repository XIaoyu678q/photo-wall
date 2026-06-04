/* ===========================================
   照片墙 - JavaScript
   =========================================== */

// ---------- 照片数据 ----------
// 🖼️ 把你的照片放在 images/ 文件夹里，命名 1.jpg, 2.jpg ...
const photos = [];
for (let i = 1; i <= 33; i++) {
    photos.push({
        id: i,
        src: `images/${i}.jpg`,
        title: `照片 ${i}`,
        tag: 'nature'
    });
}

// ---------- DOM 引用 ----------
const grid = document.getElementById('gallery-grid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxCounter = document.getElementById('lightbox-counter');
const filterBtns = document.querySelectorAll('.filter-btn');

let currentFilter = 'all';
let currentIndex = 0;
let filteredPhotos = [];

// ---------- 渲染照片墙 ----------
function renderPhotos(filter = 'all') {
    // 筛选
    filteredPhotos = filter === 'all'
        ? [...photos]
        : photos.filter(p => p.tag === filter);

    // 清空网格
    grid.innerHTML = '';

    // 生成卡片
    filteredPhotos.forEach((photo, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.style.animationDelay = `${index * 0.05}s`;
        item.innerHTML = `
            <img src="${photo.src}" alt="${photo.title}" loading="lazy">
            <div class="overlay">
                <div class="photo-title">${photo.title}</div>
                <span class="photo-tag">${getTagLabel(photo.tag)}</span>
            </div>
        `;
        item.addEventListener('click', () => openLightbox(index));
        grid.appendChild(item);
    });
}

// ---------- 标签显示名称 ----------
function getTagLabel(tag) {
    const map = { nature: '🌿 自然', city: '🏙️ 城市', people: '👤 人物', animal: '🐾 动物' };
    return map[tag] || tag;
}

// ---------- Lightbox ----------
function openLightbox(index) {
    currentIndex = index;
    const photo = filteredPhotos[index];
    lightboxImg.src = photo.src;
    lightboxImg.alt = photo.title;
    lightboxTitle.textContent = `${photo.title} · ${getTagLabel(photo.tag)}`;
    lightboxCounter.textContent = `${index + 1} / ${filteredPhotos.length}`;
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('show');
    document.body.style.overflow = '';
}

function prevPhoto() {
    currentIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    openLightbox(currentIndex);
}

function nextPhoto() {
    currentIndex = (currentIndex + 1) % filteredPhotos.length;
    openLightbox(currentIndex);
}

// ---------- 事件绑定 ----------

// 筛选按钮
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderPhotos(currentFilter);
    });
});

// 关闭 lightbox
document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
document.querySelector('.lightbox-prev').addEventListener('click', prevPhoto);
document.querySelector('.lightbox-next').addEventListener('click', nextPhoto);

// 点击遮罩关闭
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// 键盘导航
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('show')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevPhoto();
    if (e.key === 'ArrowRight') nextPhoto();
});

// ---------- 启动 ----------
renderPhotos('all');
