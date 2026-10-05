/**
 * app.js - Logika Interaktif & State Management Blog Studi Kasus Alpro C++
 */

const STORAGE_KEY = "alpro_cpp_cases_data";
const THEME_KEY = "alpro_theme_mode";

// State
let casesData = [];
let currentCategory = "Semua";
let currentDifficulty = "Semua";
let searchQuery = "";
let currentDetailId = null;

// DOM Elements
const casesGrid = document.getElementById("casesGrid");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const categoryFilterContainer = document.getElementById("categoryFilterContainer");
const difficultyFilter = document.getElementById("difficultyFilter");
const statTotalCases = document.getElementById("statTotalCases");
const statCategories = document.getElementById("statCategories");
const themeToggleBtn = document.getElementById("themeToggleBtn");
const themeIcon = document.getElementById("themeIcon");

// Modal Elements
const caseDetailModalEl = document.getElementById("caseDetailModal");
let caseDetailModal;
const caseFormModalEl = document.getElementById("caseFormModal");
let caseFormModal;

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  loadData();
  setupEventListeners();
  renderCategories();
  renderCases();
  updateStats();

  if (caseDetailModalEl) caseDetailModal = new bootstrap.Modal(caseDetailModalEl);
  if (caseFormModalEl) caseFormModal = new bootstrap.Modal(caseFormModalEl);
});

/* ==========================================================
   THEME TOGGLER (DARK / LIGHT)
   ========================================================== */
function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || 
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  setTheme(savedTheme);
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-bs-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
  if (themeIcon) {
    if (theme === "dark") {
      themeIcon.className = "bi bi-sun-fill text-warning";
    } else {
      themeIcon.className = "bi bi-moon-stars-fill text-primary";
    }
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-bs-theme") || "light";
  const target = current === "dark" ? "light" : "dark";
  setTheme(target);
}

/* ==========================================================
   DATA STORAGE & LOCALSTORAGE HANDLING
   ========================================================== */
function loadData() {
  const localData = localStorage.getItem(STORAGE_KEY);
  if (localData) {
    try {
      casesData = JSON.parse(localData);
    } catch (e) {
      console.error("Gagal membaca LocalStorage, memuat data default:", e);
      casesData = [...INITIAL_CASES];
      saveData();
    }
  } else {
    casesData = [...INITIAL_CASES];
    saveData();
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(casesData));
  updateStats();
}

function resetToDefault() {
  Swal.fire({
    title: "Reset ke Data Awal?",
    text: "Semua penambahan atau perubahan kasus yang Anda buat akan dikembalikan ke data default bawaan UTS.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Ya, Reset!",
    cancelButtonText: "Batal"
  }).then((result) => {
    if (result.isConfirmed) {
      casesData = [...INITIAL_CASES];
      saveData();
      renderCategories();
      renderCases();
      Swal.fire("Berhasil!", "Data studi kasus berhasil dikembalikan ke default.", "success");
    }
  });
}

/* ==========================================================
   STATS CALCULATION
   ========================================================== */
function updateStats() {
  if (statTotalCases) statTotalCases.textContent = casesData.length;
  if (statCategories) {
    const cats = new Set(casesData.map(c => c.category));
    statCategories.textContent = cats.size;
  }
}

/* ==========================================================
   CATEGORY & FILTER PILLS
   ========================================================== */
function renderCategories() {
  if (!categoryFilterContainer) return;
  const categories = ["Semua", ...new Set(casesData.map(c => c.category))];
  
  categoryFilterContainer.innerHTML = categories.map(cat => `
    <button type="button" class="btn btn-outline-secondary category-btn ${cat === currentCategory ? 'active' : ''}" 
      onclick="setCategoryFilter('${cat}')">
      ${cat}
    </button>
  `).join("");
}

function setCategoryFilter(category) {
  currentCategory = category;
  renderCategories();
  renderCases();
}

/* ==========================================================
   RENDER STUDY CASE CARDS
   ========================================================== */
