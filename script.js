// Particle system
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        container.appendChild(particle);
    }
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
let isDark = true;

themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    document.body.classList.toggle('light-theme');
    themeToggle.textContent = isDark ? '🌙 Dark' : '☀️ Light';
});

// Motion toggle
const motionToggle = document.getElementById('reduce-motion-toggle');
let motionEnabled = false;

motionToggle.addEventListener('click', () => {
    motionEnabled = !motionEnabled;
    document.body.classList.toggle('reduce-motion');
    motionToggle.textContent = motionEnabled ? '🎭 Motion' : '⏸️ Static';
});

// RSVP functionality
const form = document.getElementById('rsvp-form');
const list = document.getElementById('rsvp-list');
const count = document.getElementById('rsvp-count');
const modal = document.getElementById('rsvp-modal');
const modalMessage = document.getElementById('modal-message');
const closeModalBtn = document.getElementById('close-modal');

let guests = [
    { name: 'Amira Hassan', email: 'amira@email.com' },
    { name: 'Omar Ali', email: 'omar@email.com' },
    { name: 'Fatima Khan', email: 'fatima@email.com' }
];

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function addGuest(guest) {
    const guestDiv = document.createElement('div');
    guestDiv.className = 'guest-item';
    guestDiv.innerHTML = `
        <div class="guest-avatar">${getInitials(guest.name)}</div>
        <div>
            <div style="font-weight: 600;">${guest.name}</div>
            <div style="font-size: 0.8rem; color: var(--text-gray);">${guest.email}</div>
        </div>
    `;
    list.appendChild(guestDiv);
    count.textContent = guests.length;
}

function showModal(name) {
    if (motionEnabled) return;
    
    modalMessage.textContent = `Welcome ${name}! 🎉`;
    modal.classList.add('show');
}

function hideModal() {
    modal.classList.remove('show');
}

closeModalBtn.addEventListener('click', hideModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) hideModal();
});

form.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const ageInput = document.getElementById('age');
    
    let isValid = true;
    
    // Reset styles
    [nameInput, emailInput, ageInput].forEach(input => {
        input.style.borderColor = 'var(--glass-border)';
        input.style.backgroundColor = 'var(--glass-bg)';
    });

    // Validation
    if (!/^[a-zA-Z\s]+$/.test(nameInput.value) || nameInput.value.trim().length < 2 ) {
        nameInput.style.borderColor = '#ef4444';
        nameInput.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
        isValid = false;
    }

    if (!emailInput.value.includes('@') || !emailInput.value.includes('.')) {
        emailInput.style.borderColor = '#ef4444';
        emailInput.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
        isValid = false;
    }

    if (isNaN(ageInput.value) || ageInput.value <= 0 || !Number.isInteger(Number(ageInput.value))) {
        ageInput.style.borderColor = '#ef4444';
        ageInput.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
        isValid = false;
    }

    if (isValid) {
        const newGuest = {
            name: nameInput.value,
            email: emailInput.value
        };
        
        guests.push(newGuest);
        addGuest(newGuest);
        showModal(nameInput.value);
        form.reset();
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    guests.forEach(addGuest);
});

// Header scroll effect
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        header.style.background = 'rgba(26, 26, 46, 0.98)';
        header.style.transform = currentScrollY > lastScrollY ? 'translateY(-100%)' : 'translateY(0)';
    } else {
        header.style.background = 'rgba(26, 26, 46, 0.95)';
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
});
