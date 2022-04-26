# highlightme
highlightme is a simple snytax highlighter for your web pages!...

***

# Getting the library
## Fetch via CDN
### jsDelivr
#### Common JS
- Minified (Recommended)
``` html
<script src="https://cdn.jsdelivr.net/gh/amritbera27/highlightme@1.0.0/cdn/highlightme.min.js"></script>
```
- Normal
``` html
<script src="https://cdn.jsdelivr.net/gh/amritbera27/highlightme@1.0.0/cdn/highlightme.js"></script>
```

### NPM Package
```
npm i hlme
```

***

# Usage
## In the browser
### Using HTML classes
For example:
``` html
<div class="hlme-html">...</div>
```
View the below table to know about which classes will highlight which language.

| Class | Language |
| ----- | -------- |
| ` hlme-html ` | HTML |
| ` hlme-xml ` | XML |
| ` hlme-css ` | CSS |
| ` hlme-js ` | JavaScript |
| ` hlme-plaintext ` or ` hlme-nohighlight ` | Plain Text / No highlight |

For adding dark mode just add ` -dark ` after your language class.
For example:
``` html
<div class="hlme-html-dark">...</div>
```

### Using JavaScript Function ` highlightme() `
The glimpse of the function is like this...
``` javascript
highlightme(id, language, mode)
```

This will only highlight the id defined, in short this will highlight separately.

1. ID

This contains either the ` ID ` of the div, pre, etc. or the ` document selector `. For example:
``` javascript
// Using ID
highlightme("yourId", "html");

// Using document selector
highlightme(document.querySelector("#yourId"), "html");
highlightme(document.getElementById("yourId"), "html");
```
2. Language

This contains the language you want to highlight. For example:
``` javascript
highlightme("yourId", " html");
// or
highlightme("yourId", "xml");
```

View the table to know about which string will highlight which language

| String | Language |
| ------ | -------- |
| ` html ` (Default) | HTML |
| ` xml ` | XML |
| ` css ` | CSS |
| ` js ` | JavaScript |
| ` plaintext ` or ` nohighlight ` | Plain text or No highlight |

**Note**: If you don't define your language it will define the language as ` HTML `.


3. Mode (Light / Dark)
``` javascript
//Darkmode
highlightme("yourId", "html", " dark");

//Lightmode
highlightme("yourId", "html");
```

**Note**: For light mode just don't add anything. But if you don't define your language then first define your language then add dark mode.

## Node.js server
### Using HTML classes
First ` import ` the library and add ` highlightmeAll() ` function.
```  javaScript
const hlme = require('highlightme');
hlme.highlightmeAll();
```
` highlightmeAll() ` will find the classes and highlight them.

For example:
``` html
<div class="hlme-html">...</div>
```
View the below table to know about which classes will highlight which language.

| Class | Language |
| ----- | -------- |
| ` hlme-html ` | HTML |
| ` hlme-xml ` | XML |
| ` hlme-css ` | CSS |
| ` hlme-js ` | JavaScript |
| ` hlme-plaintext ` or ` hlme-nohighlight ` | Plain Text / No highlight |

For adding dark mode just add ` -dark ` after your language class.
For example:
``` html
<div class="hlme-html-dark">...</div>
```

### Using function ` highlightme() `

First and the main thing is to ` import ` the library.
``` javascript
const hlme = require('highlightme');
```

The glimpse of the function is like this...
``` javascript
hlme.highlightme(id, language, mode)
```

This will only highlight the id defined, in short this will highlight separately.

1. ID

This contains either the ` ID ` of the div, pre, etc. or the ` document selector `. For example:
``` javascript
// Using ID
hlme.highlightme("yourId", "html");

// Using document selector
hlme.highlightme(document.querySelector("#yourId"), "html");
hlme.highlightme(document.getElementById("yourId"), "html");
```
2. Language

This contains the language you want to highlight. For example:
``` javascript
hlme.highlightme("yourId", " html");
// or
hlme.highlightme("yourId", "xml");
```

View the table to know about which string will highlight which language

| String | Language |
| ------ | -------- |
| ` html ` (Default) | HTML |
| ` xml ` | XML |
| ` css ` | CSS |
| ` js ` | JavaScript |
| ` plaintext ` or ` nohighlight ` | Plain text or No highlight |

**Note**: If you don't define your language it will define the language as ` HTML `.


3. Mode (Light / Dark)
``` javascript
//Darkmode
hlme.highlightme("yourId", "html", " dark");

//Lightmode
hlme.highlightme("yourId", "html");
```

**Note**: For light mode just don't add anything. But if you don't define your language then first define your language then add dark mode.

I hope you understood this docs 😅