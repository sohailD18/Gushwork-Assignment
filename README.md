# Mangalam HDPE Pipes - Product Website

A fully responsive, interactive product website for Mangalam HDPE Pipes - showcasing premium quality HDPE pipes, fittings, and accessories for industrial and infrastructure applications.

## Features

### Navigation & Header
- **Sticky Header** - Appears smoothly when scrolling down past the hero section
- **Mobile Menu** - Hamburger menu with smooth animations for mobile devices
- **Dropdown Navigation** - Products menu with sub-items (HDPE Pipes, Fittings, Accessories, Valves)

### Hero Section
- **Image Carousel** - Navigate through product images with previous/next arrows
- **Image Zoom** - Hover to see magnified preview (desktop only)
- **Thumbnail Previews** - Quick navigation dots for image gallery
- **Certification Badges** - BIS, ISO, and CE certification display
- **Product Features** - Highlighted key features with checkmark icons
- **Pricing Info** - Price range, shipping info, and returns policy
- **Trusted Companies** - Logo carousel of partner companies

### Interactive Components
- **FAQ Accordion** - Collapsible Q&A section with smooth animations
- **Manufacturing Process Tabs** - 8-step production process with tab navigation
- **Application Cards** - Interactive cards with hover effects
- **Download Popup Modal** - Email form for catalogue/brochure download
- **Request Quote Modal** - Callback request form with country code selector
- **Catalogue Request** - Email input for full catalogue delivery

### Content Sections
- **Technical Specifications Table** - Comprehensive product specs
- **Features Grid** - 6 feature cards with icons and descriptions
- **Testimonials** - Customer reviews with ratings and details
- **Portfolio Section** - Product cards with "Learn More" buttons
- **Resources & Downloads** - PDF download section
- **Footer** - Complete with contact info, categories, products, and social links

## Technologies Used

- **HTML5** - Semantic markup, accessible structure
- **CSS3** - CSS variables, Flexbox, Grid, animations, responsive media queries
- **Vanilla JavaScript** - No external libraries or frameworks

## Project Structure

```
Gushwork-Assignment-main/
├── index.html           # Main HTML structure (single page website)
├── styles.css           # All styling with CSS variables and responsive design
├── script.js            # Interactive functionality and event handlers
├── assets/              # Asset files
│   ├── images/          # Image assets
│   │   ├── logo.png
│   │   ├── Fishnet Manufacturing.jpg
│   │   ├── Piping_portfolio-1.jpg
│   │   ├── Piping_portfolio-2.jpg
│   │   ├── euroflex.png
│   │   └── ...
│   └── icons/           # Icon assets
│       ├── Vector-nav.png
│       ├── Vector-done.png
│       ├── Frame_user.png
│       ├── BIS-Hallmark-Color.png
│       ├── ISI-Mark-Black.png
│       ├── CE Certification.png
│       └── ...
└── README.md            # Project documentation
```

## How to Run

This is a static website with no build process or dependencies required:

### Option 1: Direct Browser Open
1. Clone or download this repository
2. Double-click `index.html` to open in your browser
3. The website will work immediately

### Option 2: Local Server
Using a local server is recommended for proper image loading:

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000`

### Option 3: VS Code Live Server
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | Latest | ✅ Fully Supported |
| Firefox | Latest | ✅ Fully Supported |
| Safari | Latest | ✅ Fully Supported |
| Edge | Latest | ✅ Fully Supported |
| Mobile Safari | iOS 12+ | ✅ Fully Supported |
| Chrome Mobile | Latest | ✅ Fully Supported |

## Key Sections

1. **Header** - Logo, navigation with dropdown, contact button, mobile toggle
2. **Hero Section** - Product showcase with carousel, zoom, pricing, and certifications
3. **Technical Specifications** - Detailed specs table with download button
4. **Features Section** - 6 feature cards (Chemical Resistance, Flexibility, Welding, Cost-Effective, Eco-Friendly, Quality)
5. **FAQ Section** - 5 common questions with accordion functionality
6. **Applications** - Industry use cases (Water Supply, Gas Distribution, Sewerage, Industrial)
7. **Manufacturing Process** - 8-step visualization (Raw Material → Packaging)
8. **Testimonials** - 4 customer reviews
9. **Portfolio** - Product cards (Fittings, Installation Services, PE-RT Pipes)
10. **Resources & Downloads** - PDF downloads section
11. **CTA Section** - Contact form with company info
12. **Footer** - About, Categories, Products, Contact, Social Links

## Customization

### Colors
Colors are defined as CSS variables in `styles.css`:

```css
:root {
    --color-maroon: #990033;
    --color-navy: #1E3A8A;
    --color-blue: #0066CC;
    --color-white: #FFFFFF;
    --color-gray: #F5F5F5;
    /* Add more colors as needed */
}
```

### Fonts
The project uses system fonts by default:
- **Sans-serif**: Arial, Helvetica, sans-serif
- **Serif**: Georgia, 'Times New Roman', serif

To add custom fonts (e.g., Google Fonts), update the CSS variables:

```css
:root {
    --font-sans: 'Inter', 'Roboto', Arial, sans-serif;
    --font-serif: 'Merriweather', Georgia, serif;
}
```

### Images
Replace placeholder images in the `assets/images/` folder:
- `logo.png` - Company logo
- `Fishnet Manufacturing.jpg` - Hero product image
- `Piping_portfolio-*.jpg` - Portfolio images

### Contact Information
Update contact details in the following locations:
1. **Footer** (`index.html` line ~940): Address, phone, email
2. **CTA Section** (`index.html` line ~853): Direct call and email info
3. **Contact Forms** (`script.js`): Form submission handlers

## JavaScript Functionality

### Sticky Header
- Shows/hides based on scroll direction
- Calculates first fold height dynamically
- Uses `requestAnimationFrame` for smooth performance

### Image Carousel
- Previous/Next navigation
- Thumbnail click navigation
- Smooth opacity transitions
- Zoom preview on hover (desktop)

### FAQ Accordion
- One item open at a time
- Smooth expand/collapse animations
- Keyboard accessible

### Manufacturing Process
- 8 tabs for each production step
- Dynamic content update
- Mobile navigation buttons (Previous/Next)

### Modals
- Download popup with email form
- Request quote modal with validation
- Close on overlay click or Escape key

## License

This project is part of the Gushwork Assignment.

## Credits

Developed as a product showcase website for Mangalam HDPE Pipes - Premium HDPE Pipes & Fittings Manufacturer in South India.

---

**Last Updated:** March 2025
