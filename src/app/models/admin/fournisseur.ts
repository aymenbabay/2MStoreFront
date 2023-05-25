import { User } from "../user/user"

export class Fournisseur{
    id!: number
    name!: string
    code!: string
    nature!: string
    credit!: number
    mvt!: number
    phone!: string
    address!: string
    email!: string
    user!: User
}