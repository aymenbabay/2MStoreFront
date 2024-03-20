import { Article } from "./Article";

export class SubArticle {
    parentArticle ! :Article
    childArticle !: Article
    quantity  !: number
}