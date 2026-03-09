# Mangalam HDPE Pipes - Product Website

A fully responsive, interactive website for Mangalam HDPE Pipes - showcasing premium quality HDPE pipes, fittings, and accessories for industrial applications.

## Features

- **Sticky Header Navigation** - Smooth scroll-based header that appears when scrolling
- **Mobile Responsive Design** - Fully optimized for all screen sizes (desktop, tablet, mobile)
- **Product Carousel** - Interactive image gallery with navigation arrows
- **Frequently Bought Together** - Horizontal scrolling product carousel
- **FAQ Accordion** - Collapsible Q&A section for common queries
- **Contact Form** - Functional contact form with validation
- **Download Popup Modal** - Modal popup for catalogue downloads
- **Request Quote Modal** - Interactive quote request form
- **Manufacturing Process Tabs** - Step-by-step production process showcase
- **Application Cards** - Interactive cards showcasing various applications

## Technologies Used

- **HTML5** - Semantic markup and structure
- **CSS3** - Styling with CSS variables, flexbox, grid, and animations
- **Vanilla JavaScript** - No frameworks or libraries required

## Project Structure

```
Gushwork Assignment/
├── index.html           # Main HTML structure
├── styles.css           # All styling and responsive design
├── script.js            # Interactive functionality
├── assets/              # Asset files
│   ├── images/          # Image assets
│   │   ├── logo.png
│   │   └── ...
│   └── icons/           # Icon assets
│       ├── Vector-nav.png
│       ├── Frame_user.png
│       └── ...
└── README.md            # Project documentation
```

## How to Run

This is a static website with no build process or dependencies required:

1. Clone or download this repository
2. Open `index.html` in any modern web browser
3. The website will work immediately

Alternatively, you can use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using VS Code Live Server extension
```

Then navigate to `http://localhost:8000`

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Key Sections

1. **Header** - Logo, navigation menu with dropdown, and contact button
2. **Hero Section** - Main product showcase with image carousel
3. **About Section** - Company information and product details
4. **Products Section** - HDPE pipes, fittings, accessories, valves
5. **Frequently Bought Together** - Product recommendations carousel
6. **Manufacturing Process** - 8-step production visualization
7. **Applications** - Industry use cases
8. **FAQ** - Common questions and answers
9. **Contact** - Contact form and company information

## Customization

### Colors
Colors are defined as CSS variables in `styles.css`:

```css
--color-maroon: #990033;
--color-navy: #1E3A8A;
--color-white: #FFFFFF;
```

### Fonts
The project uses system fonts:
- Sans-serif: Arial, Helvetica
- Serif: Georgia, Times New Roman

To add custom fonts, update the `--font-sans` and `--font-serif` variables.

## License

This project is part of the Gushwork Assignment.

## Contact

For any queries regarding this project, please use the contact form on the website.
