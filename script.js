// ===== STATE =====
let selectedRole = 'doctor';

// ===== SELECT ROLE =====
function selectRole(role) {
    selectedRole = role;
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.role === role) btn.classList.add('active');
    });
}

// ===== LOGIN =====
function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const error = document.getElementById('loginError');

    if (!username || !password) {
        error.style.display = 'block';
        return;
    }

    error.style.display = 'none';

    // hide login page
    document.getElementById('loginPage').classList.remove('active');

    // show correct dashboard
    const pages = {
        doctor: 'doctorPage',
        patient: 'patientPage',
        tech: 'techPage',
        manager: 'managerPage'
    };

    const page = document.getElementById(pages[selectedRole]);
    if (page) page.classList.add('active');
}

// ===== LOGOUT =====
function logout() {
    // hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

    // reset tabs
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    // show first tab in each dashboard
    ['doctor-overview', 'patient-overview', 'tech-overview', 'manager-overview'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('active');
    });

    // reset nav items
    document.querySelectorAll('.nav-item').forEach(n => {
        if (n.getAttribute('onclick') && n.getAttribute('onclick').includes('overview')) {
            n.classList.add('active');
        }
    });

    // reset login form
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';

    // show login
    document.getElementById('loginPage').classList.add('active');
}

// ===== SHOW TAB =====
function showTab(role, tab) {
    // remove active from all tabs in this role
    const allTabs = document.querySelectorAll(`#${role}Page .tab-content`);
    allTabs.forEach(t => t.classList.remove('active'));

    // remove active from all nav items in this role
    const allNav = document.querySelectorAll(`#${role}Page .nav-item`);
    allNav.forEach(n => n.classList.remove('active'));

    // show selected tab
    const target = document.getElementById(`${role}-${tab}`);
    if (target) target.classList.add('active');

    // highlight correct nav item
    allNav.forEach(n => {
        if (n.getAttribute('onclick') && n.getAttribute('onclick').includes(`'${tab}'`)) {
            n.classList.add('active');
        }
    });
}

// ===== SUBMIT REQUEST =====
function submitRequest() {
    const success = document.getElementById('requestSuccess');
    success.style.display = 'block';
    setTimeout(() => { success.style.display = 'none'; }, 4000);
}

// ===== CLEAR FORM =====
function clearForm() {
    document.querySelectorAll('#doctor-request .form-input').forEach(input => {
        if (input.type === 'checkbox') input.checked = false;
        else input.value = '';
    });
}

// ===== ENTER KEY LOGIN =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.getElementById('loginPage').classList.contains('active')) {
        login();
    }
});