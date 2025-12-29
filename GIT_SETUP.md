# Git & GitHub Setup Guide

Complete instructions for setting up your GitHub repository with clean commit history.

## 🔐 GitHub Initial Setup

### 1. Create Repository on GitHub

1. Go to https://github.com/new
2. Fill in details:
   - **Repository name**: `axiom-pulse` (or your preferred name)
   - **Description**: Token discovery and trading platform with real-time updates
   - **Public**: Yes (for visibility)
   - **Add .gitignore**: Node.js (select this)
   - **Add license**: MIT (select this)
3. Click "Create repository"

### 2. Clone & Initialize Locally

```bash
# If you haven't initialized git yet
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Add remote
git remote add origin https://github.com/yourusername/axiom-pulse.git

# Verify remote
git remote -v
```

### 3. Setup SSH Keys (Optional but Recommended)

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# Add to GitHub
# 1. Copy key: cat ~/.ssh/id_ed25519.pub
# 2. Go to https://github.com/settings/keys
# 3. Paste and save

# Test connection
ssh -T git@github.com
```

## 📝 Clean Commit History

### Commit Structure

Group related changes into logical commits:

```
commit 1: Setup: Initial Next.js + dependencies + config
commit 2: feat: Core token discovery table with 3 categories
commit 3: feat: Real-time WebSocket price updates with animations
commit 4: feat: Sorting and filtering functionality
commit 5: feat: Watchlist management with Redux
commit 6: feat: Modal interactions (Buy, Details, Sell)
commit 7: feat: Popover tooltips and additional interactions
commit 8: feat: Responsive design (320px - 1280px+)
commit 9: feat: Loading states (skeleton, shimmer, error boundaries)
commit 10: perf: Component memoization and optimization
commit 11: perf: Lighthouse optimization (images, code splitting)
commit 12: docs: Add deployment, performance, and pixel-perfect guides
commit 13: chore: Update dependencies to stable versions
```

### Making Clean Commits

```bash
# Stage specific changes
git add app/components/navbar/pulse/TokenCard.tsx
git add app/components/navbar/pulse/PulseColumn.tsx

# Commit with meaningful message
git commit -m "feat: Add real-time price updates with smooth animations

- Implement dual-speed WebSocket updates (500ms + 5s intervals)
- Add green/red color transitions for price changes
- Track price history for analytics
- Improve perceived performance with smooth transitions"

# Or, if you have uncommitted changes, create commits interactively
git add -i  # Interactive staging
git commit -m "descriptive message"
```

## 🔄 Commit Message Convention

Follow conventional commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **perf**: Performance improvement
- **refactor**: Code structure improvement
- **style**: Code style (no logic change)
- **test**: Test-related changes
- **docs**: Documentation updates
- **chore**: Dependency updates, tooling

### Examples

```bash
# Feature
git commit -m "feat(tokens): Add real-time price updates
- Implement WebSocket mock for continuous updates
- Add green/red flash effects on price changes"

# Bug fix
git commit -m "fix(ui): Prevent layout shift on card updates"

# Performance
git commit -m "perf(components): Memoize PulseColumn for re-render optimization"

# Documentation
git commit -m "docs: Add deployment guide with Vercel instructions"
```

## 📊 Branching Strategy

### Main Branch
- Production-ready code
- All tests passing
- Lighthouse score ≥90

### Development Branch (Optional)
```bash
# Create dev branch
git checkout -b develop

# Work on features
git checkout -b feature/real-time-updates
git checkout -b feature/responsive-design

# Merge back to main
git checkout main
git merge develop
```

## 🚀 Pushing to GitHub

### Initial Push

```bash
# Stage all changes
git add .

# Create initial commit
git commit -m "init: Initial commit with Axiom Pulse token discovery platform

Features:
- 3-category token discovery table
- Real-time price updates with WebSocket mock
- Advanced sorting and filtering
- Watchlist management with Redux
- Responsive design (320px-1280px+)
- Loading states with animations
- Comprehensive error handling"

# Push to GitHub
git push -u origin main
```

### Subsequent Pushes

```bash
# After committing
git push

# Push specific branch
git push origin feature-branch
```

### View Commit History

```bash
# One-line log
git log --oneline

# Detailed log
git log --graph --oneline --all

# Since last push
git log origin/main..HEAD
```

## 🔐 GitHub Settings

### 1. Protect Main Branch

1. Go to Settings → Branches
2. Click "Add rule"
3. Branch name pattern: `main`
4. Enable:
   - [ ] Require pull request reviews
   - [ ] Require status checks to pass
   - [ ] Require branches to be up to date

### 2. Configure Actions

1. Go to Actions → New workflow
2. Choose "Deploy" workflow
3. Configure with your Vercel tokens

### 3. Add Topics (for discoverability)

```
Topics: token-trading, nextjs, react, trading-dashboard, crypto, dashboard
```

### 4. Add Description & Link

- **About**: "Token discovery and trading platform with real-time updates"
- **Website**: https://axiom-pulse.vercel.app

## 📦 Release & Tags

### Create Version Tags

```bash
# Tag current commit
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push tags
git push origin v1.0.0

# Or push all tags
git push origin --tags
```

### Create Release on GitHub

1. Go to Releases → Create a new release
2. Tag version: v1.0.0
3. Release title: "Axiom Pulse v1.0.0"
4. Description:
```markdown
## Features
- Real-time token discovery
- WebSocket price updates
- Responsive design
- Advanced sorting/filtering

## Performance
- Lighthouse: 94/100
- Mobile performance optimized
- <100ms interactions

## Links
- [Live Demo](https://axiom-pulse.vercel.app)
- [Deployment Guide](./DEPLOYMENT.md)
- [YouTube Demo](https://youtube.com/...)
```

## 🔍 Common Git Commands

```bash
# Check status
git status

# View changes
git diff
git diff --staged

# Amend last commit
git commit --amend

# Undo uncommitted changes
git checkout -- <file>

# Revert a commit
git revert <commit-hash>

# View commit details
git show <commit-hash>

# Cherry-pick a commit
git cherry-pick <commit-hash>

# Interactive rebase (before pushing)
git rebase -i HEAD~5

# Force push (use cautiously!)
git push --force-with-lease
```

## 🆘 Troubleshooting

### Accidentally Committed Sensitive Data
```bash
# Remove file from history
git rm --cached secrets.env
echo "secrets.env" >> .gitignore
git commit --amend -m "Remove sensitive file"
git push --force-with-lease
```

### Need to Undo Last Commit (Before Push)
```bash
git reset HEAD~1
# Changes are now unstaged, modify and recommit
```

### Merge Conflicts
```bash
# View conflicts
git status

# Edit files to resolve
# Then
git add <resolved-files>
git commit -m "Merge main into feature-branch"
```

## 📋 Pre-Push Checklist

Before pushing to GitHub:

- [ ] All tests passing
- [ ] No console errors
- [ ] Lighthouse score ≥90
- [ ] Code properly formatted
- [ ] Commit messages follow convention
- [ ] Feature complete and tested
- [ ] Documentation updated
- [ ] No secrets in code

## 🎯 Final Setup

```bash
# Verify everything is clean
git status  # Should show "nothing to commit"

# View your commits
git log --oneline -10

# Final push
git push

# Verify on GitHub
# Visit: https://github.com/yourusername/axiom-pulse
```

---

**Setup Complete!** Your repository is ready for deployment and sharing.

For more help: https://docs.github.com/en
