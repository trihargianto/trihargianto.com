---
title: Deploy Self-Hosted Gitlab to Vercel
slug: deploy-self-hosted-gitlab-to-vercel
description: Deploy projects from self-hosted GitLab to Vercel using GitLab CI/CD
category: "Deployment"
---

Guide to deploy from self-hosted GitLab to Vercel using GitLab CI/CD pipeline.

## Prerequisites

- Vercel account with a project token
- GitLab repository with your project

## 1. Get Vercel Tokens

```bash
# Install Vercel CLI
npm i -g vercel

# Login and link project
vercel login
cd your-project
vercel link
```

Get your tokens from `.vercel/project.json`:

- **Project ID**: `projectId`
- **Org ID**: `orgId`

Get **Vercel Token**:

```bash
# Go to: https://vercel.com/account/tokens
# Create new token
```

## 2. Add GitLab CI/CD Variables

In GitLab:

```bash
Project → Settings → CI/CD → Variables
```

Add these variables:

- `VERCEL_TOKEN` (your token, masked)
- `VERCEL_ORG_ID` (your org ID)
- `VERCEL_PROJECT_ID` (your project ID)

## 3. Create `.gitlab-ci.yml`

### Basic Configuration

```yaml
image: node:24

stages:
  - deploy

deploy_preview:
  stage: deploy
  only:
    - merge_requests
  script:
    - npm install -g vercel
    - vercel pull --yes --environment=preview --token=$VERCEL_TOKEN
    - vercel build --token=$VERCEL_TOKEN
    - vercel deploy --prebuilt --token=$VERCEL_TOKEN

deploy_production:
  stage: deploy
  only:
    - main
  script:
    - npm install -g vercel
    - vercel pull --yes --environment=production --token=$VERCEL_TOKEN
    - vercel build --prod --token=$VERCEL_TOKEN
    - vercel deploy --prebuilt --prod --token=$VERCEL_TOKEN
```
