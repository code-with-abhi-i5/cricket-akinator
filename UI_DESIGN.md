# CricGuess AI - UI Design & Color Palette

## Design Concept
**CricGuess AI** employs a "Cinematic Analytics Engine" aesthetic. The design system heavily utilizes a dark, immersive background to emphasize vibrant, glowing accent colors. It makes use of glassmorphism (frosted glass effects) and tactical, high-tech interface elements to give the application a futuristic and data-driven feel.

## Color Palette

### Core Background & Surfaces
The foundational colors provide depth and contrast for the bright accents.
- **Midnight Navy:** `#0A0C10` (Primary App Background)
- **Charcoal:** `#12141C`
- **Surface:** `#111318`
- **Surface Bright:** `#37393E`
- **Surface Containers:** Range from `#0C0E12` (Lowest) to `#333539` (Highest)

### Accent Colors
Vibrant colors are used for interactive elements, highlights, and primary actions.
- **Electric Cyan:** `#00F2FF` (Primary Accent, Links, Highlights)
- **Electric Cyan Dim:** `#00DBE7` (Hover states)
- **Cricket Green:** `#2ECC71` (Success states, secondary accents)
- **Cricket Green Bright:** `#4AE183`
- **Secondary Container:** `#06BB63`

### Text & Outlines
- **On-Surface (Primary Text):** `#E2E2E8`
- **On-Surface Variant (Secondary Text):** `#B9CACB`
- **Outline:** `#849495`
- **Outline Variant:** `#3A494B`
- **Error:** `#FFB4AB`

## Typography
The application uses a modern, high-tech typography stack:
- **Headlines (`--font-headline`):** `'Anton', sans-serif` — Used for bold, impactful, and uppercase titles.
- **Body (`--font-body`):** `'Inter', sans-serif` — Highly readable font used for paragraph text and general content.
- **Labels & Stats (`--font-label`):** `'Space Grotesk', sans-serif` — Technical, geometric sans-serif used for tactical buttons, section labels, and statistical values.

## UI Components & Effects

### Glass Panels
The application features prominent glassmorphism panels used as containers:
- **Background:** `rgba(255, 255, 255, 0.04)`
- **Blur:** `12px` backdrop filter
- **Border:** Subtle translucent border (`rgba(255, 255, 255, 0.08)`)
- **Hover Effect:** Glowing Electric Cyan borders and subtle box-shadows.

### Tactical Buttons
Buttons are designed to look like high-tech control interfaces:
- **Style:** Uppercase, spaced tracking (`0.08em` letter-spacing), geometric layout.
- **Primary:** Electric Cyan background with Midnight Navy text. Includes a sweeping glow animation on hover.
- **Secondary:** Transparent with Electric Cyan borders and text, adding an inner glow on hover.

### Animations
The interface feels alive with subtle micro-animations:
- **Fade In / Slide In:** Smooth entrance animations (`fadeInUp`, `slideInLeft`).
- **Ambient Glows:** Breathing glows (`glow-breathe`) and pulsing cyan effects.
- **Futuristic Sweeps:** Radar sweeps and scan line animations to enhance the cinematic analytics engine theme.
