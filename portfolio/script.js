

/*========== menu icon navbar ==========*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};


/*========== scroll sections active link ==========*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document
                    .querySelector('header nav a[href*=' + id + ']')
                    .classList.add('active');
            });
        }
    });

    /*========== sticky navbar ==========*/
    let header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /*========== remove menu icon navbar when click navbar link (scroll) ==========*/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};


/*========== swiper ==========*/
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 50,
    loop: true,
    grabCursor: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});


/*========== dark light mode + localStorage ==========*/
const THEME_STORAGE_KEY = 'portfolioTheme';
let darkModeIcon = document.querySelector('#darkMode-icon');

function saveThemeToStorage(isDark) {
    try {
        localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
    } catch (e) {
        console.error('Error saving theme to localStorage:', e);
    }
}

function loadThemeFromStorage() {
    try {
        const saved = localStorage.getItem(THEME_STORAGE_KEY);
        if (!saved) return;

        const isDark = saved === 'dark';
        if (isDark) {
            document.body.classList.add('dark-mode');
            if (darkModeIcon) {
                darkModeIcon.classList.add('bx-sun');
            }
        } else {
            document.body.classList.remove('dark-mode');
            if (darkModeIcon) {
                darkModeIcon.classList.remove('bx-sun');
            }
        }
    } catch (e) {
        console.error('Error loading theme from localStorage:', e);
    }
}

if (darkModeIcon) {
    darkModeIcon.onclick = () => {
        const willBeDark = !document.body.classList.contains('dark-mode');

        darkModeIcon.classList.toggle('bx-sun');
        document.body.classList.toggle('dark-mode');

        saveThemeToStorage(willBeDark);
    };
}


/*========== scroll reveal ==========*/
ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img img, .services-container, .portfolio-box, .testimonial-wrapper, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img img', { origin: 'left' });
ScrollReveal().reveal('.home-content h3, .home-content p, .about-content', { origin: 'right' });


/* =================== BLOG SYSTEM =================== */

const BLOG_STORAGE_KEY = 'portfolioBlogs';
const BLOG_DRAFT_STORAGE_KEY = 'portfolioBlogDraft';
const BLOG_FILTER_STORAGE_KEY = 'portfolioBlogFilterState';

// DOM elements
const blogForm = document.getElementById('blogForm');
const blogIdInput = document.getElementById('blogId');
const blogTitleInput = document.getElementById('blogTitle');
const blogCategoryInput = document.getElementById('blogCategory');
const blogTagsInput = document.getElementById('blogTags');
const blogDescriptionInput = document.getElementById('blogDescription');
const blogContentInput = document.getElementById('blogContent');
const resetBlogFormBtn = document.getElementById('resetBlogForm');

const blogList = document.getElementById('blogList');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');

const offcanvasBlogEl = document.getElementById('offcanvasBlog');
const offcanvasBlog = offcanvasBlogEl ? new bootstrap.Offcanvas(offcanvasBlogEl) : null;

const blogModalEl = document.getElementById('blogModal');
const blogModal = blogModalEl ? new bootstrap.Modal(blogModalEl) : null;

// Modal elements
const blogModalLabel = document.getElementById('blogModalLabel');
const blogModalCategory = document.getElementById('blogModalCategory');
const blogModalTags = document.getElementById('blogModalTags');
const blogModalDate = document.getElementById('blogModalDate');
const blogModalBody = document.getElementById('blogModalBody');

let blogs = [];

/* ---- LocalStorage helpers for blogs ---- */

function loadBlogsFromStorage() {
    try {
        const saved = localStorage.getItem(BLOG_STORAGE_KEY);
        blogs = saved ? JSON.parse(saved) : [];
    } catch (e) {
        console.error('Error reading blogs from localStorage:', e);
        blogs = [];
    }
    applyFilters(); // render filtered list
    updateCategoryFilterOptions();
}

function saveBlogsToStorage() {
    try {
        localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(blogs));
    } catch (e) {
        console.error('Error saving blogs to localStorage:', e);
    }
}

/* ---- Blog draft helpers (auto-save) ---- */

function saveBlogDraftToStorage() {
    if (!blogForm) return;
    const draft = {
        id: blogIdInput ? blogIdInput.value : '',
        title: blogTitleInput ? blogTitleInput.value : '',
        category: blogCategoryInput ? blogCategoryInput.value : '',
        tags: blogTagsInput ? blogTagsInput.value : '',
        description: blogDescriptionInput ? blogDescriptionInput.value : '',
        content: blogContentInput ? blogContentInput.value : ''
    };

    const isEmpty =
        !draft.title.trim() &&
        !draft.category.trim() &&
        !draft.tags.trim() &&
        !draft.description.trim() &&
        !draft.content.trim();

    try {
        if (isEmpty) {
            localStorage.removeItem(BLOG_DRAFT_STORAGE_KEY);
        } else {
            localStorage.setItem(BLOG_DRAFT_STORAGE_KEY, JSON.stringify(draft));
        }
    } catch (e) {
        console.error('Error saving blog draft:', e);
    }
}

