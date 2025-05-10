// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const exploreBtn = document.getElementById('exploreBtn');
const featureCards = document.querySelectorAll('.feature-card');
const savePreferencesBtn = document.getElementById('savePreferences');
const toast = document.getElementById('toast');
const weatherWidget = document.getElementById('weatherWidget');

// Theme toggle function
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    themeToggle.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
    
    // Save theme preference to localStorage
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    
    // Show toast notification
    showToast(`Theme changed to ${isDarkMode ? 'dark' : 'light'} mode`);
});

// Check for saved theme preference
function loadThemePreference() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }
}

// Toast notification function
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Save user preferences to localStorage
savePreferencesBtn.addEventListener('click', () => {
    const region = document.getElementById('region').value;
    const cropType = document.getElementById('cropType').value;
    const farmSize = document.getElementById('farmSize').value;
    const notificationFrequency = document.getElementById('notificationFrequency').value;
    
    // Validate inputs
    if (!region || !cropType || !farmSize) {
        showToast('Please fill in all required fields');
        return;
    }
    
    // Save preferences
    const preferences = {
        region,
        cropType,
        farmSize,
        notificationFrequency
    };
    
    localStorage.setItem('farmingPreferences', JSON.stringify(preferences));
    showToast('Your preferences have been saved');
    
    // Trigger animation on save
    animateElement(savePreferencesBtn, 'animate-pulse');
});

// Load saved preferences
function loadSavedPreferences() {
    const savedPreferences = localStorage.getItem('farmingPreferences');
    
    if (savedPreferences) {
        const preferences = JSON.parse(savedPreferences);
        
        document.getElementById('region').value = preferences.region || '';
        document.getElementById('cropType').value = preferences.cropType || '';
        document.getElementById('farmSize').value = preferences.farmSize || '';
        document.getElementById('notificationFrequency').value = preferences.notificationFrequency || 'weekly';
        
        showToast('Loaded your saved preferences');
    }
}

// Animate element function
function animateElement(element, animationClass) {
    element.classList.add(animationClass);
    
    // Remove animation class after animation completes
    setTimeout(() => {
        element.classList.remove(animationClass);
    }, 2000);
}

// Feature card hover animation
featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        animateElement(card, 'animate-pulse');
    });
});

// Explore button click animation
exploreBtn.addEventListener('click', () => {
    animateElement(exploreBtn, 'animate-pulse');
    
    // Scroll to features section
    document.getElementById('features').scrollIntoView({
        behavior: 'smooth'
    });
});

// Animate cards on scroll
function animateOnScroll() {
    const cards = document.querySelectorAll('.feature-card');
    
    cards.forEach((card, index) => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (cardPosition < screenPosition) {
            card.classList.add('animate-slideIn');
            card.style.animationDelay = `${index * 0.2}s`;
        }
    });
}

// Update weather information based on preferences
function updateWeatherInfo() {
    const savedPreferences = localStorage.getItem('farmingPreferences');
    
    if (savedPreferences) {
        const preferences = JSON.parse(savedPreferences);
        let region = "Nairobi";
        
        // Map preference regions to actual locations
        if (preferences.region === 'central') region = "Central Highlands";
        if (preferences.region === 'eastern') region = "Eastern Kenya";
        if (preferences.region === 'riftvalley') region = "Rift Valley";
        if (preferences.region === 'coastal') region = "Coastal Region";
        if (preferences.region === 'western') region = "Western Kenya";
        
        // Update weather widget with regionalized data
        document.querySelector('#weatherWidget h3').textContent = `${region}, Kenya`;
        
        // Simulate different weather based on region
        let temp, desc, icon;
        
        switch(preferences.region) {
            case 'coastal':
                temp = "32°C";
                desc = "Hot and humid";
                icon = "🌤️";
                break;
            case 'central':
                temp = "24°C";
                desc = "Mild and partly cloudy";
                icon = "⛅";
                break;
            case 'eastern':
                temp = "30°C";
                desc = "Hot and dry";
                icon = "☀️";
                break;
            case 'riftvalley':
                temp = "26°C";
                desc = "Mild with afternoon showers";
                icon = "🌦️";
                break;
            case 'western':
                temp = "25°C";
                desc = "Moderate rainfall expected";
                icon = "🌧️";
                break;
            default:
                temp = "28°C";
                desc = "Sunny with clear skies";
                icon = "☀️";
        }
        
        document.getElementById('weatherTemp').textContent = temp;
        document.getElementById('weatherDescription').textContent = desc;
        document.querySelector('.weather-icon').textContent = icon;
        
        // Animate the weather widget update
        animateElement(weatherWidget, 'animate-fadeIn');
    }
}

// Initialize
window.addEventListener('load', () => {
    loadThemePreference();
    loadSavedPreferences();
    updateWeatherInfo();
    
    // Animate hero elements
    document.querySelector('.hero-content h1').classList.add('animate-fadeIn');
    document.querySelector('.hero-content p').classList.add('animate-fadeIn', 'delay-1');
    document.querySelector('.hero-content .cta-button').classList.add('animate-fadeIn', 'delay-2');
});

// Scroll event for animations
window.addEventListener('scroll', animateOnScroll);