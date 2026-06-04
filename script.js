/* ===========================================
   照片墙 - JavaScript
   =========================================== */

// ---------- 照片数据 ----------
// 🖼️ 在这里替换为你自己的图片链接！
const photos = [
    {
        id: 1,
        src: 'https://picsum.photos/id/1015/600/800',
        title: '山间小路',
        tag: 'nature'
    },
    {
        id: 2,
        src: 'https://picsum.photos/id/1018/600/500',
        title: '暮色山峦',
        tag: 'nature'
    },
    {
        id: 3,
        src: 'https://picsum.photos/id/1019/600/700',
        title: '海天一色',
        tag: 'nature'
    },
    {
        id: 4,
        src: 'https://picsum.photos/id/1024/600/600',
        title: '城市鸟瞰',
        tag: 'city'
    },
    {
        id: 5,
        src: 'https://picsum.photos/id/1025/600/450',
        title: '林间小景',
        tag: 'nature'
    },
    {
        id: 6,
        src: 'https://picsum.photos/id/1035/600/800',
        title: '黑白写意',
        tag: 'people'
    },
    {
        id: 7,
        src: 'https://picsum.photos/id/1039/600/550',
        title: '海边礁石',
        tag: 'nature'
    },
    {
        id: 8,
        src: 'https://picsum.photos/id/1043/600/900',
        title: '水边静物',
        tag: 'nature'
    },
    {
        id: 9,
        src: 'https://picsum.photos/id/1044/600/650',
        title: '湖畔倒影',
        tag: 'nature'
    },
    {
        id: 10,
        src: 'https://picsum.photos/id/106/600/500',
        title: '城市街角',
        tag: 'city'
    },
    {
        id: 11,
        src: 'https://picsum.photos/id/107/600/750',
        title: '麦田守望',
        tag: 'nature'
    },
    {
        id: 12,
        src: 'https://picsum.photos/id/1084/600/850',
        title: '冬日暖阳',
        tag: 'nature'
    },
    {
        id: 13,
        src: 'https://picsum.photos/id/117/600/600',
        title: '小镇风光',
        tag: 'city'
    },
    {
        id: 14,
        src: 'https://picsum.photos/id/145/600/480',
        title: '林间光影',
        tag: 'nature'
    },
    {
        id: 15,
        src: 'https://picsum.photos/id/157/600/700',
        title: '静谧时刻',
        tag: 'people'
    },
    {
        id: 16,
        src: 'https://picsum.photos/id/169/600/550',
        title: '空中俯瞰',
        tag: 'city'
    },
    {
        id: 17,
        src: 'https://picsum.photos/id/177/600/800',
        title: '城市夜景',
        tag: 'city'
    },
    {
        id: 18,
        src: 'https://picsum.photos/id/180/600/620',
        title: '自然之美',
        tag: 'nature'
    },
    {
        id: 19,
        src: 'https://picsum.photos/id/20/600/900',
        title: '悠然时光',
        tag: 'people'
    },
    {
        id: 20,
        src: 'https://picsum.photos/id/219/600/500',
        title: '雨后清新',
        tag: 'nature'
    },
    {
        id: 21,
        src: 'https://picsum.photos/id/237/600/700',
        title: '萌宠时刻',
        tag: 'animal'
    },
    {
        id: 22,
        src: 'https://picsum.photos/id/238/600/600',
        title: '城市建筑',
        tag: 'city'
    },
    {
        id: 23,
        src: 'https://picsum.photos/id/248/600/800',
        title: '自然野趣',
        tag: 'animal'
    },
    {
        id: 24,
        src: 'https://picsum.photos/id/250/600/550',
        title: '黄昏剪影',
        tag: 'city'
    }
];

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
