
export interface ArticleMetadata {
    title: string;
    author: {
        nickname: string;
        uid: number;
        username: string;
    };
    description: string;
    datePublished: Date;
    markdown: string;
}

export interface Options {
    minify?: boolean;
}