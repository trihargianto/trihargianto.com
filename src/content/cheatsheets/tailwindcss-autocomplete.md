---
title: Tailwind CSS Autocomplete Neovim Configuration
slug: tailwind-css-autocomplete-config-neovim
description: Custom Tailwind CSS LSP configuration to enable autocompletion for specific variable naming patterns
category: "Neovim"
---

## Overview

Custom Tailwind CSS LSP configuration to enable autocompletion for specific variable naming patterns in addition to the default behavior.

## Configuration File

**Location:** `lua/plugins/nvim-lspconfig.lua` (Create one if you don't have it)

## Supported Patterns

The Tailwind CSS language server will provide autocompletion for class names in the following contexts:

### 1. `cn()` Function

```javascript
cn("flex items-center");
```

Common shadcn/ui pattern for conditional class names.

### 2. Variables ending with `ClassNames`

```javascript
const buttonClassNames = "";
const cardClassNames = "";
const anyNameClassNames = "";
```

### 3. Variables ending with `Styles`

```javascript
const buttonStyles = "";
const modalStyles = "";
const anyNameStyles = "";
```

### 4. Variables ending with `_CLASSNAMES`

```javascript
const BUTTON_CLASSNAMES = "";
const MODAL_CLASSNAMES = "";
const ANY_NAME_CLASSNAMES = "";
```

### 5. Variables ending with `_STYLES`

```javascript
const BUTTON_STYLES = "";
const MODAL_STYLES = "";
const ANY_NAME_STYLES = "";
```

## Implementation

The configuration uses Tailwind CSS's `experimental.classRegex` feature to define custom patterns:

```lua
experimental = {
  classRegex = {
    { "cn\\(([^)]*)\\)", "['\"`]([^'\"`]*)['\"`]" },
    { "ClassNames\\s*=\\s*[\"'`]([^\"'`]*)[\"'`]" },
    { "Styles\\s*=\\s*[\"'`]([^\"'`]*)[\"'`]" },
    { "_CLASSNAMES\\s*=\\s*[\"'`]([^\"'`]*)[\"'`]" },
    { "_STYLES\\s*=\\s*[\"'`]([^\"'`]*)[\"'`]" },
  },
},
```

## Applying Changes

After modifying the configuration:

Restart the LSP server or Neovim

```vim
:LspRestart tailwindcss
```

## Adding New Patterns

To add additional patterns, edit `lua/plugins/nvim-lspconfig.lua` and add a new entry to the `classRegex` array:

```lua
{ "YourPattern\\s*=\\s*[\"'`]([^\"'`]*)[\"'`]" },
```

## References

- [Tailwind CSS IntelliSense Documentation](https://github.com/tailwindlabs/tailwindcss-intellisense)
- Configuration: `experimental.classRegex`
