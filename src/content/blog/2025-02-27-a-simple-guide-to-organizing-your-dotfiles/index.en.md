---
title: A Simple Guide to Organizing Your Dotfiles
slug: a-simple-guide-to-organizing-your-dotfiles
description: Learn how to organize and manage your dotfiles easily with GNU Stow. This simple guide will help you store, structure, and sync your configurations more efficiently
pubDate: "2025-02-27"
tags: ["setup", "terminal", "how-to", "macos"]
---

## Preface

Setting up a personal computer has never been easy for me. Installing and configuring the apps sometimes becomes a tedious task, especially when I get a new computer since I need to re-install and re-configure everything from scratch.

My solution for this is by wrote [an article about it](/blog/setup-macos-for-development). So, in case I need to replace my computer, I can reproduce my previous computer environment easier just by reading the article.

Following the guideline from that article is really helpful, but not for my [Dotfiles](https://www.freecodecamp.org/news/dotfiles-what-is-a-dot-file-and-how-to-create-it-in-mac-and-linux/).

Dotfiles often contains a lot of configuration files and I don't want to manually copy paste them everytime I replace my computer.

In this article, I want to share how I eventually manage my Dotfiles, so it can be reproducible easily on other computers.

## The Problems of Dotfiles

What’s challenging about Dotfiles is that they are often scattered across various locations, depending on the application. For instance:

- `.bashrc`, `.zshrc` resides in the home directory
- Nvim configurations are found in `~/.config/nvim/`
- SSH files are located in `~/.ssh/`

Imagine if all of your Dotfiles are living in a single directory, so you can use Git to track every changes and then push them to a remote hosting like Github. Then you can just pull them on any computer you want. I'd pleased if that's possible.

## GNU Stow as solution

After digging the solution on the Internet, I found out that we can manage our Dotfiles easily using [GNU Stow](https://www.gnu.org/software/stow/). This software enable us to manage every Dotfiles in a single directory ✨

### Installation

To install GNU Stow, I prefer to use [Homebrew](https://brew.sh/) because it's really easy to use. Just run the command below:

```zsh title="Terminal"
brew install stow
```

### The `.dotfiles` directory

Firstly, you need a directory to store all of your Dotfiles. For this case, I like to put them in the `~/.dotfiles` directory, since the name is self-descriptive: "it contains my Dotfiles".

Create yours if you haven't:

```bash title="Terminal"
mkdir ~/.dotfiles
```

### Register a package

Let's say you want to backup your Zsh config file, you'll need to create a directory named `zsh` inside the `~/.dotfiles`:

```bash title="Terminal"
mkdir ~/.dotfiles/zsh
```

then, move your `~/.zshrc` file to that directory:

```bash title="Terminal"
mv ~/.zshrc ~/.dotfiles/zsh/
```

After you moved your `.zshrc` to the `~/.dotfiles/zsh/` directory, your Zsh shell now won't be able to find the configuration file since Zsh expect the users to have a configuration named `.zshrc` in the Home directory. This is where Stow shines ✨

To make your zsh configuration file available to the Home directory again, make sure you're inside the `.dotfiles` directory:

```bash title="Terminal"
cd ~/.dotfiles
```

And then run the command below:

```bash title="Terminal"
stow zsh
```

A "package" in Stow is just a directory inside the `~/.dotfiles`. So, your `zsh` directory is the package name. You can also name it everything you want.

### How its worked?

When you run the `stow xxx` command, GNU Stow creates symbolic links (symlinks) from the files in the specified package directory (e.g., `~/.dotfiles/zsh`) to their corresponding locations in the home directory.

This means that the actual files remain in the `~/.dotfiles` directory, but they appear as if they are in the home directory. This is similar to a Windows shortcut.

### Structuring the `.dotfiles` directory

Let's say you also want to store your Tmux, Neovim, and SSH configurations in the `~/.dotfiles` directory. In this case, you just need to make sure each of them is moved to its corresponding package directory.

Example structure:

```txt

~/.dotfiles/
├── nvim/
│ └── .config/
│   └── nvim/
│     └── init.vim
├── ssh/
│ └── .ssh/
│   ├── config
│   └── id_rsa
├── tmux/
│ └── .tmux.conf
└── zsh/
  └── .zshrc

```

With the above directory structure, you need to run the `stow` command for each of them:

```bash title="Terminal"
stow nvim ssh tmux zsh
```

or run for all packages

```bash title="Terminal"
stow */
```

The symlinks then will be created for each of them to the Home directory.

### Delete symlinks

In case you want to delete the symlinks, just put the `-D` option when running the Stow:

```bash title="Terminal"
stow -D packageName
```

Or run for all packages

```bash title="Terminal"
stow -D */
```

### Track your Dotfiles with Git

With every Dotfiles inside a directory, now it's possible to track every changes you do to your Dotfiles with Git.

```bash title="Terminal"
git init
git add .
git commit -m "initial commit"
```

## Conclusions

With GNU Stow, it's now possible for me to move to other computers and pull all of my configuration files just by cloning the `.dotfiles` from the Git remote and then running the `stow */` command for all of my packages.

By organizing your Dotfiles with GNU Stow, you can save time and ensure consistency across different environments. This approach not only simplifies the setup process but also makes it easier to manage and update your configurations.

Happy dotfiling!
