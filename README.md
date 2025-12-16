# DAN (Data Advanced Notation) VS Code Extension

A VS Code extension that provides syntax highlighting and language support for DAN (Data Advanced Notation) files.

## Features

- **Syntax Highlighting**: Full syntax highlighting for DAN files
- **Language Support**: Recognizes `.dan` file extension
- **Comment Support**: Supports both `#` and `//` style comments
- **Bracket Matching**: Auto-closing brackets for `{}`, `[]`, and `()`
- **Smart Indentation**: Automatic indentation for blocks and tables

## Installation

### From Source

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run compile` to compile TypeScript
4. Press `F5` in VS Code to open a new window with the extension loaded
5. Or package the extension: `vsce package` (requires `vsce` tool)

### From VSIX

1. Download the `.vsix` file
2. Open VS Code
3. Go to Extensions view (`Ctrl+Shift+X`)
4. Click the `...` menu and select "Install from VSIX..."
5. Select the downloaded `.vsix` file

## Usage

Simply open any `.dan` file in VS Code. The extension will automatically:

- Apply syntax highlighting
- Enable bracket matching
- Support comments with `#` or `//`
- Provide smart indentation

## DAN Syntax

DAN supports:

- **Blocks**: `key { ... }`
- **Key-Value Pairs**: `key: value`
- **Tables**: `key: table(col1, col2, ...) [ ... ]`
- **Arrays**: `[value1, value2, ...]`
- **Strings**: `"quoted strings"`
- **Numbers**: `123`, `45.67`
- **Booleans**: `true`, `false`
- **Comments**: `# comment` or `// comment`

### Example

```dan
# Sample configuration
app {
  name: "My App"
  version: 1.0.0
  
  server {
    host: localhost
    port: 3000
  }
}

users: table(id, name, email) [
  1, Alice, "alice@example.com"
  2, Bob, "bob@example.com"
]
```

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm
- VS Code

### Building

```bash
npm install
npm run compile
```

### Testing

1. Open this folder in VS Code
2. Press `F5` to launch a new Extension Development Host window
3. Open a `.dan` file to test syntax highlighting

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

