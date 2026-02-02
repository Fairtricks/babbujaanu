# 💖 Valentine Proposal Website

A playful, interactive Valentine proposal website with KBC-style quiz interface and humorous button behaviors.

## ✨ Features

- **Purple/Violet KBC-inspired theme** with animated stars background
- **Four interactive answer options:**
  - ✅ Real "Yes" button with glow effect
  - 🏃 Runner button that moves away on hover
  - 🙈 Shy button that shrinks and shakes
  - 🎭 Fake button that flips and disappears
- **Romantic success screen** with warm rose gradient
- **Multiple celebration GIFs**
- **Mixed confetti animation** (hearts and sparkles)
- **Floating hearts effect**
- **Sweet romantic melody**
- **Fully responsive design**

## 🚀 Deployment on GitHub Pages

### Method 1: Quick Deploy

1. Create a new repository on GitHub
2. Upload these files:
   - `index.html`
   - `style.css`
   - `script.js`
   - `assets/success.mp3`
3. Go to repository Settings → Pages
4. Under "Source", select "Deploy from a branch"
5. Select `main` branch and `/root` folder
6. Click Save
7. Your site will be live at: `https://yourusername.github.io/repository-name/`

### Method 2: Using Git

```bash
git init
git add .
git commit -m "Initial commit: Valentine proposal website"
git branch -M main
git remote add origin https://github.com/yourusername/repository-name.git
git push -u origin main
```

Then enable GitHub Pages in repository settings as described above.

## 🎨 Customization

### Replace GIFs

In `index.html`, find the `.gifs-container` section and replace the `src` URLs:

```html
<img src="YOUR_GIF_URL_HERE" alt="Description">
```

### Change Audio

Replace `assets/success.mp3` with your own romantic melody. Ensure it's:
- Short duration (5-15 seconds recommended)
- MP3 format for browser compatibility
- Lightweight file size

### Modify Colors

#### Question Screen (KBC Theme):
In `style.css`, update the `#question-screen` background gradient:

```css
background: linear-gradient(135deg, #1a0b2e 0%, #2d1b4e 50%, #4a2c6d 100%);
```

#### Success Screen (Rose Theme):
Update the `#success-screen` background gradient:

```css
background: linear-gradient(135deg, #ffeef8 0%, #ffc7e5 25%, #ffb3d9 50%, #ff9ecc 75%, #ff8abc 100%);
```

### Change Text

All text can be modified in `index.html`:
- Question text: `<h1 class="question-text">`
- Success message: `<div class="success-message">`
- Button labels: `<span class="option-text">`

## 📱 Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## 🎵 Audio Note

Due to browser autoplay policies, the audio may require user interaction to play. The website handles this automatically.

## 💝 Perfect For

- Valentine's Day proposals
- Anniversary surprises
- Romantic gestures
- Fun relationship moments

## 📄 License

Free to use for personal romantic purposes! 💕

---

Made with ❤️ for love
