import MarkdownIt from "markdown-it";
import { minify } from "html-minifier";
import hljs from "highlight.js";
import { style } from "./style";
import { ArticleMetadata, Options } from "./dto";

const markdownIt = new MarkdownIt({
    html: true,
    linkify: true,
    breaks: true,
    typographer: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>';
        } catch (__) {}
      }
      return ''; // use external default escaping
    }
});


const cssStyle = style;

export const articleToHtml = (article: ArticleMetadata, options?: Options) => {
    const renderedArticle = markdownIt.render(article.markdown)
    const datePublishedISOString = article.datePublished.toISOString()
    const dateString = article.datePublished.toLocaleDateString()
    let html = `<!DOCTYPE html><html><head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${article.title}</title>
        <meta name="description" content="${article.description}">
        <meta property="og:title" content="${article.title}">
        <meta property="og:description" content="${article.description}">
        <meta property="article:author" content="${article.author.nickname} (@${article.author.username})">
        <meta name="twitter:title" content="${article.title}">
        <meta name="twitter:description" content="${article.description}">
        <style>${cssStyle}</style>
      </head>
      <body itemscope itemtype="http://schema.org/Article">
        <main>
          <header>
            <h1 itemprop="headline">${article.title}</h1>
            <figure class="byline">
              <a href="https://www.matataki.io/user/${article.author.uid}?utm_source=ipfs" target="_blank" itemprop="author">${article.author.nickname}</a>
              <span itemprops="provider" itemscope itemtype="http://schema.org/Organization">
                from <span itemprops="name">Matataki</span>
                <meta itemprops="url" content="https://matataki.io/">
              </span>
              <time itemprop="datePublished" datetime="${datePublishedISOString}">${dateString}</time>
            </figure>
          </header>
          <article itemprop="articleBody">
            ${renderedArticle}
          </article>
          <footer>本文发布于 <a href="https://www.matataki.io/">瞬 Matataki</a>，这是文章在 IPFS 节点上的备份。<br/>
          免责声明：本文由 瞬 Matataki 用户「${article.author.nickname}」上传发布，内容为作者独立观点。仅代表作者本人立场，不构成投资建议，请谨慎对待。<br/>
          Disclaimer: The above content is user-generated content, it does not represent the views of this site, and does not constitute investment advice.</footer>
        </main>
    </body>
    <link rel="stylesheet"
      href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.1/build/styles/solarized-light.min.css">
    </html>`
    if (options?.minify) {
        html = minify(html)
    }
    return html;
}