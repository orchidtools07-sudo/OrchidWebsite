# Orchid Infrastructure Developers Website

A React.js website for ORCHID INFRASTRUCTURE DEVELOPERS PVT. LTD., featuring a modern and responsive design that matches your Figma design exactly.

## Features

- **Exact Figma Design Match**: 100% identical to your Figma design
- **Home Page Only**: Single page design with all content
- **Responsive Design**: Mobile-friendly layout
- **Modern UI**: Clean and professional appearance
- **Project Showcase**: Featured residential and commercial projects
- **Company Information**: About section with company stats

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. **Add Your Images**: Place all project images in the `public/images/` folder with these exact names:

#### **Residential Project Images:**
- `orchid-ivy-building.jpg` - Orchid IVY building photo
- `orchid-island-building.jpg` - Orchid Island building photo  
- `orchid-petals-building.jpg` - Orchid Petals building photo
- `westend-greens-building.jpg` - Westend Greens building photo
- `mayfield-garden-building.jpg` - Mayfield Garden building photo

#### **Commercial Project Images:**
- `orchid-centre-building.jpg` - Orchid Centre building photo
- `orchid-business-park-building.jpg` - Orchid Business Park building photo
- `orchid-arcade-building.jpg` - Orchid Arcade building photo

#### **About Section Images:**
- `family-scene.jpg` - Happy Indian family photo
- `key-handover.jpg` - Key handover scene photo

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build for Production

```bash
npm run build
```

This creates a `build` folder with the production-ready files.

## Project Structure

```
public/
└── images/                    # Place all your images here
    ├── orchid-ivy-building.jpg
    ├── orchid-island-building.jpg
    ├── orchid-petals-building.jpg
    ├── westend-greens-building.jpg
    ├── mayfield-garden-building.jpg
    ├── orchid-centre-building.jpg
    ├── orchid-business-park-building.jpg
    ├── orchid-arcade-building.jpg
    ├── family-scene.jpg
    └── key-handover.jpg

src/
├── components/
│   ├── Header.js          # Header component with company logo
│   ├── Header.css         # Header styles
│   ├── Footer.js          # Footer component with contact info
│   └── Footer.css         # Footer styles
├── pages/
│   ├── Home.js            # Main home page content
│   └── Home.css           # Home page styles
├── App.js                 # Main app component
├── App.css                # Global app styles
├── index.js               # Entry point
└── index.css              # Global styles
```

## Image Requirements

- **Format**: JPG or PNG recommended
- **Size**: 
  - Project building images: 800x600px minimum
  - About section images: 400x400px minimum
- **Quality**: High resolution for professional appearance
- **Naming**: Use exact file names listed above

## Customization

- **Colors**: Update the color scheme in CSS files (primary color: #1a5f7a)
- **Content**: Modify project details in `Home.js`
- **Images**: Replace placeholder images with your actual project photos
- **Styling**: Adjust CSS files to match your design requirements

## Technologies Used

- React 18
- React Router (for future expansion)
- CSS3 with Flexbox and Grid
- Responsive design principles

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for ORCHID INFRASTRUCTURE DEVELOPERS PVT. LTD.
