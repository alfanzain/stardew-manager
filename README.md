# Stardew Manager

## Description

A web application for managing your Stardew Valley farm.

## Features

- Checklist for today's tasks
- Completion tracking for cooking and crafting (soon)
- Recipe book

## Development

This project uses [Bun](https://bun.sh) as the package manager. The build scripts in `package.json` use Vite directly.

### Setup

```bash
bun install
```

### Development Server

```bash
bun run dev
```

### Build

```bash
bun run build
```

## Deployment to Cloudflare Pages

This project is configured for deployment on Cloudflare Pages using Bun. The package.json scripts use Vite directly, but Cloudflare Pages will execute them via Bun.

### Build Settings

When setting up the project in Cloudflare Pages, use these settings:

- **Build command**: `bun run build`
- **Build output directory**: `dist`
- **Root directory**: `/` (project root)

Note: The build command `bun run build` will execute the `vite build` script defined in package.json using Bun as the runtime.

### Environment Variables

No environment variables are required for basic deployment.

### Automatic Deployments

Connect your Git repository to Cloudflare Pages for automatic deployments on push. The `_redirects` file in the `public` folder ensures proper SPA routing.

## Contributions

Contributions are welcome! Please feel free to submit an issue or a pull request.