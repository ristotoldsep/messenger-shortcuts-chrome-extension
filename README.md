# Messenger Keyboard Shortcuts Chrome Extension

A Chrome extension that adds custom keyboard shortcuts to messenger.com for macOS.

## Why Does This Exist?

Meta, a company worth literally trillions of dollars, decided in their infinite wisdom to **discontinue the Messenger desktop app** - you know, the one that actually had keyboard shortcuts that made chatting efficient? So now we're all stuck using the web version like peasants, clicking emojis with our mice like it's 1999.

Rather than accept this regression into the dark ages of UX, I spent an afternoon building what Meta's army of engineers apparently couldn't be bothered to include in their web app. You're welcome.

## Features

- **Cmd + Shift + E**: Open the emoji picker
- **Cmd + Shift + K**: Focus the search input

## Installation

1. Clone or download this repository to your local machine

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" by toggling the switch in the top-right corner

4. Click "Load unpacked" button

5. Select the `messenger-shortcuts-chrome-extension` folder

6. The extension should now be installed and active!

## Usage

1. Go to [messenger.com](https://www.messenger.com)

2. Open any conversation

3. Press **Cmd + Shift + E** to open the emoji picker

4. Press **Cmd + Shift + K** to focus the search input

## Adding More Shortcuts

To add more shortcuts, edit the `content.js` file and add additional event handlers in the keyboard event listener. Follow the pattern:

```javascript
// Example: Cmd + Shift + S for some other action
if (event.metaKey && event.shiftKey && event.code === 'KeyS') {
  event.preventDefault();
  // Your custom action here
}
```

## Troubleshooting

- If the emoji picker doesn't open, make sure you have a chat conversation open
- Check the browser console (F12) for any error messages
- The extension logs helpful debugging information to the console

## Development

The extension uses:
- **Manifest V3** - Latest Chrome extension format
- **Content Scripts** - Injected into messenger.com pages
- **Event Listeners** - Captures keyboard shortcuts

## Notes

- This extension is designed specifically for macOS (uses Cmd key)
- The extension only runs on messenger.com domains
- Keyboard shortcuts use the `metaKey` (Cmd on Mac) modifier

## License

MIT License - Feel free to modify and use as needed!
