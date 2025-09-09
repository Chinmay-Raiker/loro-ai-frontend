# Conventional Commits 1.0.0

## Summary

The Conventional Commits specification is a lightweight convention on top of commit messages. It provides an easy set of rules for creating an explicit commit history; which makes it easier to write automated tools on top of. This convention dovetails with **SemVer**, by describing the features, fixes, and breaking changes made in commit messages.

---

## Commit Message Structure

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Structural Elements

- **fix:** a commit of the type `fix` patches a bug in your codebase (correlates with **PATCH** in Semantic Versioning).
- **feat:** a commit of the type `feat` introduces a new feature to the codebase (correlates with **MINOR** in Semantic Versioning).
- **BREAKING CHANGE:** a commit that has a footer `BREAKING CHANGE:`, or appends a `!` after the type/scope, introduces a breaking API change (correlates with **MAJOR** in Semantic Versioning).  
  A breaking change can be part of commits of any type.

Other types are allowed (commonly used with [commitlint](https://github.com/conventional-changelog/commitlint)):

- `build:`, `chore:`, `ci:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, etc.

Footers other than `BREAKING CHANGE: <description>` may be provided and follow a convention similar to Git trailer format.

> **Note:** Additional types are not mandated by the specification and have no implicit effect in Semantic Versioning (unless they include a BREAKING CHANGE).

A **scope** may be provided to a commit’s type, to give additional context (e.g., `feat(parser): add ability to parse arrays`).

---

## Examples

### Commit with description and breaking change footer

```
feat: allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```

### Commit with `!` for breaking change

```
feat!: send an email to the customer when a product is shipped
```

### Commit with scope and `!`

```
feat(api)!: send an email to the customer when a product is shipped
```

### Commit with both `!` and breaking change footer

```
chore!: drop support for Node 6

BREAKING CHANGE: use JavaScript features not available in Node 6.
```

### Commit with no body

```
docs: correct spelling of CHANGELOG
```

### Commit with scope

```
feat(lang): add Polish language
```

### Commit with multi-paragraph body and multiple footers

```
fix: prevent racing of requests

Introduce a request id and a reference to latest request. Dismiss
incoming responses other than from latest request.

Remove timeouts which were used to mitigate the racing issue but are
obsolete now.

Reviewed-by: Z
Refs: #123
```
