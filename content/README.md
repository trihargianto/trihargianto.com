# Writing Content Guideline

## Code Snippets

### How to put filename

```markdown
```js:title=filename.js
alert('how cool is this!');
`` `
```

### Highlighting codes

The `{1,3-5}` modifier will highlight "Line 1", "Line 3", and "Line 5"

```markdown
```js{1,3-5}
Line 1
Line 2
Line 3
Line 4
Line 5
`` `
```

OR 

This will highlight "Line 4"

```markdown
```js{1,3-5}
Line 1
Line 2
Line 3
// highlight-next-line
Line 4
Line 5
`` `
```

### Combination

This will highlight lines, show line numbers, and show the file name

> Do not put whitespaces!

```
```markup{3,5-8}{numberLines:true}:title=.zshrc
plugins=(
 git
 yarn
 alias-finder
 autojump
 npm
 zsh_reload
 copydir
 zsh-interactive-cd
 zsh-autosuggestions
 zsh-vim-mode
)
`` `
```