function renderCases() {
  if (!casesGrid) return;

  const query = searchQuery.trim().toLowerCase();
  const filtered = casesData.filter(item => {
    // Category filter
    const matchCategory = currentCategory === "Semua" || item.category === currentCategory;
    
    // Difficulty filter
    const matchDifficulty = currentDifficulty === "Semua" || item.difficulty === currentDifficulty;
    
    // Search filter (title, summary, tags, problemStatement, cppCode)
    const matchSearch = query === "" || 
      item.title.toLowerCase().includes(query) ||
      item.summary.toLowerCase().includes(query) ||
      item.problemStatement.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.tags.some(t => t.toLowerCase().includes(query)) ||
      item.cppCode.toLowerCase().includes(query);

    return matchCategory && matchDifficulty && matchSearch;
  });

  if (filtered.length === 0) {
    casesGrid.innerHTML = "";
    emptyState.classList.remove("d-none");
    return;
  }

  emptyState.classList.add("d-none");
  casesGrid.innerHTML = filtered.map(item => {
    const diffBadgeClass = getDifficultyClass(item.difficulty);
    const tagsHtml = item.tags.map(t => `<span class="tag-badge">#${escapeHtml(t)}</span>`).join("");
    
    return `
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="card case-card shadow-sm">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-2.5 py-1">
                <i class="bi bi-folder2 me-1"></i>${escapeHtml(item.category)}
              </span>
              <span class="badge ${diffBadgeClass} rounded-pill px-2.5 py-1">
                ${escapeHtml(item.difficulty)}
              </span>
            </div>

            <h5 class="case-title" role="button" onclick="openDetailModal('${item.id}')">
              ${escapeHtml(item.title)}
            </h5>

            <p class="case-summary">
              ${escapeHtml(item.summary)}
            </p>

            <div class="case-tags-container">
              ${tagsHtml}
            </div>

            <div class="d-flex justify-content-between align-items-center pt-2 border-top">
              <small class="text-body-secondary">
                <i class="bi bi-clock me-1"></i>${item.date || "2026-10-05"}
              </small>
              <button class="btn btn-sm btn-outline-primary rounded-pill px-3" onclick="openDetailModal('${item.id}')">
                Lihat Solusi <i class="bi bi-arrow-right ms-1"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function getDifficultyClass(diff) {
  switch (diff?.toLowerCase()) {
    case "mudah": return "badge-diff-mudah";
    case "menengah": return "badge-diff-menengah";
    case "sulit": return "badge-diff-sulit";
    default: return "bg-secondary text-white";
  }
}

/* ==========================================================
   DETAIL MODAL VIEW & SYNTAX HIGHLIGHTING
   ========================================================== */
function openDetailModal(id) {
  const item = casesData.find(c => c.id === id);
  if (!item) return;

  currentDetailId = id;

  document.getElementById("detailModalTitle").textContent = item.title;
  document.getElementById("detailCategory").textContent = item.category;
  
  const diffBadge = document.getElementById("detailDifficulty");
  diffBadge.textContent = item.difficulty;
  diffBadge.className = `badge ${getDifficultyClass(item.difficulty)} rounded-pill px-3 py-1.5`;

  document.getElementById("detailAuthor").textContent = item.author || "Anonim";
  document.getElementById("detailDate").textContent = item.date || "-";

  document.getElementById("detailProblemStatement").textContent = item.problemStatement;
  document.getElementById("detailInputFormat").textContent = item.inputFormat || "-";
  document.getElementById("detailOutputFormat").textContent = item.outputFormat || "-";
  document.getElementById("detailPseudocode").textContent = item.pseudocode || "// Tidak ada pseudocode";

  const codeEl = document.getElementById("detailCppCode");
  codeEl.textContent = item.cppCode;

  const outputEl = document.getElementById("detailSampleOutput");
  outputEl.textContent = item.sampleOutput || "[Tidak ada contoh output]";

  // Detail Tags
  const tagsContainer = document.getElementById("detailTags");
  tagsContainer.innerHTML = item.tags.map(t => `<span class="tag-badge me-1">#${escapeHtml(t)}</span>`).join("");

  caseDetailModal.show();

  // Highlight syntax with Prism
  setTimeout(() => {
    if (window.Prism) {
      Prism.highlightElement(codeEl);
    }
  }, 150);
}

/* ==========================================================
   COPY CODE BUTTON
   ========================================================== */
function copyCppCode() {
  const codeEl = document.getElementById("detailCppCode");
  if (!codeEl) return;
  const text = codeEl.textContent;

  navigator.clipboard.writeText(text).then(() => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Kode C++ disalin ke clipboard!',
      showConfirmButton: false,
      timer: 2000
    });
  }).catch(err => {
    console.error("Gagal menyalin kode:", err);
  });
}

/* ==========================================================
   FORM TAMBAH & EDIT STUDI KASUS
   ========================================================== */
function openAddCaseModal() {
  currentDetailId = null;
  document.getElementById("caseFormModalTitle").innerHTML = '<i class="bi bi-plus-circle me-2 text-primary"></i>Tambah Studi Kasus Baru';
  document.getElementById("caseForm").reset();
  document.getElementById("formCaseId").value = "";
  caseFormModal.show();
}

function openEditCaseModal() {
  if (!currentDetailId) return;
  const item = casesData.find(c => c.id === currentDetailId);
  if (!item) return;

  caseDetailModal.hide();

  document.getElementById("caseFormModalTitle").innerHTML = '<i class="bi bi-pencil-square me-2 text-warning"></i>Edit Studi Kasus';
  document.getElementById("formCaseId").value = item.id;
  document.getElementById("formTitle").value = item.title;
  document.getElementById("formCategory").value = item.category;
  document.getElementById("formDifficulty").value = item.difficulty;
  document.getElementById("formTags").value = item.tags.join(", ");
  document.getElementById("formSummary").value = item.summary;
  document.getElementById("formProblemStatement").value = item.problemStatement;
  document.getElementById("formInputFormat").value = item.inputFormat || "";
  document.getElementById("formOutputFormat").value = item.outputFormat || "";
  document.getElementById("formPseudocode").value = item.pseudocode || "";
  document.getElementById("formCppCode").value = item.cppCode;
  document.getElementById("formSampleOutput").value = item.sampleOutput || "";

  caseFormModal.show();
}

