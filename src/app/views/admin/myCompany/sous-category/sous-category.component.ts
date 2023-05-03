import { Component, OnInit } from '@angular/core';
import { SousCategoryService } from '../../../../services/admin/sous-category.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AdminComponent } from '../../../../modal/admin/admin/admin.component';
import { SousCategory } from '../../../../models/admin/sous-category';

@Component({
  selector: 'app-sous-category',
  templateUrl: './sous-category.component.html',
  styleUrls: ['./sous-category.component.css']
})
export class SousCategoryComponent implements OnInit {

  sous_categories!:Observable<SousCategory[]>
  constructor(private dialog : MatDialog, private sousCategoryService: SousCategoryService){
   
  }

  ngOnInit(): void {
    this.getAllSousCategories()
  }
  
  getAllSousCategories(){
    this.sous_categories = this.sousCategoryService.getAllSousCategorys()
  
  }

  openSousCategoryModal(entity : SousCategory|null){
    let type = 'sous-category'
    const dialogRef = this.dialog.open(AdminComponent,
      {
        data: { entity, type },
        enterAnimationDuration:'1000ms',
         exitAnimationDuration:'1000ms'
      });
     dialogRef.afterClosed().subscribe(result => {
      if (result !== "undefined") {
        this.ngOnInit()
      }
     });
  }


  updateSousCategoryServer(sousCategory : SousCategory){
    this.sousCategoryService.update = true
    this.openSousCategoryModal(sousCategory)
  }

  deleteSousCategoryServer( name: String, id : number){
    const conf = window.confirm(`are you sure to delete ${name} !!`)
    if(conf){
      this.sousCategoryService.deleteSousCategory(id).subscribe()
     this.getAllSousCategories()
    }

  }

  track(index:number, sousCategory:SousCategory){
    console.log('Track called for item', sousCategory);
    return sousCategory.id
  }


}
