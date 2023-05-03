import { Category } from "./category"
import { Provider } from "./provider"
import { SousCategory } from "./sous-category"

export class Article{
    libelle! : string
    code!:string
    cost!: number
    quantity!:number
    sellingPrice!:number
    unit! : string
    discription!:string
    minQuantity!: number
    maxQuantity!:number
    barcode!:string
    tva!:number
    id!:number
    category!: Category
    sousCategory!: SousCategory
     provider! : Provider
     image!: any
    
}