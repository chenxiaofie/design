# Design Studio - 专业设计工具

一个现代化的在线设计工具，提供直观的界面和强大的功能，帮助设计师和创作者轻松创建精美的设计作品。

## ✨ 主要功能

### 🎨 设计工具

- **无限缩放画布** - 支持从概览到细节的精确设计
- **智能标尺系统** - 精确的坐标定位和网格对齐
- **拖拽式操作** - 直观的图形编辑和布局调整
- **实时预览** - 即时查看设计效果

### 🛠️ 工具栏

- **商品管理** - 快速添加和管理设计素材
- **图片编辑** - 支持多种图片格式和编辑功能
- **文字工具** - 丰富的字体和样式选项
- **颜色管理** - 专业的色彩选择和搭配
- **素材上传** - 便捷的文件上传和管理

### 🌐 国际化支持

- **多语言界面** - 支持中文和英文
- **本地化体验** - 根据用户偏好自动切换语言

## 🚀 技术栈

### 前端框架

- **React 18** - 现代化的用户界面构建
- **TypeScript** - 类型安全的开发体验
- **Vite** - 快速的开发构建工具

### UI 组件

- **Ant Design** - 企业级 UI 组件库
- **Tailwind CSS** - 原子化 CSS 框架
- **Fabric.js** - 强大的 Canvas 操作库

### 状态管理

- **Zustand** - 轻量级状态管理
- **React Hooks** - 函数式组件状态管理

### 国际化

- **i18next** - 专业的国际化解决方案
- **react-i18next** - React 国际化集成

## 📦 安装和运行

### 环境要求

- Node.js >= 16.0.0
- pnpm >= 7.0.0

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

### 代码检查

```bash
pnpm lint
```

## 🏗️ 项目结构

```
design/
├── public/                 # 静态资源
│   └── locales/           # 国际化文件
├── src/
│   ├── components/        # 通用组件
│   │   ├── Ruler.tsx     # 智能标尺组件
│   │   ├── IconFont.tsx  # 图标组件
│   │   └── ...
│   ├── pages/            # 页面组件
│   │   └── design/       # 设计页面
│   ├── hooks/            # 自定义 Hooks
│   ├── stores/           # 状态管理
│   └── i18n/            # 国际化配置
├── package.json
└── README.md
```

## 🎯 核心特性

### 智能标尺系统

- **无限缩放支持** - 从 0.1x 到 10x 的平滑缩放
- **动态步长计算** - 根据缩放级别自动调整刻度密度
- **精确坐标对齐** - 使用智能算法确保刻度位置准确
- **多级刻度显示** - 主刻度、次刻度和微刻度的层次化显示

### 画布操作

- **流畅的缩放体验** - 鼠标滚轮直接缩放，无需修饰键
- **精确的拖拽控制** - 支持图形元素的精确移动和调整
- **实时坐标反馈** - 实时显示鼠标位置和选择状态

### 响应式设计

- **自适应布局** - 支持不同屏幕尺寸的完美适配
- **组件化架构** - 模块化的组件设计，易于维护和扩展

## 🔧 开发指南

### 添加新组件

1. 在 `src/components/` 目录下创建组件文件
2. 使用 TypeScript 定义接口和类型
3. 遵循项目的代码规范和命名约定

### 国际化配置

1. 在 `public/locales/` 目录下添加翻译文件
2. 使用 `useTranslation` Hook 进行文本翻译
3. 支持嵌套的命名空间结构

### 状态管理

1. 使用 Zustand 进行全局状态管理
2. 在 `src/stores/` 目录下定义状态逻辑
3. 使用 React Hooks 进行组件状态管理

## 🎨 设计系统

### 颜色主题

- 基于 Ant Design 的设计令牌
- 支持主题切换和自定义
- 统一的色彩管理系统

### 组件规范

- 一致的视觉风格
- 可复用的组件设计
- 响应式的交互体验

## 📝 贡献指南

1. Fork 项目仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🤝 联系我们

- 项目主页：[https://github.com/chenxiaofie/design](https://github.com/chenxiaofie/design)
- 问题反馈：[Issues](https://github.com/chenxiaofie/design/issues)
- 功能建议：[Discussions](https://github.com/chenxiaofie/design/discussions)

---

**Design Studio** - 让设计更简单，让创意更自由 ✨
