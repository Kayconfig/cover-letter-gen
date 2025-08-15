# Cover‑Letter‑Gen (Node.js CLI)

**Cover‑Letter‑Gen** is a command‑line tool that uses LangChain agents and an LLM to help you:

- Generate a tailored cover letter for any job description.
- Evaluate your résumé against the job requirements.
  - If your résumé is **≥ 65 %** relevant → it is improved with _suggestions_ for the next step.
  - If it is **< 65 %** relevant → it explains why it is a poor fit and highlights the main gaps.

> **TL;DR**: Give it a résumé file and a job posting → you get a polished cover letter + feedback on your résumé in seconds.

---

## 📦 Features

| Feature                      | What it does                                                                                                                                                      |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Resume & JD parsing**      | Accepts PDF, DOCX, TXT, or JSON files for both résumé and job description.                                                                                        |
| **LLM‑powered writing**      | Uses a LangChain agent that calls an LLM (OpenAI GPT‑4 / Ollama etc.) to compose a professional cover letter.                                                     |
| **Relevance scoring**        | Computes a relevance percentage based on keyword overlap, skill match, and context.                                                                               |
| **Actionable résumé review** | _If relevant_: suggests improvements (skill gaps, phrasing, formatting). <br>_If not relevant_: explains why the résumé fails to match and offers concrete fixes. |
| **Configurable**             | Change the model, temperature, verbosity, or output format via CLI flags or a `.env` file.                                                                        |
| **Portable**                 | Works on any system with Node 18+                                                                                                                                 |

---

> Docker implementation ⏳

## 🚀 Quick Start

### 1. Install

```bash
# Or, clone & install locally
git clone https://github.com/yourname/cover-letter-gen.git
cd cover-letter-gen
pnpm install
```

> **Note**: The CLI is written in TypeScript. If you install locally, you’ll run the bundled JavaScript from `dist/index.js`.

### 2. Set up env

Create a `.env` file using the content of `.env.example`

### 3. Run

```bash
# Basic usage
pnpm cover-letter-gen \
  --resume ./my-resume.pdf \
  --job ./job-posting.txt \
  --output ./cover-letter.txt

# Optional flags
pnpm cover-letter-gen \
  --resume my-resume.docx \
  --job my-job-description.pdf \
  --output cover_letter.md \
  --temperature 0.7 \
  --verbose
```

> **Output** – The tool writes a `cover-letter.txt` (or `.md`) file containing:
>
> 1. The cover letter.
> 2. A **Résumé Review** section with relevance score and suggestions or critique.

---

## 📚 Usage Guide

### 1. Argument Reference

| Flag             | Alias | Type      | Description                           | Default            |
| ---------------- | ----- | --------- | ------------------------------------- | ------------------ |
| `--resume`, `-r` | –     | `string`  | Path to the résumé file               | **required**       |
| `--job`, `-j`    | –     | `string`  | Path to the job description file      | **required**       |
| `--output`, `-o` | –     | `string`  | Destination file for the cover letter | `cover-letter.txt` |
| `--temperature`  | –     | `number`  | Creativity level (0‑1)                | `0.3`              |
| `--verbose`      | –     | `boolean` | Log detailed progress                 | `false`            |

### 2. Supported File Types

| Type | Résumé | Job Description |
| ---- | ------ | --------------- |
| Text | ⏳     | ✅              |
| PDF  | ✅     | ⏳              |
| DOCX | ⏳     | ⏳              |
| JSON | ⏳     | ⏳              |

> For PDF/DOCX the CLI uses `pdf-parse` and `mammoth`, respectively. If the file cannot be parsed, the CLI will exit with an error.

---

## 🤝 Contributing

We welcome PRs! Please:

1. Fork the repo.
2. Create a feature branch.
3. Submit a PR with a clear description.

---

## 📄 License

MIT © 2025 Kayode Odole

---

## 💬 Support

If you encounter a bug or have a feature request, open an issue on GitHub.

---
