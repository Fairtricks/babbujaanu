# 💖 Valentine Proposal Website

A playful, interactive single-page Valentine's Day proposal website with KBC-style quiz interface and humorous button behaviors.

## 🌟 Features

- **KBC-Style Quiz Interface**: Dark, elegant quiz-style presentation
- **Interactive Answer Options**:
  - **Yes Button (A)**: The real answer - grows larger and glows more with each "No" option disappearance
  - **Runner Button (B)**: Moves away on hover, shows funny messages, escapes counter, vanishes after 10 escapes
  - **Shy Button (C)**: Shrinks on hover, shakes on click, shows progressive messages, vanishes after 15 clicks
  - **Fake Button (D)**: Flips and reveals it's fake, then disappears
- **Success Screen**: Beautiful celebration with:
  - Warm rose gradient background
  - Multiple cute GIFs (Hurrah, Hug, Flowers, Valentine)
  - Floating hearts animation
  - Confetti burst
  - Light celebratory sound (optional)
- **Fully Responsive**: Works perfectly on desktop and mobile devices

## 🚀 Quick Start

### Option 1: Open Locally
1. Download or clone this repository
2. Open `index.html` in any modern web browser
3. That's it! No server needed.

### Option 2: GitHub Pages Deployment

1. **Create a GitHub Repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Valentine proposal website"
   ```

2. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click "Settings" → "Pages"
   - Under "Source", select "main" branch
   - Click "Save"
   - Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## 📁 File Structure

```
├── index.html          # Main HTML structure
├── style.css           # All styling and animations
├── script.js           # Interactive behaviors
├── assets/
│   ├── success.mp3     # Celebratory sound (optional)
│   └── README.txt      # Instructions for audio
└── README.md          # This file
```

## 🎵 Adding Custom Sound

The website references `assets/success.mp3` for celebration sound. To add your own:

1. Find or create a light celebratory sound (MP3 format recommended)
2. Name it `success.mp3`
3. Place it in the `assets/` folder
4. The sound will play automatically when "Yes" is clicked

**Note**: The website works perfectly without the audio file - it will simply skip playing sound if the file is missing.

## 🎨 Customization

### Changing GIFs

Edit the `src` attributes in `index.html`:

```html
<!-- Line 60-62: Hurrah GIF -->
<img src="YOUR_GIF_URL_HERE" alt="Hurrah!">

<!-- Line 77-85: Other GIFs -->
<img src="YOUR_GIF_URL_HERE" alt="Hug">
```

### Modifying Colors

Edit `style.css`:

```css
/* Quiz Screen Background (Line 42) */
#quiz-screen {
    background: linear-gradient(135deg, #0a0e27 0%, #1a1a3e 50%, #2d1b4e 100%);
}

/* Success Screen Background (Line 284) */
#success-screen {
    background: linear-gradient(135deg, #ff6b9d 0%, #ffa07a 50%, #ff8fab 100%);
}
```

### Changing Messages

Edit `script.js`:

```javascript
// Line 9-19: Runner button messages
const runnerMessages = [
    "Your custom message here! 😄",
    // ... add more
];

// Line 22-37: Shy button messages
const shyMessages = [
    "Your thinking message here! 🤔",
    // ... add more
];
```

### Adjusting Escape/Click Limits

In `script.js`:

```javascript
// Line 82: Runner button escape limit
if (escapeCount >= 10) {  // Change 10 to your desired limit

// Line 119: Shy button click limit
if (shyClickCount >= 15) {  // Change 15 to your desired limit
```

## 🎯 Button Behaviors Explained

### Option A: Yes ❤️
- Normal clickable button with red theme
- Grows larger and glows more intensely as other buttons disappear
- Transitions to success screen on click

### Option B: Runner Button (No 😐)
- Moves to random position on hover/click
- Shows progressive funny messages
- Displays escape counter
- Moves faster than before (0.15s transition)
- Vanishes after 10 escapes
- When it disappears, Yes button grows

### Option C: Shy Button (Let me think 🤔)
- Shrinks and becomes transparent on hover
- Shakes when clicked
- Shows different thinking messages with each click
- Vanishes after 15 clicks with final message
- When it disappears, Yes button grows

### Option D: Fake Button (No, sorry 🙃)
- Looks like a normal button
- Flips 360° when clicked
- Text changes to reveal it's fake
- Fades out and disappears
- When it disappears, Yes button grows

## 🌐 Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (v90+)
- Firefox (v88+)
- Safari (v14+)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Mobile Responsive

The website automatically adapts to:
- Desktop (900px+ width)
- Tablet (768px - 900px)
- Mobile (< 768px)

## 🛠️ Technical Details

- **No Dependencies**: Pure HTML, CSS, and vanilla JavaScript
- **No Backend Required**: Fully static website
- **Size**: < 50KB total (excluding GIFs from CDN)
- **Load Time**: < 1 second on average connection
- **Accessibility**: Semantic HTML structure

## 📝 License

Free to use for personal proposals! Feel free to customize and share.

## ❤️ Credits

Built with love for that special someone! 💕

---

**Made with ❤️ for Valentine's Day**
