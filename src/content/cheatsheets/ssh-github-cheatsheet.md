---
title: Setup SSH with Github
slug: setup-ssh-with-github
description: Guide to configure the proper GitHub SSH config
category: "Git"
---

Guide to config the proper GitHub SSH

## GitHub SSH Setup

### 1. Generate SSH Key

```bash
# Ed25519 (recommended)
ssh-keygen -t ed25519 -C "your_email@example.com"

# RSA (if Ed25519 not supported)
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

### 2. Add SSH Key to SSH Agent

```bash
# Start ssh-agent
eval "$(ssh-agent -s)"

# Add your SSH private key
ssh-add ~/.ssh/id_ed25519
```

### 3. Add SSH Key to GitHub

```bash
# Copy public key to clipboard
pbcopy < ~/.ssh/id_ed25519.pub

```

Then go to GitHub → Settings → SSH and GPG keys → New SSH key

### 4. Test Connection

```bash
ssh -T git@github.com
```

## Multiple GitHub Accounts

```bash
# ~/.ssh/config
Host github-personal
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_personal

Host github-work
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_work
```

