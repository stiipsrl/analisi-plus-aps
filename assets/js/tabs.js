document.addEventListener('DOMContentLoaded', function() {
    // Load content for tabs
    loadTabContent('overview', 'views/overview-content.html');
    
    // Add click handlers to tab buttons
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;
            
            // Remove active class from all tabs
            document.querySelectorAll('.tab-btn').forEach(btn => 
                btn.classList.remove('active')
            );
            document.querySelectorAll('.tab-content').forEach(content => 
                content.classList.remove('active')
            );
            
            // Add active class to clicked tab
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            
            // Load content if not already loaded
            loadTabContent(tabId, `views/${tabId}-content.html`);
        });
    });
});

function loadTabContent(tabId, contentUrl) {
    const tabContent = document.getElementById(tabId);
    
    // Check if content is already loaded
    if (!tabContent.hasChildNodes()) {
        fetch(contentUrl)
            .then(response => response.text())
            .then(html => {
                tabContent.innerHTML = html;
                initializeTabSpecificFunctionality(tabId);
            })
            .catch(error => {
                console.error('Error loading tab content:', error);
                tabContent.innerHTML = '<p class="text-red-500">Error loading content</p>';
            });
    }
}

function initializeTabSpecificFunctionality(tabId) {
    switch(tabId) {
        case 'analysis':
            initializeSprintTimeline();
            break;
        case 'demo':
            initializeDemoScreen();
            break;
    }
}

function initializeSprintTimeline() {
    // Add animation to sprint items
    document.querySelectorAll('.sprint-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('animate-fadeIn');
    });
}

function initializeDemoScreen() {
    // Initialize demo screen interactions
    const demoButtons = document.querySelectorAll('.demo-button');
    demoButtons.forEach(button => {
        button.addEventListener('click', handleDemoInteraction);
    });
}

function handleDemoInteraction(event) {
    const button = event.currentTarget;
    const action = button.dataset.action;
    
    // Add visual feedback
    button.classList.add('active');
    setTimeout(() => button.classList.remove('active'), 200);
    
    // Handle specific demo actions
    switch(action) {
        case 'create-flyer':
            showCreateFlyerModal();
            break;
        case 'view-products':
            updateProductsView();
            break;
    }
}

// Funzione placeholder per mostrare il modal di creazione volantino
function showCreateFlyerModal() {
    console.log('Showing create flyer modal');
    // Implementazione modal
}

// Funzione placeholder per aggiornare la vista prodotti
function updateProductsView() {
    console.log('Updating products view');
    // Implementazione vista prodotti
}