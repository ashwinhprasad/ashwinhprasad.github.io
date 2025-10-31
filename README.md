# Zettelkasten

This project implements the Zettelkasten method for organizing notes, thoughts, and learning materials in a web-friendly format.

## 🌟 Features

- **📝 Pages**: Individual notes and articles with rich markdown support
- **📁 Groups**: Hierarchical organization of related content with parent-child relationships
- **📚 Series**: Ordered sequences of pages with built-in navigation
- **🔗 References**: Bidirectional linking between pages, groups, and series
- **🎨 Syntax Highlighting**: Beautiful code blocks for technical content
- **🗂️ Table of Contents**: Auto-generated navigation for long articles
- **🎯 Tags**: Flexible categorization system
- **📅 Timestamps**: Track creation and update dates
- **🚧 Draft Mode**: Hide work-in-progress content from production

## 🏗️ Project Structure

```
src/
├── content/
│   ├── pages/          # Individual notes and articles
│   ├── groups/         # Organizational categories
│   └── series/         # Ordered collections of pages
├── components/         # Reusable Astro components
├── layouts/           # Page layouts
├── pages/             # Route pages
└── utils/             # Helper functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ashwinhprasad/ashwinhprasad.github.io.git
cd ashwinhprasad.github.io

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321` to see your site.

## 📝 Creating Content

### Create a Page

Create a new markdown file in `src/content/pages/`:

```markdown
---
title: "Your Page Title"
description: "A brief description"
belongsTo:
  type: "groups"
  groups: ["group-slug"]
tags: ["tag1", "tag2"]
created: 2025-10-31
---

Your content here...
```

### Create a Group

Create a new markdown file in `src/content/groups/`:

```markdown
---
title: "Group Name"
description: "Group description"
parents: []
subgroups: []
pages: ["page-slug"]
color: "#3B82F6"
created: 2025-10-31
---

Group overview content...
```

### Create a Series

Create a new markdown file in `src/content/series/`:

```markdown
---
title: "Series Name"
description: "Series description"
pages: ["page-1", "page-2", "page-3"]
groups: ["group-slug"]
created: 2025-10-31
---

Series introduction...
```

## 🚧 Draft Mode

Control content visibility with the `draft` field:

```markdown
---
title: "Work in Progress"
draft: true  # Hide in production, visible in dev
created: 2025-10-31
---
```

### Testing Drafts

**See drafts** (Development):
```bash
npm run dev
# All content visible, including drafts
```

**Hide drafts** (Production):
```bash
npm run build
npm run preview
# Only non-draft content visible
```

> **Tip**: Set `draft: false` or omit the field entirely to publish content.

## 🛠️ Available Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build for production to `./dist/` |
| `npm run preview` | Preview production build locally |

## 📚 Content Collections

This project uses Astro's Content Collections with TypeScript validation:

- **Pages**: Articles, notes, and documentation
- **Groups**: Hierarchical content organization  
- **Series**: Ordered learning paths and tutorials

All content is validated against schemas defined in `src/content.config.ts`.

## 🎨 Customization

- **Colors**: Update group colors in frontmatter
- **Styles**: Modify global styles in layout files
- **Components**: Customize in `src/components/`
- **Schema**: Extend content types in `src/content.config.ts`

## 🔧 Built With

- [Astro](https://astro.build) - Static site framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Markdown](https://www.markdownguide.org/) - Content format

## 📄 License

This project is open source and available for personal and educational use.

## 👤 Author

**Ashwin Prasad H**
- Software Engineer at Zoho
- [GitHub](https://github.com/ashwinhprasad)
