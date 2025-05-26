# Modern Beam Deflection Calculator

This is a web-based tool to calculate deflection and other properties for simply supported beams of various cross-sections (Rectangular, Triangular, Circular). It's built using HTML, CSS, and vanilla JavaScript, providing a clean, modern, and responsive user interface.

## Features

*   **Multiple Beam Types:** Supports calculations for Rectangular, Triangular, and Circular beams.
*   **Comprehensive Calculations:** Provides results for Area, Stiffness, Moment of Inertia, Deflection, Volume, Mass, and First Eigenfrequency (where applicable for the beam type).
*   **Modern Interface:** Clean, user-friendly design.
*   **Responsive:** Adapts to different screen sizes (desktop, tablet, mobile).
*   **Client-Side Logic:** All calculations are performed in the browser using JavaScript. No server-side processing is required after loading the page.
*   **Netlify Ready:** Can be easily deployed to Netlify or any other static web hosting service.

## Usage

### Online
It's recommended to deploy this tool to a static web hosting service like Netlify, Vercel, or GitHub Pages for online access.

### Local
1.  Clone this repository:
    ```bash
    git clone https://github.com/spymag/DeflectionsCalculator.git
    ```
2.  Navigate to the cloned directory:
    ```bash
    cd DeflectionsCalculator
    ```
3.  Open the `index.html` file in your web browser.

## How It Works

The calculator takes user inputs for beam type, dimensions, and load conditions. Based on these inputs, it uses JavaScript functions (defined in `calculator.js`) to compute the mechanical properties and deflection. The user interface is built with HTML and styled with CSS for a modern look and feel. The application logic (form handling, dynamic updates) is managed by `app.js`.

## Technologies Used

*   HTML5
*   CSS3 (Custom styling, Flexbox for layout)
*   Vanilla JavaScript (ES6+)

This project was modernized from an older PHP-based version to utilize client-side technologies for broader compatibility and easier deployment.
