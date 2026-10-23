/**
 * ALPRO C++ Blog Application Logic
 * Menangani rendering kartu, pencarian & filter, modal detail, CRUD LocalStorage,
 * copy-to-clipboard, dan dark mode switcher.
 */

// Key untuk LocalStorage
const STORAGE_KEY = 'alpro_cpp_case_studies';
const THEME_KEY = 'alpro_theme_mode';

// State aplikasi
let caseStudies = [];
let currentCategory = 'all';
let currentLevel = 'all';
let searchQuery = '';

// Inisialisasi saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadCaseStudies();
    setupEventListeners();
    renderCategories();
    renderCaseStudies();
    updateStats();
});

// ================= THEME TOGGLE (DARK / LIGHT) =================
function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    applyTheme(savedTheme);

    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem(THEME_KEY, newTheme);
        });
    }
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    const icon = document.getElementById('themeIcon');
    if (icon) {
        if (theme === 'dark') {
            icon.classList.remove('bi-moon-stars-fill');
            icon.classList.add('bi-sun-fill');
        } else {
            icon.classList.remove('bi-sun-fill');
            icon.classList.add('bi-moon-stars-fill');
        }
    }
}

// ================= LOAD & SAVE DATA =================
function loadCaseStudies() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
        try {
            caseStudies = JSON.parse(data);
        } catch (e) {
            console.error('Gagal membaca data dari LocalStorage:', e);
            caseStudies = [...DEFAULT_CASE_STUDIES];
        }
    } else {
        caseStudies = [...DEFAULT_CASE_STUDIES];
        saveCaseStudies();
    }
}

function saveCaseStudies() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(caseStudies));
}

// ================= RENDERING =================
function updateStats() {
    const totalCountEl = document.getElementById('totalStudiesCount');
    const categoriesCountEl = document.getElementById('totalCategoriesCount');
    const easyCountEl = document.getElementById('easyCount');
    const mediumCountEl = document.getElementById('mediumCount');
    const hardCountEl = document.getElementById('hardCount');

    if (totalCountEl) totalCountEl.textContent = caseStudies.length;

    const uniqueCategories = new Set(caseStudies.map(item => item.category));
    if (categoriesCountEl) categoriesCountEl.textContent = uniqueCategories.size;

    if (easyCountEl) easyCountEl.textContent = caseStudies.filter(c => c.level === 'Mudah').length;
    if (mediumCountEl) mediumCountEl.textContent = caseStudies.filter(c => c.level === 'Menengah').length;
    if (hardCountEl) hardCountEl.textContent = caseStudies.filter(c => c.level === 'Lanjutan').length;
}

function renderCategories() {
    const categoryContainer = document.getElementById('categoryFilters');
    if (!categoryContainer) return;

    const categories = ['all', ...new Set(caseStudies.map(c => c.category))];

    categoryContainer.innerHTML = categories.map(cat => {
        const label = cat === 'all' ? 'Semua Kategori' : cat;
        const activeClass = cat === currentCategory ? 'active' : '';
        return `
            <button class="badge rounded-pill bg-light text-dark p-2 px-3 category-pill ${activeClass}" 
                    data-category="${cat}">
                ${label}
            </button>
        `;
    }).join('');

    // Event listener untuk kategori filter
    categoryContainer.querySelectorAll('.category-pill').forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentCategory = e.currentTarget.getAttribute('data-category');
            renderCategories();
            renderCaseStudies();
        });
    });
}

