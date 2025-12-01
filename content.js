// Messenger Keyboard Shortcuts
// Adds custom keyboard shortcuts for messenger.com

(function () {
    'use strict';

    console.log('Messenger Shortcuts Extension loaded');

    // Handle keyboard shortcuts
    document.addEventListener('keydown', function (event) {
        // Cmd + Shift + E (macOS) - Open emoji picker
        if (event.metaKey && event.shiftKey && (event.key === 'E' || event.code === 'KeyE')) {
            console.log('Emoji shortcut triggered!');
            event.preventDefault();
            event.stopPropagation();
            openEmojiPicker();
        }
        
        // Cmd + Shift + K (macOS) - Focus search
        if (event.metaKey && event.shiftKey && (event.key === 'K' || event.code === 'KeyK')) {
            console.log('Search shortcut triggered!');
            event.preventDefault();
            event.stopPropagation();
            focusSearch();
        }
    }, true);

    function openEmojiPicker() {
        console.log('openEmojiPicker() called');
        
        // Try multiple selectors as Messenger's UI may vary
        const selectors = [
            'div[aria-label="Vali emotikon"]',
            'div[aria-label="Choose an emoji"]',
            'div[aria-label="Emoji"]',
            'div[aria-label*="emotikon" i]',
            'div[aria-label*="emoji" i]',
            'div[role="button"][aria-label*="emoji" i]',
            'div[role="button"][aria-label*="emotikon" i]',
            '[data-testid="emoji_picker_button"]',
            'button[aria-label*="emoji" i]',
        ];

        let emojiButton = null;

        for (const selector of selectors) {
            emojiButton = document.querySelector(selector);
            if (emojiButton) {
                console.log('Found emoji button with selector:', selector);
                console.log('Button element:', emojiButton);
                break;
            }
        }

        if (emojiButton) {
            // Simulate a full mouse interaction sequence with React-compatible events
            const simulateClick = (element) => {
                // First, ensure the element is in view
                element.scrollIntoView({ behavior: 'instant', block: 'nearest' });
                
                // Create a bounding rect for realistic coordinates
                const rect = element.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;
                
                // Dispatch pointerdown (React uses pointer events)
                const pointerdownEvent = new PointerEvent('pointerdown', {
                    view: window,
                    bubbles: true,
                    cancelable: true,
                    clientX: x,
                    clientY: y,
                    button: 0,
                    buttons: 1,
                    isPrimary: true
                });
                element.dispatchEvent(pointerdownEvent);
                console.log('Dispatched pointerdown');
                
                // Dispatch mousedown
                const mousedownEvent = new MouseEvent('mousedown', {
                    view: window,
                    bubbles: true,
                    cancelable: true,
                    clientX: x,
                    clientY: y,
                    button: 0,
                    buttons: 1
                });
                element.dispatchEvent(mousedownEvent);
                console.log('Dispatched mousedown');
                
                // Small delay to simulate real user interaction
                setTimeout(() => {
                    // Dispatch pointerup
                    const pointerupEvent = new PointerEvent('pointerup', {
                        view: window,
                        bubbles: true,
                        cancelable: true,
                        clientX: x,
                        clientY: y,
                        button: 0,
                        buttons: 0,
                        isPrimary: true
                    });
                    element.dispatchEvent(pointerupEvent);
                    console.log('Dispatched pointerup');
                    
                    // Dispatch mouseup
                    const mouseupEvent = new MouseEvent('mouseup', {
                        view: window,
                        bubbles: true,
                        cancelable: true,
                        clientX: x,
                        clientY: y,
                        button: 0,
                        buttons: 0
                    });
                    element.dispatchEvent(mouseupEvent);
                    console.log('Dispatched mouseup');
                    
                    // Dispatch click
                    const clickEvent = new MouseEvent('click', {
                        view: window,
                        bubbles: true,
                        cancelable: true,
                        clientX: x,
                        clientY: y,
                        button: 0,
                        buttons: 0
                    });
                    element.dispatchEvent(clickEvent);
                    console.log('Dispatched click');
                    
                    // Also try the native click method as final backup
                    element.click();
                    console.log('Called native click()');
                }, 10);
            };
            
            simulateClick(emojiButton);
        } else {
            console.warn('Emoji picker button not found. Selectors tried:', selectors);
            console.log('Available buttons on page:', document.querySelectorAll('div[role="button"]'));

            // Show a subtle notification to the user
            showNotification('Emoji picker button not found. Please try opening a chat first.');
        }
    }

    function focusSearch() {
        console.log('focusSearch() called');
        
        // Try multiple selectors for the search input
        const selectors = [
            'input[placeholder="Otsi Messengerist"]',
            'input[aria-label="Otsi Messengerist"]',
            'input[type="search"]',
            'input[placeholder*="Search" i]',
            'input[aria-label*="Search" i]',
            'input[role="combobox"][type="search"]',
        ];

        let searchInput = null;

        for (const selector of selectors) {
            searchInput = document.querySelector(selector);
            if (searchInput) {
                console.log('Found search input with selector:', selector);
                console.log('Search input element:', searchInput);
                break;
            }
        }

        if (searchInput) {
            // Focus the search input
            searchInput.focus();
            console.log('Search input focused');
            
            // Optional: select any existing text
            searchInput.select();
        } else {
            console.warn('Search input not found. Selectors tried:', selectors);
            showNotification('Search input not found.');
        }
    }

    function showNotification(message) {
        // Create a temporary notification element
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: #0084ff;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 14px;
      z-index: 999999;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      animation: slideIn 0.3s ease-out;
    `;

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Add CSS animation for notifications
    const style = document.createElement('style');
    style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `;
    document.head.appendChild(style);

})();
