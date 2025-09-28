# Lintellect.ai

**AI-powered insights for developers**

Lintellect.ai is a web application designed to help developers review their code quickly and intelligently using AI. It provides structured review reports, identifies issues, and offers improvement suggestions with an intuitive interface optimized for performance and SEO.

---

## Features

* **AI-assisted Code Review**: Submit code snippets in various programming languages for intelligent analysis.
* **Static Code Linting**: Quick local checks for common issues.
* **Structured Reports**: Summary, issues, suggestions, and optional patch recommendations.
* **Optimized Performance**: Minified CSS, font preloading, lightweight frontend.
* **SEO-friendly**: Semantic HTML, meta tags, sitemap.xml, and robots.txt.
* **Branding**: Customizable logo, favicon, and light color theme (White, Blue, Gray, Dark Blue title).

---

## Installation

### Prerequisites

* Node.js 18+
* An API key from your AI provider (OpenAI supported)

### Setup

```bash
# Clone repository
git clone https://github.com/yourusername/lintellect.ai.git
cd lintellect.ai

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Add your API key to .env
OPENAI_API_KEY=your_api_key_here

# Start the server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to access the application.

---

## Folder Structure

```
/
├─ README.md
├─ package.json
├─ .env.example
├─ /public
│  ├─ index.html
│  ├─ favicon.ico
│  ├─ images/logo.png
│  ├─ css/styles.css
│  └─ js/app.js
│  └─ js/ai.js
├─ /server
│  ├─ index.js
│  └─ reviewEngine.js
├─ sitemap.xml
├─ robots.txt
└─ .gitignore
```

---

## Usage

1. Paste your code snippet into the editor.
2. Select your programming language.
3. Click **Run Quick Scan** for static analysis.
4. Click **Request AI Review** for a deep AI-assisted review.
5. Review the generated report and suggestions.

---

## Configuration

* `.env.example`: Template for environment variables.
* `OPENAI_API_KEY`: Your AI provider key.

---

## SEO & Performance Improvements

* Preloaded fonts for faster rendering.
* Minified CSS for reduced load time.
* Semantic HTML for SEO optimization.
* Sitemap.xml and robots.txt for search engine indexing.
* Google Analytics integration placeholder.

---

## Contributing

Pull requests and issues are welcome. Please follow the repository coding standards and style.

---

## License

MIT License — see LICENSE file.

---

**Lintellect.ai** — AI-powered insights for developers
