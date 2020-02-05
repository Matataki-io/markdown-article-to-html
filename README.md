# Article Markdown To HTML

把文章渲染成简单的 HTML

## How to use

```js
const articleToHtml = require('markdown-article-to-html')
const html = articleToHtml({
    title: string;
    author: {
        nickname: string;
        uid: number;
        username: string;
    };
    description: string;
    datePublished: Date;
    markdown: string;
}, { minify: true })
fs.writeFileSync('./output.html', html)
```