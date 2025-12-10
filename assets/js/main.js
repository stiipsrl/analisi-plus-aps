document.addEventListener('DOMContentLoaded', function() {
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
        });
    });
});

// Function for MVP mockup switching (global scope for onclick handlers)
function showMockup(id, btn) {
    // Hide all mockups
    document.querySelectorAll('.mockup-content').forEach(el => {
        el.classList.add('hidden');
    });

    // Remove active from all tabs
    document.querySelectorAll('.mockup-tab').forEach(el => {
        el.classList.remove('bg-yellow-400', 'text-gray-900');
        el.classList.add('bg-gray-100', 'text-gray-600');
    });

    // Show selected mockup
    const mockupEl = document.getElementById('mockup-' + id);
    if (mockupEl) {
        mockupEl.classList.remove('hidden');
    }

    // Activate selected tab
    if (btn) {
        btn.classList.remove('bg-gray-100', 'text-gray-600');
        btn.classList.add('bg-yellow-400', 'text-gray-900');
    }
}