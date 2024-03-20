import { Component, OnInit } from '@angular/core';
import { SousCategoryService } from '../../../../services/admin/sous-category.service';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, Observable, catchError, combineLatest, map, of, take } from 'rxjs';
import { SubCategory } from '../../../../models/admin/sub-category';
import { parentIdSelector } from '../../../../store/reducer/state.reducer';
import { Store } from '@ngrx/store';
import { LoginService } from '../../../../services/guest/login/login.service';
import { SubCategoryModalComponent } from '../../../../modal/admin/sub-category-modal/sub-category-modal.component';

@Component({
  selector: 'app-sous-category',
  templateUrl: './sous-category.component.html',
  styleUrls: ['./sous-category.component.css']
})
export class SousCategoryComponent implements OnInit {

  sous_categories!:Observable<SubCategory[]>
  isAdmin$ : Observable<boolean>  = of(false);
  constructor(private dialog : MatDialog, private sousCategoryService: SousCategoryService, private store : Store , private loginService : LoginService){
   
  }

  ngOnInit(): void {
    this.getAllSousCategories()
    this.isAdmin$ = this.isAdmin()
  }
  
  getAllSousCategories(){
    this.sous_categories = this.sousCategoryService.getAllSousCategorys()
  
  }

  openSousCategoryModal(entity : SubCategory|null){
    let type = 'sous-category'
    const dialogRef = this.dialog.open(SubCategoryModalComponent,
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


  updateSousCategoryServer(sousCategory : SubCategory){
    this.sousCategoryService.update = true
    this.openSousCategoryModal(sousCategory)
  }

  deleteSousCategoryServer( name: String, id : number){
    const conf = window.confirm(`are you sure to delete ${name} !!`)
    if(conf){
      this.sousCategoryService.deleteSousCategory(id).subscribe(x =>{
        this.getAllSousCategories()
      })
    
    }

  }

  track(index:number, sousCategory:SubCategory){
    console.log('Track called for item', sousCategory);
    return sousCategory.id
  }

  isAdmin(): Observable<boolean> {
    return this.loginService.isadmin()
  }

}
