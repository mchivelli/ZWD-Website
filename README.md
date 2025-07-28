# ZiviDienst Portal

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/blog/tailwindcss-v4)

Modern web portal for Zivildienst management, built with React, TypeScript, and Tailwind CSS v4.0.

## 🚀 Features

- 🎨 Modern, responsive UI with beautiful animations
- 🌓 Light/Dark mode support
- 📱 Mobile-first design
- ⚡ Blazing fast performance with Vite
- 🔒 Type-safe with TypeScript
- 🎨 Styled with Tailwind CSS v4.0

## 🛠 Tech Stack

- ⚛️ React 18
- 🔷 TypeScript
- 🎨 Tailwind CSS v4.0
- ⚡ Vite
- 📱 Framer Motion for animations
- 📦 shadcn/ui component library

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ & npm 9+
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mchivelli/ZWD-Website.git
   cd ZWD-Website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🎨 Styling with Tailwind CSS v4.0

This project uses the latest Tailwind CSS v4.0 with CSS-first configuration. All theme variables and design tokens are defined in `src/index.css` using the `@theme` directive.

### Key Files

- `src/index.css` - Main CSS file with Tailwind imports and theme configuration
- `tailwind.config.js` - Minimal configuration (v4.0 uses CSS-first approach)
- `postcss.config.js` - PostCSS configuration

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── ui/          # shadcn/ui components
│   └── layout/      # Layout components
├── pages/           # Page components
├── App.tsx          # Main App component
└── main.tsx         # Entry point
```

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) for the amazing utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Vite](https://vitejs.dev/) for the fast development experience
