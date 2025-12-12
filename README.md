# Maestro

A library to create a plugin-like system for your application.

# Usage guide

All plugins (host or otherwise) starts from the `Module` class.

```javascript
import { Module } from '@signver/maestro'

class App extends Module {}

const app = new App();
```

Suppose we want to use `App` as a host, we can attach other plugins by doing this:

```javascript
class LoggerPlugin extends Module {
  constructor(..args) {
    super();
    // ...
  }
}

app.use(LoggerPlugin, ...args);
```

Plugins within the same host can easily access one another by doing this:

```javascript
class CustomPlugin extends Module {
  // ...

  foo() {
    const logger = this.host.find(LoggerPlugin); // throws if not found
    // ...
  }
}

app.attach(CustomPlugin, ...args);

```
