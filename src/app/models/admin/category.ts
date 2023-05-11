import { Company } from "../user/company"

export class Category{
    id!: number
    code!: string
    libelle!: string
    image!: string
    company!: Company
}