function renderCaseStudies() {
    const container = document.getElementById('casesContainer');
    const emptyState = document.getElementById('emptyState');
    if (!container) return;

    // Filter data
    const filtered = caseStudies.filter(item => {
        const matchCategory = currentCategory === 'all' || item.category === currentCategory;
        const matchLevel = currentLevel === 'all' || item.level === currentLevel;
        
        const q = searchQuery.toLowerCase().trim();
        const matchSearch = !q || (
            item.title.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q) ||
            (item.tags && item.tags.some(t => t.toLowerCase().includes(q))) ||
            item.code.toLowerCase().includes(q)
        );

        return matchCategory && matchLevel && matchSearch;
    });

    if (filtered.length === 0) {
        container.innerHTML = '';
        if (emptyState) emptyState.classList.remove('d-none');
        return;
    }

    if (emptyState) emptyState.classList.add('d-none');

    container.innerHTML = filtered.map(item => {
        const levelBadgeClass = getLevelBadgeClass(item.level);
        const tagsHtml = (item.tags || []).map(t => 
            `<span class="badge bg-secondary-subtle text-secondary-emphasis me-1 mb-1">#${escapeHtml(t)}</span>`
        ).join('');

        return `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="card h-100 case-card shadow-sm">
                <div class="card-header-badge"></div>
                <div class="card-body d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="badge bg-primary-subtle text-primary fw-medium px-2 py-1">
                            <i class="bi bi-folder2-open me-1"></i>${escapeHtml(item.category)}
                        </span>
                        <span class="badge ${levelBadgeClass} fw-normal">
                            ${escapeHtml(item.level)}
                        </span>
                    </div>

                    <h5 class="card-title fw-bold text-truncate-2 mt-1 mb-2">
                        ${escapeHtml(item.title)}
                    </h5>

                    <p class="card-text text-muted small flex-grow-1">
                        ${escapeHtml(item.description)}
                    </p>

                    <div class="mb-3">
                        ${tagsHtml}
                    </div>

                    <div class="d-flex justify-content-between align-items-center pt-2 border-top">
                        <span class="text-secondary small">
                            <i class="bi bi-calendar3 me-1"></i>${item.date || 'Terbaru'}
                        </span>
                        <div class="btn-group">
                            <button class="btn btn-outline-primary btn-sm rounded-pill px-3" 
                                    onclick="openDetailModal('${item.id}')">
                                <i class="bi bi-book-half me-1"></i>Pelajari
                            </button>
                            <button class="btn btn-outline-secondary btn-sm rounded-pill ms-1" 
                                    title="Edit Kasus" 
                                    onclick="openEditModal('${item.id}')">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button class="btn btn-outline-danger btn-sm rounded-pill ms-1" 
                                    title="Hapus Kasus" 
                                    onclick="deleteCaseStudy('${item.id}')">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }).join('');
}

function getLevelBadgeClass(level) {
    switch (level) {
        case 'Mudah': return 'bg-success-subtle text-success border border-success-subtle';
        case 'Menengah': return 'bg-warning-subtle text-warning-emphasis border border-warning-subtle';
        case 'Lanjutan': return 'bg-danger-subtle text-danger border border-danger-subtle';
        default: return 'bg-info-subtle text-info';
    }
}

// ================= MODAL DETAIL =================
window.openDetailModal = function(id) {
    const item = caseStudies.find(c => c.id === id);
    if (!item) return;

    document.getElementById('modalDetailTitle').textContent = item.title;
    document.getElementById('modalDetailCategory').textContent = item.category;
    document.getElementById('modalDetailLevel').textContent = item.level;
    document.getElementById('modalDetailLevel').className = `badge ${getLevelBadgeClass(item.level)}`;
    document.getElementById('modalDetailDate').textContent = item.date;
    document.getElementById('modalDetailAuthor').textContent = item.author || 'Mahasiswa Alpro';
    document.getElementById('modalDetailProblem').textContent = item.problem || item.description;

    // Algoritma / Pseudocode
    const algoContainer = document.getElementById('modalDetailAlgorithm');
    if (Array.isArray(item.algorithm) && item.algorithm.length > 0) {
        algoContainer.innerHTML = `
            <ol class="list-group list-group-numbered mb-0">
                ${item.algorithm.map(step => `<li class="list-group-item bg-transparent">${escapeHtml(step.replace(/^\d+\.\s*/, ''))}</li>`).join('')}
            </ol>
        `;
    } else {
        algoContainer.innerHTML = `<p class="text-muted fst-italic">Langkah algoritma belum didefinisikan.</p>`;
    }

    // Source Code C++
    const codeEl = document.getElementById('modalDetailCode');
    codeEl.textContent = item.code || '// Kode C++ belum tersedia';
    
    // Trigger Prism highlighting jika tersedia
    if (window.Prism) {
        Prism.highlightElement(codeEl);
    }

    // Penjelasan
    document.getElementById('modalDetailExplanation').textContent = item.explanation || 'Tidak ada penjelasan khusus.';

    // Terminal Sample I/O
    document.getElementById('modalDetailInput').textContent = item.sampleInput || 'Tidak ada data input spesifik.';
    document.getElementById('modalDetailOutput').textContent = item.sampleOutput || 'Output program berhasil dieksekusi.';

    // Modal instance
    const detailModal = new bootstrap.Modal(document.getElementById('detailModal'));
    detailModal.show();
};

// ================= COPY CODE =================
window.copyDetailCode = function() {
    const codeEl = document.getElementById('modalDetailCode');
    if (!codeEl) return;
    navigator.clipboard.writeText(codeEl.textContent).then(() => {
        showToast('Berhasil!', 'Kode C++ disalin ke clipboard.', 'success');
    }).catch(err => {
        showToast('Gagal', 'Tidak dapat menyalin kode.', 'danger');
    });
};

// ================= CRUD (TAMBAH / EDIT / HAPUS) =================
window.openAddModal = function() {
    document.getElementById('caseForm').reset();
    document.getElementById('caseId').value = '';
    document.getElementById('caseModalLabel').innerHTML = '<i class="bi bi-plus-circle me-2"></i>Tambah Studi Kasus Baru';
    
    const caseModal = new bootstrap.Modal(document.getElementById('caseModal'));
    caseModal.show();
};

window.openEditModal = function(id) {
    const item = caseStudies.find(c => c.id === id);
    if (!item) return;

    document.getElementById('caseId').value = item.id;
    document.getElementById('inputTitle').value = item.title;
    document.getElementById('inputCategory').value = item.category;
    document.getElementById('inputLevel').value = item.level;
    document.getElementById('inputAuthor').value = item.author || '';
    document.getElementById('inputDescription').value = item.description;
    document.getElementById('inputProblem').value = item.problem || '';
    document.getElementById('inputAlgorithm').value = Array.isArray(item.algorithm) ? item.algorithm.join('\n') : (item.algorithm || '');
    document.getElementById('inputCode').value = item.code || '';
    document.getElementById('inputExplanation').value = item.explanation || '';
    document.getElementById('inputSampleInput').value = item.sampleInput || '';
    document.getElementById('inputSampleOutput').value = item.sampleOutput || '';
    document.getElementById('inputTags').value = (item.tags || []).join(', ');

    document.getElementById('caseModalLabel').innerHTML = '<i class="bi bi-pencil-square me-2"></i>Edit Studi Kasus';
    
    const caseModal = new bootstrap.Modal(document.getElementById('caseModal'));
    caseModal.show();
};

window.saveCaseForm = function(event) {
    event.preventDefault();

    const id = document.getElementById('caseId').value;
    const title = document.getElementById('inputTitle').value.trim();
    const category = document.getElementById('inputCategory').value.trim();
    const level = document.getElementById('inputLevel').value;
    const author = document.getElementById('inputAuthor').value.trim() || 'Mahasiswa Alpro';
    const description = document.getElementById('inputDescription').value.trim();
    const problem = document.getElementById('inputProblem').value.trim();
    const algoRaw = document.getElementById('inputAlgorithm').value.trim();
    const code = document.getElementById('inputCode').value.trim();
    const explanation = document.getElementById('inputExplanation').value.trim();
    const sampleInput = document.getElementById('inputSampleInput').value.trim();
    const sampleOutput = document.getElementById('inputSampleOutput').value.trim();
    const tagsRaw = document.getElementById('inputTags').value.trim();

    if (!title || !category || !code) {
        showToast('Peringatan', 'Judul, Kategori, dan Kode C++ wajib diisi!', 'warning');
        return;
    }

    const algorithm = algoRaw ? algoRaw.split('\n').map(s => s.trim()).filter(Boolean) : [];
    const tags = tagsRaw ? tagsRaw.split(',').map(s => s.trim()).filter(Boolean) : ['C++', category];

    const today = new Date().toISOString().split('T')[0];

    if (id) {
        // Edit existing
        const idx = caseStudies.findIndex(c => c.id === id);
        if (idx !== -1) {
            caseStudies[idx] = {
                ...caseStudies[idx],
                title,
                category,
                level,
                author,
                description,
                problem,
                algorithm,
                code,
                explanation,
                sampleInput,
                sampleOutput,
                tags
            };
            showToast('Sukses', 'Studi kasus berhasil diperbarui!', 'success');
        }
    } else {
        // Create new
        const newCase = {
            id: 'kasus-' + Date.now(),
            title,
            category,
            level,
            date: today,
            author,
            description,
            problem,
            algorithm,
            code,
            explanation,
            sampleInput,
            sampleOutput,
            tags
        };
        caseStudies.unshift(newCase);
        showToast('Sukses', 'Studi kasus baru berhasil ditambahkan!', 'success');
    }

    saveCaseStudies();
    renderCategories();
    renderCaseStudies();
    updateStats();

    // Close modal
    const modalEl = document.getElementById('caseModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();
};

window.deleteCaseStudy = function(id) {
    const item = caseStudies.find(c => c.id === id);
    if (!item) return;

    if (confirm(`Apakah Anda yakin ingin menghapus studi kasus "${item.title}"?`)) {
        caseStudies = caseStudies.filter(c => c.id !== id);
        saveCaseStudies();
        renderCategories();
        renderCaseStudies();
        updateStats();
        showToast('Dihapus', 'Studi kasus berhasil dihapus.', 'info');
    }
};

window.resetToDefault = function() {
    if (confirm('Kembalikan semua data ke contoh bawaan awal? Data baru Anda akan ditimpa.')) {
        caseStudies = [...DEFAULT_CASE_STUDIES];
        saveCaseStudies();
        renderCategories();
        renderCaseStudies();
        updateStats();
        showToast('Reset Berhasil', 'Data dikembalikan ke pengaturan awal.', 'success');
    }
};

// ================= EXPORT & IMPORT =================
window.exportDataJSON = function() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(caseStudies, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `studi-kasus-alpro-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Export Berhasil', 'File JSON studi kasus berhasil diunduh.', 'success');
};

window.importDataJSON = function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            if (Array.isArray(imported)) {
                caseStudies = imported;
                saveCaseStudies();
                renderCategories();
                renderCaseStudies();
                updateStats();
                showToast('Import Berhasil', `${imported.length} studi kasus berhasil diimpor!`, 'success');
            } else {
                throw new Error('Format JSON tidak valid!');
            }
        } catch (err) {
            showToast('Gagal Import', 'Format file JSON tidak cocok.', 'danger');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
};

