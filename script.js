// Christmas Market AR - Prototype JavaScript

// Confirm exit function
function confirmExit() {
    const confirmed = confirm('Exit AR mode?');
    if (confirmed) {
        alert('AR session ended. Thank you for visiting the Christmas Market!');
        window.location.href = 'index.html';
    }
}

// Add hover effects to stall cards
document.addEventListener('DOMContentLoaded', function() {
    // Log current page
    console.log('AR Interface loaded:', window.location.pathname);
    
    // Add click handlers to stall cards
    const stallCards = document.querySelectorAll('.stall-card');
    stallCards.forEach(card => {
        card.addEventListener('click', function() {
            const stallName = this.querySelector('h3').textContent;
            const confirmed = confirm(`Navigate to ${stallName}?`);
            if (confirmed) {
                alert(`Route set to: ${stallName}`);
                window.location.href = 'route.html';
            }
        });
    });
    
    // Add click handlers to friend indicators
    const friendCards = document.querySelectorAll('.friend-indicator');
    friendCards.forEach(card => {
        card.addEventListener('click', function() {
            const friendName = this.querySelector('.friend-name').textContent;
            const friendDist = this.querySelector('.friend-distance').textContent;
            const confirmed = confirm(`Navigate to ${friendName} (${friendDist})?`);
            if (confirmed) {
                alert(`Beacon activated for ${friendName}`);
            }
        });
    });
    
    // Add click handlers to event cards
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        card.addEventListener('click', function() {
            const eventName = this.querySelector('.event-name').textContent;
            const eventTime = this.querySelector('.event-time').textContent;
            alert(`Event: ${eventName}\nTime: ${eventTime}\nReminder set!`);
        });
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // ESC - exit
        if (e.key === 'Escape') {
            confirmExit();
        }
        
        // 1-4 - quick navigation
        if (e.key === '1') window.location.href = 'index.html';
        if (e.key === '2') window.location.href = 'friends.html';
        if (e.key === '3') window.location.href = 'route.html';
        if (e.key === '4') window.location.href = 'events.html';
    });
    
    console.log('Interactions ready. Shortcuts: ESC=exit, 1-4=navigate');
});
