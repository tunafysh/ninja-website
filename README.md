# Ninja Documentation Website

Official documentation site for [Ninja](https://github.com/tunafysh/ninja) - a service management system built around **Shurikens**, self-contained packages for configurable services and applications.

## About Ninja

Ninja is a service manager that installs, configures, starts, stops, and manages services packaged as `.shuriken` files. Each shuriken contains metadata, management scripts, configuration templates, and optional tools for complete service lifecycle management.

## Development Setup

This is a [Next.js](https://nextjs.org) documentation site using Fumadocs.

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to view the documentation.

## Documentation Structure

- `/docs` - MDX documentation files
  - `getting-started/` - Installation and quickstart guides
  - `user-guide/` - End-user documentation
  - `developer-guide/` - Developer and contributor guides
  - `reference/` - API, CLI, and configuration references

## Contributing

Contributions to improve documentation are welcome! Please ensure your changes:
- Are concise and descriptive
- Follow the existing structure and style
- Are technically accurate and consistent with the [Ninja project](https://github.com/tunafysh/ninja)

## License

See [LICENSE](LICENSE) for details.
