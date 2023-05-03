import { Component ,OnInit} from '@angular/core';
import { Inventory } from '../../../../models/admin/inventory';
import { AdminComponent } from '../../../../modal/admin/admin/admin.component';
import { InventoryService } from '../../../../services/admin/inventory.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent  implements OnInit {

  inventories!:Observable<Inventory[]>
  constructor( private inventoryService: InventoryService){
   
  }

  ngOnInit() {
    this.getAllInventorys()
  }
  
  getAllInventorys(){
    this.inventories = this.inventoryService.getAllInventorys()
    this.inventories.subscribe(data => console.log(data))
  }


  
 


}