// ================= EVENT LISTENERS =================
function setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderCaseStudies();
        });
    }

    // Level filter dropdown
    const levelFilter = document.getElementById('levelFilter');
    if (levelFilter) {
        levelFilter.addEventListener('change', (e) => {
            currentLevel = e.target.value;
            renderCaseStudies();
        });
    }

    // Form submit
    const caseForm = document.getElementById('caseForm');
    if (caseForm) {
        caseForm.addEventListener('submit', window.saveCaseForm);
    }
}

// ================= TOAST NOTIFICATION =================
function showToast(title, message, type = 'info') {
    const toastEl = document.getElementById('liveToast');
    if (!toastEl) return;

    const toastTitle = document.getElementById('toastTitle');
    const toastBody = document.getElementById('toastBody');
    const toastIcon = document.getElementById('toastIcon');

    if (toastTitle) toastTitle.textContent = title;
    if (toastBody) toastBody.textContent = message;

    if (toastIcon) {
        toastIcon.className = 'bi me-2';
        if (type === 'success') toastIcon.classList.add('bi-check-circle-fill', 'text-success');
        else if (type === 'danger') toastIcon.classList.add('bi-x-circle-fill', 'text-danger');
        else if (type === 'warning') toastIcon.classList.add('bi-exclamation-triangle-fill', 'text-warning');
        else toastIcon.classList.add('bi-info-circle-fill', 'text-primary');
    }

    const toast = new bootstrap.Toast(toastEl, { delay: 3500 });
    toast.show();
}

// Helper utility
function escapeHtml(text) {
    if (!text) return '';
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