function loadBlogDraftFromStorage() {
    if (!blogForm) return;
    try {
        const saved = localStorage.getItem(BLOG_DRAFT_STORAGE_KEY);
        if (!saved) return;

        const draft = JSON.parse(saved);
        if (blogIdInput) blogIdInput.value = draft.id || '';
        if (blogTitleInput) blogTitleInput.value = draft.title || '';
        if (blogCategoryInput) blogCategoryInput.value = draft.category || '';
        if (blogTagsInput) blogTagsInput.value = draft.tags || '';
        if (blogDescriptionInput) blogDescriptionInput.value = draft.description || '';
        if (blogContentInput) blogContentInput.value = draft.content || '';
    } catch (e) {
        console.error('Error loading blog draft:', e);
    }
}

/* ---- Filter state helpers (search + category) ---- */

function saveFilterStateToStorage() {
    if (!searchInput || !categoryFilter) return;
    const state = {
        search: searchInput.value || '',
        category: categoryFilter.value || 'all'
    };
    try {
        localStorage.setItem(BLOG_FILTER_STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
        console.error('Error saving filter state:', e);
    }
}

function loadFilterStateFromStorage() {
    if (!searchInput || !categoryFilter) return;
    try {
        const saved = localStorage.getItem(BLOG_FILTER_STORAGE_KEY);
        if (!saved) return;

        const state = JSON.parse(saved);
        if (typeof state.search === 'string') {
            searchInput.value = state.search;
        }

        if (state.category) {
            const hasOption = !!categoryFilter.querySelector(`option[value="${state.category}"]`);
            if (hasOption) {
                categoryFilter.value = state.category;
            } else {
                categoryFilter.value = 'all';
            }
        }
    } catch (e) {
        console.error('Error loading filter state:', e);
    }
}

/* ---- Utility functions ---- */

function createBlogObject({ id = null, title, category, tags, description, content }) {
    return {
        id: id || Date.now().toString(),
        title: title.trim(),
        category: category.trim(),
        tags,
        description: description.trim(),
        content: content.trim(),
        createdAt: new Date().toISOString()
    };
}

function formatDate(iso) {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function parseTags(tagsString) {
    if (!tagsString) return [];
    return tagsString
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);
}

/* ---- Render functions ---- */

function renderBlogs(list) {
    blogList.innerHTML = '';

    if (!list || list.length === 0) {
        blogList.innerHTML = `
            <div class="col-12">
                <p class="text-center text-muted" style="font-size:1.4rem;">
                    No blogs yet. Click <strong>Write a Blog</strong> to create your first post!
                </p>
            </div>
        `;
        return;
    }

    list
        .slice() // copy
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // latest first
        .forEach(blog => {
            const shortText =
                blog.description ||
                blog.content.slice(0, 150) + (blog.content.length > 150 ? '...' : '');
            const dateText = formatDate(blog.createdAt);
            const tagsHtml = blog.tags
                .map(tag => `<span class="blog-tag">#${tag}</span>`)
                .join(' ');

            const html = `
                <div class="col-md-4 col-sm-6">
                    <div class="card blog-card" data-id="${blog.id}">
                        <div class="card-body">
                            <h5 class="blog-card-title">${blog.title}</h5>
                            <div class="blog-card-meta">
                                ${blog.category ? `<span class="blog-badge">${blog.category}</span>` : ''}
                                ${dateText ? `<span class="text-muted">${dateText}</span>` : ''}
                            </div>
                            <p class="blog-card-text">${shortText}</p>
                            <div class="mb-2">${tagsHtml}</div>
                            <div class="d-flex justify-content-between blog-card-footer">
                                <button class="btn btn-sm btn-primary btn-read-more">Read More</button>
                                <div>
                                    <button class="btn btn-sm btn-outline-secondary btn-edit me-1">Edit</button>
                                    <button class="btn btn-sm btn-outline-danger btn-delete">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            blogList.insertAdjacentHTML('beforeend', html);
        });
}

function updateCategoryFilterOptions() {
    const selectedValue = categoryFilter.value;
    const categories = Array.from(
        new Set(
            blogs
                .map(b => b.category.trim())
                .filter(c => c.length > 0)
        )
    ).sort();

    // keep "All Categories" as first option
    categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categoryFilter.appendChild(option);
    });

    // try to keep previous selection if still exists
    const optionsValues = Array.from(categoryFilter.options).map(o => o.value);
    if (optionsValues.includes(selectedValue)) {
        categoryFilter.value = selectedValue;
    } else {
        categoryFilter.value = 'all';
    }
}

/* ---- Filters ---- */

function applyFilters() {
    const searchText = (searchInput.value || '').toLowerCase().trim();
    const categoryValue = categoryFilter.value;

    let filtered = blogs.slice();

    if (categoryValue && categoryValue !== 'all') {
        filtered = filtered.filter(
            b => b.category.toLowerCase() === categoryValue.toLowerCase()
        );
    }

    if (searchText) {
        filtered = filtered.filter(b => {
            const text = [
                b.title,
                b.description,
                b.content,
                b.category,
                (b.tags || []).join(' ')
            ]
                .join(' ')
                .toLowerCase();
            return text.includes(searchText);
        });
    }

    renderBlogs(filtered);
}

/* ---- Form handling ---- */

function clearBlogForm() {
    if (blogIdInput) blogIdInput.value = '';
    if (blogTitleInput) blogTitleInput.value = '';
    if (blogCategoryInput) blogCategoryInput.value = '';
    if (blogTagsInput) blogTagsInput.value = '';
    if (blogDescriptionInput) blogDescriptionInput.value = '';
    if (blogContentInput) blogContentInput.value = '';
    try {
        localStorage.removeItem(BLOG_DRAFT_STORAGE_KEY);
    } catch (e) {
        console.error('Error clearing blog draft:', e);
    }
}

if (resetBlogFormBtn) {
    resetBlogFormBtn.addEventListener('click', () => {
        clearBlogForm();
    });
}

// Auto-save draft on input change
if (blogForm) {
    blogForm.addEventListener('input', () => {
        saveBlogDraftToStorage();
    });
}

if (blogForm) {
    blogForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const title = blogTitleInput.value;
        const category = blogCategoryInput.value;
        const tags = parseTags(blogTagsInput.value);
        const description = blogDescriptionInput.value;
        const content = blogContentInput.value;

        if (!title.trim() || !content.trim()) {
            alert('Title and Content are required.');
            return;
        }

        const id = blogIdInput.value;

        if (id) {
            // Edit mode
            const index = blogs.findIndex(b => b.id === id);
            if (index !== -1) {
                blogs[index] = {
                    ...blogs[index],
                    title,
                    category,
                    tags,
                    description,
                    content
                };
            }
        } else {
            // New blog
            const newBlog = createBlogObject({
                title,
                category,
                tags,
                description,
                content
            });
            blogs.push(newBlog);
        }

        saveBlogsToStorage();
        updateCategoryFilterOptions();
        applyFilters();
        clearBlogForm();

        if (offcanvasBlog) {
            offcanvasBlog.hide();
        }
    });
}

/* ---- Blog card actions (Read More / Edit / Delete) ---- */

if (blogList) {
    blogList.addEventListener('click', function (e) {
        const card = e.target.closest('.blog-card');
        if (!card) return;

        const id = card.getAttribute('data-id');
        const blog = blogs.find(b => b.id === id);
        if (!blog) return;

        // READ MORE
        if (e.target.classList.contains('btn-read-more')) {
            openBlogModal(blog);
        }

        // DELETE
        if (e.target.classList.contains('btn-delete')) {
            const confirmDelete = confirm('Are you sure you want to delete this blog?');
            if (!confirmDelete) return;

            blogs = blogs.filter(b => b.id !== id);
            saveBlogsToStorage();
            updateCategoryFilterOptions();
            applyFilters();
        }

        // EDIT
        if (e.target.classList.contains('btn-edit')) {
            fillFormForEdit(blog);
            if (offcanvasBlog) {
                offcanvasBlog.show();
            }
        }
    });
}

/* ---- Modal + Edit helpers ---- */

function openBlogModal(blog) {
    if (!blogModal) return;

    blogModalLabel.textContent = blog.title;
    blogModalCategory.textContent = blog.category || 'No category';

    blogModalDate.textContent = formatDate(blog.createdAt) || '';

    // tags
    blogModalTags.innerHTML = '';
    (blog.tags || []).forEach(tag => {
        const span = document.createElement('span');
        span.className = 'blog-tag';
        span.textContent = '#' + tag;
        blogModalTags.appendChild(span);
    });

    blogModalBody.style.fontSize = '1.5rem';
    blogModalBody.style.whiteSpace = 'pre-wrap';
    blogModalBody.textContent = blog.content;

    blogModal.show();
}

function fillFormForEdit(blog) {
    blogIdInput.value = blog.id;
    blogTitleInput.value = blog.title;
    blogCategoryInput.value = blog.category || '';
    blogTagsInput.value = (blog.tags || []).join(', ');
    blogDescriptionInput.value = blog.description || '';
    blogContentInput.value = blog.content || '';

    saveBlogDraftToStorage();
}

/* ---- Search & filter events ---- */

if (searchInput) {
    searchInput.addEventListener('input', function () {
        applyFilters();
        saveFilterStateToStorage();
    });
}

if (categoryFilter) {
    categoryFilter.addEventListener('change', function () {
        applyFilters();
        saveFilterStateToStorage();
    });
}

/* ---- INIT ---- */

document.addEventListener('DOMContentLoaded', function () {
    // theme
    loadThemeFromStorage();

    // blogs + filters
    loadBlogsFromStorage();
    updateCategoryFilterOptions(); // safety call
    loadFilterStateFromStorage();
    applyFilters();

    // blog draft
    loadBlogDraftFromStorage();
});
