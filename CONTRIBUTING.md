# Contributing to Intent Framework

Thank you for your interest in contributing to Intent! This document provides guidelines and instructions for contributing.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)

## 🤝 Code of Conduct

This project and everyone participating in it is governed by our commitment to:
- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Respect different viewpoints and experiences

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Git

### Setup

```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/intent-framework.git
cd intent-framework

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test
```

## 🔄 Development Workflow

### Repository Structure

```
intent-framework/
├── packages/
│   ├── core/          # Core schema and compiler
│   ├── react/         # React components
│   ├── cli/           # CLI tools
│   └── mcp/           # MCP server
├── examples/          # Example projects
├── website/           # Documentation site
└── docs/              # Additional documentation
```

### Making Changes

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow coding standards (see below)
   - Add tests for new features
   - Update documentation

3. **Test your changes**
   ```bash
   # Run all tests
   pnpm test
   
   # Build packages
   pnpm build
   
   # Test specific package
   cd packages/core && pnpm test
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

## 📝 Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Test changes
- `chore:` Build/process changes

Examples:
```
feat: add Timeline component
fix: resolve Button disabled state
docs: update README with examples
test: add coverage for Form validation
```

## 🧪 Testing

### Running Tests

```bash
# All tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage
pnpm test:coverage

# Specific package
cd packages/core && pnpm test
```

### Writing Tests

- All new features must include tests
- Use descriptive test names
- Follow existing test patterns
- Aim for high coverage

Example:
```typescript
import { describe, it, expect } from 'vitest';
import { validateSchema } from './validator';

describe('validateSchema', () => {
  it('should validate valid component schemas', () => {
    const result = validateSchema(validSchema);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
  
  it('should reject schemas without required properties', () => {
    const result = validateSchema(invalidSchema);
    expect(result.valid).toBe(false);
    expect(result.errors).toContainEqual(
      expect.objectContaining({ message: expect.stringContaining('required') })
    );
  });
});
```

## 🎨 Coding Standards

### TypeScript

- Use strict TypeScript settings
- Define explicit return types for public APIs
- Use `type` over `interface` for simple shapes
- Export types explicitly

### Components

- Follow existing component patterns
- Use forwardRef for component refs
- Support both controlled and uncontrolled modes
- Include proper ARIA attributes
- Document all props with JSDoc

Example:
```typescript
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual importance level */
  importance?: 'primary' | 'secondary' | 'ghost';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ importance = 'secondary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        data-importance={importance}
        data-size={size}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
```

### CSS/Styling

- Use CSS custom properties (variables)
- Follow BEM-like naming for custom classes
- Support dark mode via data attributes
- Maintain consistent spacing scale

## 📚 Documentation

### Code Documentation

- Use JSDoc for all public APIs
- Include usage examples
- Document constraints and edge cases

### README Updates

When adding features:
- Update relevant package README
- Add examples for new components
- Update CHANGELOG.md

## 🔍 Pull Request Process

1. **Before Submitting**
   - Ensure all tests pass
   - Update documentation
   - Add CHANGELOG entry
   - Rebase on main branch

2. **PR Description**
   - Clear title following commit conventions
   - Description of changes
   - Link related issues
   - Screenshots for UI changes

3. **Review Process**
   - Maintainers will review within 48 hours
   - Address review feedback
   - Keep discussion focused

4. **After Merge**
   - Delete your branch
   - Monitor for issues

## 🐛 Reporting Bugs

Use GitHub Issues with:
- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node version, etc.)
- Minimal reproduction example

## 💡 Feature Requests

We welcome feature requests! Please:
- Check existing issues first
- Describe the use case
- Explain why it benefits the framework
- Consider implementation approach

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be recognized in our README and release notes.

---

**Thank you for contributing to Intent Framework!**
