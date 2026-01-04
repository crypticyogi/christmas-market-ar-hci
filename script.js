/* ========================================
   CHRISTMAS MARKET AR - INTERACTION SCRIPT
   Simulates AR interaction behaviors
   ======================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Detect which page we're on
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    console.log('=== AR Simulation Active ===');
    console.log('Current page:', currentPage);
    
    
    // ========================================
    // DISCOVER PAGE: Stall Selection + Gesture Confirmation
    // ========================================
    if (currentPage === 'discover.html') {
        const stallCards = document.querySelectorAll('.stall-card');
        const confirmBtn = document.getElementById('confirmBtn');
        const gazeTargetName = document.getElementById('gazeTargetName');
        const gestureModal = document.getElementById('gestureModal');
        const modalStallName = document.getElementById('modalStallName');
        const confirmGesture = document.getElementById('confirmGesture');
        const cancelGesture = document.getElementById('cancelGesture');
        
        let selectedStall = null;
        let selectedStallName = '';
        
        // Make stall cards clickable - simulates gaze + selection
        stallCards.forEach(card => {
            card.addEventListener('click', function() {
                // Remove selection from all cards
                stallCards.forEach(c => c.classList.remove('selected'));
                
                // Add selection to clicked card (simulates gaze focus)
                this.classList.add('selected');
                
                // Get stall data
                selectedStall = this.dataset.stall;
                selectedStallName = this.querySelector('.stall-name').textContent;
                
                // Update gaze target display
                gazeTargetName.textContent = selectedStallName;
                
                // Enable confirm button
                confirmBtn.disabled = false;
                confirmBtn.textContent = 'Confirm Selection';
                
                console.log('Stall selected (gaze):', selectedStallName);
            });
            
            // Hover effect for visual feedback
            card.addEventListener('mouseenter', function() {
                console.log('Gaze hover:', this.dataset.stall);
            });
        });
        
        // Confirm button - opens gesture confirmation modal
        confirmBtn.addEventListener('click', function() {
            if (selectedStall && selectedStallName) {
                // Show modal with selected stall
                modalStallName.textContent = `Selected: ${selectedStallName}`;
                gestureModal.classList.add('active');
                console.log('Opening gesture confirmation modal');
            }
        });
        
        // Confirm gesture - saves to localStorage and navigates
        confirmGesture.addEventListener('click', function() {
            if (selectedStallName) {
                // Store in localStorage
                localStorage.setItem('selectedStall', selectedStallName);
                console.log('Gesture confirmed! Saved to localStorage:', selectedStallName);
                
                // Navigate to route page
                window.location.href = 'route.html';
            }
        });
        
        // Cancel gesture - close modal
        cancelGesture.addEventListener('click', function() {
            gestureModal.classList.remove('active');
            console.log('Gesture cancelled');
        });
        
        // Close modal on overlay click
        gestureModal.addEventListener('click', function(e) {
            if (e.target === gestureModal) {
                gestureModal.classList.remove('active');
            }
        });
    }
    
    
    // ========================================
    // ROUTE PAGE: Display Selected Stall
    // ========================================
    if (currentPage === 'route.html') {
        const nextStopName = document.getElementById('nextStopName');
        
        // Read selected stall from localStorage
        const selectedStall = localStorage.getItem('selectedStall');
        
        if (selectedStall) {
            nextStopName.textContent = selectedStall;
            console.log('Next stop loaded from localStorage:', selectedStall);
        } else {
            nextStopName.textContent = '(none)';
            console.log('No stall selected');
        }
    }
    
    
    // ========================================
    // FRIENDS PAGE: Friend Navigation with Beacon
    // ========================================
    if (currentPage === 'friends.html') {
        const friendCards = document.querySelectorAll('.friend-card.clickable');
        const friendModal = document.getElementById('friendModal');
        const friendModalTitle = document.getElementById('friendModalTitle');
        const friendModalDistance = document.getElementById('friendModalDistance');
        const confirmFriendNav = document.getElementById('confirmFriendNav');
        const cancelFriendNav = document.getElementById('cancelFriendNav');
        const beaconStatus = document.getElementById('beaconStatus');
        const beaconFriend = document.getElementById('beaconFriend');
        const beaconDirection = document.getElementById('beaconDirection');
        
        let selectedFriend = null;
        let selectedFriendData = {};
        
        // Make friend cards clickable
        friendCards.forEach(card => {
            card.addEventListener('click', function() {
                // Get friend data from data attributes
                selectedFriend = this.dataset.friend;
                selectedFriendData = {
                    name: this.dataset.friend,
                    distance: this.dataset.distance,
                    direction: this.dataset.direction,
                    arrow: this.dataset.arrow
                };
                
                // Update modal content
                friendModalTitle.textContent = `Navigate to ${selectedFriend} (${selectedFriendData.distance})?`;
                friendModalDistance.textContent = `Direction: ${selectedFriendData.direction}`;
                
                // Show modal
                friendModal.classList.add('active');
                console.log('Friend selected:', selectedFriend);
            });
            
            // Hover effect
            card.addEventListener('mouseenter', function() {
                console.log('Hovering over friend:', this.dataset.friend);
            });
        });
        
        // Confirm friend navigation - activate beacon
        confirmFriendNav.addEventListener('click', function() {
            if (selectedFriend) {
                // Hide modal
                friendModal.classList.remove('active');
                
                // Show beacon status
                beaconFriend.textContent = selectedFriendData.name;
                beaconDirection.textContent = selectedFriendData.direction;
                beaconStatus.style.display = 'flex';
                
                // Set beacon arrow from data attribute
                const beaconArrowEl = document.getElementById('beaconArrow');
                if (beaconArrowEl && selectedFriendData.arrow) {
                    beaconArrowEl.textContent = selectedFriendData.arrow;
                }
                
                console.log('Beacon activated for:', selectedFriendData.name);
            }
        });
        
        // Cancel friend navigation
        cancelFriendNav.addEventListener('click', function() {
            friendModal.classList.remove('active');
            console.log('Friend navigation cancelled');
        });
        
        // Close modal on overlay click
        friendModal.addEventListener('click', function(e) {
            if (e.target === friendModal) {
                friendModal.classList.remove('active');
            }
        });
    }
    
    
    // ========================================
    // KEYBOARD SHORTCUTS (All Pages)
    // ========================================
    document.addEventListener('keydown', function(e) {
        // Escape key - close any open modal
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal-overlay.active');
            modals.forEach(modal => modal.classList.remove('active'));
        }
        
        // Discover page shortcuts
        if (currentPage === 'discover.html') {
            const stallCards = document.querySelectorAll('.stall-card');
            const confirmBtn = document.getElementById('confirmBtn');
            
            // Press 1-3 to select stalls
            if (e.key >= '1' && e.key <= '3') {
                const index = parseInt(e.key) - 1;
                if (stallCards[index]) {
                    stallCards[index].click();
                    console.log('Keyboard shortcut: Selected stall', e.key);
                }
            }
            
            // Press C to confirm
            if ((e.key === 'c' || e.key === 'C') && confirmBtn && !confirmBtn.disabled) {
                confirmBtn.click();
                console.log('Keyboard shortcut: Confirm');
            }
        }
    });
    
    
    // ========================================
    // AR LOADING SIMULATION
    // ========================================
    if (document.body.classList.contains('ar-view')) {
        const overlay = document.querySelector('.ar-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.style.transition = 'opacity 0.5s ease';
                overlay.style.opacity = '1';
            }, 100);
        }
    }
    
    
    // ========================================
    // INTERACTION HINTS (Console)
    // ========================================
    console.log('=== Interaction Guide ===');
    console.log('DISCOVER: Click card to select, click Confirm to open gesture modal');
    console.log('ROUTE: Displays your selected stall from localStorage');
    console.log('FRIENDS: Click friend card, confirm gesture to activate beacon');
    console.log('SHORTCUTS: ESC = close modal, 1-3 = select stall, C = confirm');
    console.log('========================');
});

