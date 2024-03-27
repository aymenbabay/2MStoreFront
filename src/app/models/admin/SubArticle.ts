import { Article } from "./Article";

export class SubArticle {
    id              !:number
    parentArticle ! :Article
    childArticle !: Article
    quantity  !: number
}