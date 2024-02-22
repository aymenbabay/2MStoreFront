import { Component , OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, catchError, combineLatest, map, of, take } from 'rxjs';
import { Category } from '../../../../models/admin/category';
import { CategoryService } from '../../../../services/admin/category.service';
import { AdminComponent } from '../../../../modal/admin/admin/admin.component';
import { CategoryModalComponent } from '../../../../modal/admin/category-modal/category-modal.component';
import { Store } from '@ngrx/store';
import { parentIdSelector } from '../../../../store/reducer/state.reducer';
import { LoginService } from '../../../../services/guest/login/login.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories!:Observable<Category[]>
  isAdmin$: Observable<boolean> = of(false);

  constructor(private dialog : MatDialog, private categoryService: CategoryService, private store : Store, private loginService : LoginService){
   
  }

  ngOnInit(): void {
    this.getAllCategorys()
    this.isAdmin$ = this.isAdmin()
  }
  
  getAllCategorys(){
    this.categories = this.categoryService.getAllCategories(0)
    this.categories.subscribe(x =>console.log(x))
  
  }

  openCategoryModal(entity : Category|null){
    let type = 'category'
    const dialogRef = this.dialog.open(CategoryModalComponent,
      {
        data: { entity, type },
        enterAnimationDuration:'1000ms',
         exitAnimationDuration:'1000ms'
      });
     dialogRef.afterClosed().subscribe((result:any) => {
      if (result !== "undefined") {
        this.ngOnInit()
      }
     });
  }


  updateCategoryServer(category : Category){
    this.categoryService.update = true
    console.log(category.id)
    this.openCategoryModal(category)
  }

  deleteCategoryServer( name: String, id : number){
    const conf = window.confirm(`are you sure to delete ${name} !!`)
    if(conf){
      this.categoryService.deleteCategory(id).subscribe(x =>{
        this.getAllCategorys()
      })
    
    }

  }

  
  isAdmin(): Observable<boolean> {
    return this.loginService.isadmin()
   }


}
