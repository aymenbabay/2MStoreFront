import { Company } from "../user/company"
import { Category } from "./category"

export class SousCategory{
    id!: number
    code!: string
    libelle!: string
    category!: Category
    image!: string
    company!: Company
}