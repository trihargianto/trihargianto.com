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

