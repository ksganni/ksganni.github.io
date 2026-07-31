# Krishna Sathvika Ganni - Portfolio Website

A modern, single-page portfolio website with smooth navigation and interactive elements.

## Features

- **Single-page layout** with section-based navigation
- **Typing animation** for the home summary
- **Interactive project cards** that expand on click
- **Responsive design** for all devices
- **Smooth animations** and transitions
- **Resume download** functionality
- **Email integration** for contact

## File Structure

```
krishna-portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── assets/
│   ├── images/         # Image assets
│   │   ├── profile.jpg     # Your profile picture
│   │   ├── project1.jpg    # Project 1 image
│   │   ├── project2.jpg    # Project 2 image
│   │   ├── project3.jpg    # Project 3 image
│   │   └── project4.jpg    # Project 4 image
│   └── documents/
│       └── Krishna_Sathvika_Ganni_Resume.pdf  # Your resume
└── README.md           # This file
```

## Image Paths to Add Your Pictures

Please add your images to the following paths:

### Profile Picture
- **Path**: `assets/images/profile.jpg`
- **Recommended size**: 400x400px (square)
- **Format**: JPG or PNG

### Project Images
- **Project 1**: `assets/images/project1.jpg`
- **Project 2**: `assets/images/project2.jpg`
- **Project 3**: `assets/images/project3.jpg`
- **Project 4**: `assets/images/project4.jpg`
- **Recommended size**: 400x300px (4:3 ratio)
- **Format**: JPG or PNG

### Resume Document
- **Path**: `assets/documents/Krishna_Sathvika_Ganni_Resume.pdf`
- **Format**: PDF

## Customization

### Personal Information
Update the following in `index.html`:

1. **LinkedIn URL**: Replace `https://linkedin.com/in/your-profile` with your actual LinkedIn profile
2. **GitHub URL**: Replace `https://github.com/your-username` with your actual GitHub profile
3. **Email**: Update `krishna.sathvika@example.com` in `script.js` with your actual email

### Content Updates

#### Skills Section
Edit the skills lists in `index.html` under the `#skills` section:
- Programming languages
- Tools
- Frameworks
- Databases

#### Projects Section
Update project information in `index.html`:
- Project names
- Project descriptions
- Add your actual project details

#### Experience Section
Modify the experience details in `index.html`:
- Job title
- Company name
- Dates
- Description

#### Home Summary
The typing animation text can be customized in `script.js`:
```javascript
const summaryText = "Your custom summary text here...";
```

## How to Run

1. Open `index.html` in your web browser
2. Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   ```

## Navigation

- Click on navigation items (Skills, Projects, Experience, Contact) to switch between sections
- Only the selected section will be visible
- Home section includes typing animation that plays when section loads

## Interactive Features

- **Project cards**: Click on any project to expand and see description
- **Resume download**: Click resume buttons to download PDF
- **Email contact**: Click mail buttons to open email client
- **Social links**: LinkedIn and GitHub icons are clickable

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design works on mobile and tablet devices

## Notes

- The website uses Font Awesome for icons (loaded via CDN)
- Google Fonts (Inter) is used for typography
- All animations are CSS-based for smooth performance
- The site is fully responsive and mobile-friendly