function handleSaveCase(e) {
  e.preventDefault();

  const id = document.getElementById("formCaseId").value.trim();
  const title = document.getElementById("formTitle").value.trim();
  const category = document.getElementById("formCategory").value.trim();
  const difficulty = document.getElementById("formDifficulty").value;
  const tagsStr = document.getElementById("formTags").value.trim();
  const summary = document.getElementById("formSummary").value.trim();
  const problemStatement = document.getElementById("formProblemStatement").value.trim();
  const inputFormat = document.getElementById("formInputFormat").value.trim();
  const outputFormat = document.getElementById("formOutputFormat").value.trim();
  const pseudocode = document.getElementById("formPseudocode").value.trim();
  const cppCode = document.getElementById("formCppCode").value.trim();
  const sampleOutput = document.getElementById("formSampleOutput").value.trim();

  const tags = tagsStr ? tagsStr.split(",").map(t => t.trim().toLowerCase()).filter(Boolean) : ["cpp"];

  if (id) {
    // Update existing
    const index = casesData.findIndex(c => c.id === id);
    if (index !== -1) {
      casesData[index] = {
        ...casesData[index],
        title, category, difficulty, tags, summary,
        problemStatement, inputFormat, outputFormat,
        pseudocode, cppCode, sampleOutput
      };
    }
  } else {
    // Create new
    const newId = "case-" + Date.now().toString(36);
    const newCase = {
      id: newId,
      title,
      category,
      difficulty,
      tags,
      author: "Mahasiswa Alpro",
      date: new Date().toISOString().split("T")[0],
      summary,
      problemStatement,
      inputFormat,
      outputFormat,
      pseudocode,
      cppCode,
      sampleOutput
    };
    casesData.unshift(newCase);
  }

  saveData();
  renderCategories();
  renderCases();
  caseFormModal.hide();

  Swal.fire({
    icon: 'success',
    title: id ? 'Kasus berhasil diperbarui!' : 'Studi kasus baru berhasil ditambahkan!',
    timer: 2000,
    showConfirmButton: false
  });
}

function deleteCurrentCase() {
  if (!currentDetailId) return;

  Swal.fire({
    title: 'Hapus Studi Kasus ini?',
    text: 'Data yang dihapus tidak dapat dipulihkan!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#64748b',
    confirmButtonText: 'Ya, Hapus!',
    cancelButtonText: 'Batal'
  }).then((result) => {
    if (result.isConfirmed) {
      casesData = casesData.filter(c => c.id !== currentDetailId);
      saveData();
      renderCategories();
      renderCases();
      caseDetailModal.hide();
      Swal.fire('Terhapus!', 'Studi kasus telah dihapus dari repositori.', 'success');
    }
  });
}

/* ==========================================================
   EXPORT & IMPORT DATA JSON
   ========================================================= */
function exportDataJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(casesData, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `alpro_cpp_cases_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();

  Swal.fire({
    icon: 'success',
    title: 'Berhasil Diekspor!',
    text: 'File JSON studi kasus Anda telah diunduh.',
    timer: 2000,
    showConfirmButton: false
  });
}

function triggerImportJSON() {
  document.getElementById("importFileInput").click();
}

function handleFileImport(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        casesData = imported;
        saveData();
        renderCategories();
        renderCases();
        Swal.fire('Sukses!', `Berhasil mengimpor ${imported.length} studi kasus.`, 'success');
      } else {
        throw new Error("Format JSON harus berupa Array objek studi kasus.");
      }
    } catch (err) {
      Swal.fire('Gagal Impor', 'File JSON tidak valid atau struktur tidak cocok: ' + err.message, 'error');
    }
  };
  reader.readAsText(file);
  event.target.value = ""; // Reset file input
}

/* ==========================================================
   EVENT LISTENERS SETUP
   ========================================================== */
function setupEventListeners() {
  // Theme toggle
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
  }

  // Search input live filtering
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderCases();
    });
  }

  // Difficulty dropdown filter
  if (difficultyFilter) {
    difficultyFilter.addEventListener("change", (e) => {
      currentDifficulty = e.target.value;
      renderCases();
    });
  }

  // Case form submit
  const caseForm = document.getElementById("caseForm");
  if (caseForm) {
    caseForm.addEventListener("submit", handleSaveCase);
  }

  // Import file input
  const importInput = document.getElementById("importFileInput");
  if (importInput) {
    importInput.addEventListener("change", handleFileImport);
  }
}

// Utility: Escape HTML to avoid XSS
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
