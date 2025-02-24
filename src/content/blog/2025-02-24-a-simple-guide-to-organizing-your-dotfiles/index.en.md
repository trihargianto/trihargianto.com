---
title: A Simple Guide to Organizing Your Dotfiles
slug: a-simple-guide-to-organizing-your-dotfiles
description: Learn how to organize and manage your dotfiles easily with GNU Stow. This simple guide will help you store, structure, and sync your configurations more efficiently
pubDate: "2025-02-24"
tags: ["setup", "terminal", "how-to", "macos"]
---

## Concepts

<details>
<summary>Click to expand the concepts</summary>

**Goals**

I want the users able to manage their dotfiles easily

**Target Audience**

Someone who uses MacBook and Linux-based system and not familiar with GNU Stow and Symlinks. But, familiar enough using Terminal.

**Outlines**

- [x] Preface
- [x] Installation
- [ ] The GNU Stow workflow
- [ ] Structuring the `.dotfiles` directory
- [ ] How to delete symlinks

</details>

## Preface

Setup a personal computer never been simple for me. Installing and configuring the apps sometimes become a tedious task. Especially when I got a new computer since I need to re-install and re-configure everything from scratch.

My solution for this was by wrote [an article about it](/blog/setup-macos-for-development). So, in case I need to replace my computer, I can reproduce my previous computer environment easier just by reading the article.

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

After digging the solution on the Internet, I found out that we can manage our Dotfiles easily using [GNU Stow](https://www.gnu.org/software/stow/). This software enable us to manage every Dotfiles a single directory :tada:

### Installation

To install GNU Stow, I prefer to use Homebrew because it's really easy to use. Just run the command below:

```zsh
brew install stow
```

### GNU Stow Workflow (WIP)

Amet anim mollit consectetur dolor anim culpa. Sit Lorem pariatur magna ullamco minim sit non mollit. Labore qui excepteur adipisicing est irure mollit. Nostrud laboris deserunt amet incididunt est elit mollit deserunt voluptate est aliqua tempor aute adipisicing.

## Structuring the `.dotfiles` Directory (WIP)

Amet anim mollit consectetur dolor anim culpa. Sit Lorem pariatur magna ullamco minim sit non mollit. Labore qui excepteur adipisicing est irure mollit. Nostrud laboris deserunt amet incididunt est elit mollit deserunt voluptate est aliqua tempor aute adipisicing.

## Conclusions (WIP)

Amet anim mollit consectetur dolor anim culpa. Sit Lorem pariatur magna ullamco minim sit non mollit. Labore qui excepteur adipisicing est irure mollit. Nostrud laboris deserunt amet incididunt est elit mollit deserunt voluptate est aliqua tempor aute adipisicing.

---
