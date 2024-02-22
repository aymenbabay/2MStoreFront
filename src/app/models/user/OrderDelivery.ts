import { DeliveryType } from "@cloudinary/url-gen/types/types";
import { PurchaseOrderLine } from "./purchaseOrderLine";
import { delivery } from "./Delivery";
import { DeliveryStatus } from "../../enums/DeliveryStatus";

export class OrderDelivery {
    delivery! : delivery 
    order!   : PurchaseOrderLine
    status!  :DeliveryStatus 
    note !: string
    deliveryConfirmed!  :boolean
}