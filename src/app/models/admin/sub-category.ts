import { Company } from "../user/company"
import { Category } from "./category"

export class SubCategory{
    id!: number
    code!: string
    libelle!: string
    image!: string
    category!: Category
    company!: Company
}