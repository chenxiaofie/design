# Design Studio - Professional Design Tool

A modern online design tool that provides an intuitive interface and powerful features to help designers and creators easily create stunning designs.

## ✨ Key Features

### 🎨 Design Tools

* **Infinite Zoom Canvas** - Supports precise design from overview to details
* **Smart Ruler System** - Accurate coordinate positioning and grid alignment
* **Drag-and-Drop Operation** - Intuitive graphic editing and layout adjustment
* **Real-time Preview** - Instantly view design effects

### 🛠️ Toolbar

* **Asset Management** - Quickly add and manage design assets
* **Image Editing** - Supports various image formats and editing features
* **Text Tools** - Rich font and style options
* **Color Management** - Professional color selection and matching
* **Asset Upload** - Convenient file upload and management

### 🌐 Internationalization Support

* **Multi-language Interface** - Supports Chinese and English
* **Localized Experience** - Automatically switches language based on user preferences

## 🚀 Tech Stack

### Frontend Framework

* **React 18** - Modern user interface building
* **TypeScript** - Type-safe development experience
* **Vite** - Fast development build tool

### UI Components

* **Ant Design** - Enterprise-level UI component library
* **Tailwind CSS** - Atomic CSS framework
* **Fabric.js** - Powerful canvas manipulation library

### State Management

* **Zustand** - Lightweight state management
* **React Hooks** - Functional component state management

### Internationalization

* **i18next** - Professional internationalization solution
* **react-i18next** - React integration for internationalization

## 📦 Installation & Running

### Environment Requirements

* Node.js >= 16.0.0
* pnpm >= 7.0.0

### Install Dependencies

```bash
pnpm install
```

### Development Mode

```bash
pnpm dev
```

### Build Production Version

```bash
pnpm build
```

### Code Linting

```bash
pnpm lint
```

## 🏗️ Project Structure

```
design/
├── public/                 # Static assets
│   └── locales/           # Internationalization files
├── src/
│   ├── components/        # Reusable components
│   │   ├── Ruler.tsx     # Smart ruler component
│   │   ├── IconFont.tsx  # Icon component
│   │   └── ...
│   ├── pages/            # Page components
│   │   └── design/       # Design page
│   ├── hooks/            # Custom hooks
│   ├── stores/           # State management
│   └── i18n/            # Internationalization configuration
├── package.json
└── README.md
```

## 🎯 Core Features

### Smart Ruler System

* **Infinite Zoom Support** - Smooth zooming from 0.1x to 10x
* **Dynamic Step Calculation** - Adjusts scale density based on zoom level
* **Precise Coordinate Alignment** - Uses intelligent algorithms to ensure accurate scale placement
* **Multi-level Scale Display** - Hierarchical display of main, secondary, and micro scales

### Canvas Operations

* **Smooth Zooming** - Zoom in and out with mouse wheel, no modifier key required
* **Precise Drag-and-Drop Control** - Supports precise movement and adjustment of graphic elements
* **Real-time Coordinate Feedback** - Displays mouse position and selection status in real-time

### Responsive Design

* **Adaptive Layouts** - Perfect fit for various screen sizes
* **Componentized Architecture** - Modular component design for easy maintenance and extension

## 🔧 Development Guide

### Adding a New Component

1. Create a component file in the `src/components/` directory
2. Define interfaces and types using TypeScript
3. Follow the project's coding standards and naming conventions

### Internationalization Setup

1. Add translation files in the `public/locales/` directory
2. Use the `useTranslation` hook for text translation
3. Support nested namespace structures

### State Management

1. Use Zustand for global state management
2. Define state logic in the `src/stores/` directory
3. Use React Hooks for component-level state management

## 🎨 Design System

### Color Theme

* Based on Ant Design design tokens
* Supports theme switching and customization
* Unified color management system

### Component Guidelines

* Consistent visual style
* Reusable component designs
* Responsive interactive experience

## 📝 Contribution Guidelines

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push the branch (`git push origin feature/AmazingFeature`)
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contact Us

* Project homepage: [https://github.com/chenxiaofie/design](https://github.com/chenxiaofie/design)
* Report issues: [Issues](https://github.com/chenxiaofie/design/issues)
* Suggest features: [Discussions](https://github.com/chenxiaofie/design/discussions)

---

**Design Studio** - Making design simpler, and creativity freer ✨

---
