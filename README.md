# Guifier Angular

An interactive front-end toolkit simplifying JSON, YAML, TOML, and XML data. Visualize, edit, convert formats, and perform real-time data manipulations. Built with Angular 20, ng-zorro-antd, and TypeScript.

## Features

- **Multi-format Support**: JSON, YAML, TOML, XML
- **Dual Editor View**: Code editor (CodeMirror) + Visual GUI editor side by side
- **Real-time Sync**: Changes in code editor instantly reflect in GUI editor and vice versa
- **Interactive GUI**: Expandable/collapsible containers, inline editing, add/delete fields
- **Type-safe**: Full TypeScript support with strict mode
- **Error Handling**: Graceful error display for invalid data formats
- **RxJS Patterns**: Reactive programming with signals and observables

## Tech Stack

| Category     | Technology                            |
| ------------ | ------------------------------------- |
| Framework    | Angular 20                            |
| UI Library   | ng-zorro-antd 20                      |
| Build Tool   | Angular CLI / esbuild                 |
| Language     | TypeScript 5.8                        |
| Styling      | Tailwind CSS 3                        |
| Code Editor  | CodeMirror 6                          |
| State Mgmt   | Angular Signals                       |
| Package Mgr  | pnpm                                  |
| Linting      | ESLint 9                              |
| Formatting   | Prettier 3                            |
| Git Hooks    | Husky 9 + lint-staged                 |

## Project Structure

```
guifier-angular/
├── .husky/                  # Git hooks
│   ├── pre-commit           # Runs lint-staged before commit
│   └── commit-msg           # Validates commit message format
├── .vscode/                 # VS Code settings
│   ├── settings.json        # Editor configuration
│   └── extensions.json      # Recommended extensions
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── guifier/     # Core Guifier components
│   │   │   │   ├── fields/  # Primitive field editors
│   │   │   │   │   ├── string-field.component.ts
│   │   │   │   │   ├── number-field.component.ts
│   │   │   │   │   ├── boolean-field.component.ts
│   │   │   │   │   └── null-field.component.ts
│   │   │   │   ├── containers/  # Container components
│   │   │   │   │   ├── object-container.component.ts
│   │   │   │   │   └── array-container.component.ts
│   │   │   │   ├── create-field-button.component.ts
│   │   │   │   └── guifier.component.ts
│   │   │   ├── code-editor/
│   │   │   │   └── code-editor.component.ts
│   │   │   └── guifier-editor/
│   │   │       └── guifier-editor.component.ts
│   │   ├── services/
│   │   │   └── sample-data.service.ts
│   │   ├── utils/
│   │   │   ├── cn.utils.ts
│   │   │   └── guifier.utils.ts
│   │   ├── app.component.ts
│   │   └── app.config.ts
│   ├── assets/
│   │   └── samples/         # Sample data files
│   ├── main.ts
│   ├── index.html
│   └── styles.css
├── eslint.config.js         # ESLint flat config
├── prettier.config.js       # Prettier configuration
├── .editorconfig            # Editor consistency
├── .lintstagedrc.js         # lint-staged configuration
├── tailwind.config.js       # Tailwind CSS config
├── postcss.config.js        # PostCSS config
├── angular.json             # Angular CLI configuration
├── tsconfig.json            # TypeScript configuration
└── package.json
```

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 9

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd guifier-angular

# Install dependencies
pnpm install
```

### Development

```bash
# Start development server
pnpm dev

# Open http://localhost:4200
```

### Build

```bash
# Production build
pnpm build

# Watch mode for development
pnpm watch
```

## Scripts

| Script           | Description                                        |
| ---------------- | -------------------------------------------------- |
| `pnpm dev`       | Start development server                           |
| `pnpm build`     | Type check and build for production                |
| `pnpm watch`     | Build in watch mode                                |
| `pnpm lint`      | Run ESLint with strict rules                       |
| `pnpm lint:fix`  | Auto-fix ESLint issues                             |
| `pnpm format`    | Format code with Prettier                          |
| `pnpm format:check` | Check code formatting without modifying files  |
| `pnpm type-check` | Run TypeScript type checking                      |

## Code Quality

### ESLint Rules

- No unused variables (except prefixed with `_`)
- Explicit `any` usage warned
- No `console.log` (except `warn` and `error`)
- `prefer-const` enforced
- Strict equality (`===`) required

### Prettier Configuration

- Single quotes
- No semicolons
- Trailing commas (all)
- Print width: 100
- 2 spaces indentation
- LF line endings

### Commit Message Convention

Commits must follow the format: `<type>(<scope>): <description>`

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements
- `ci`: CI/CD changes
- `build`: Build system changes
- `revert`: Reverting a commit

**Examples:**
```
feat(auth): add login page
fix: resolve null pointer exception
docs: update README
refactor(guifier): simplify container logic
```

### Git Hooks

- **pre-commit**: Runs `lint-staged` to auto-fix and format staged files
- **commit-msg**: Validates commit message format

## VS Code Setup

Install the recommended extensions when prompted:

- Angular Language Service
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Angular Essentials

Settings are pre-configured for:
- Format on save
- ESLint auto-fix on save
- Organize imports on save

## License

MIT
