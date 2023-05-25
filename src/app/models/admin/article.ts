import { Company } from "../user/company"
import { Category } from "./category"
import { Fournisseur } from "./fournisseur"
import { SousCategory } from "./sous-category"

export interface Article{
    libelle       :string
    code          :string
    cost          :number
    quantity      :number
    sellingPrice  :number
    unit          :string
    discription   :string
    minQuantity   :number
    barcode       :string
    tva           :number
    id            :number
    category      :Category
    sousCategory  :SousCategory
     fournisseur  :Fournisseur
     image        :any
     companies    :Company[]

}
