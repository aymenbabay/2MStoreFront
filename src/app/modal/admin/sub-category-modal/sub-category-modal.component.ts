import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Category } from '../../../models/admin/category';
import { CategoryService } from '../../../services/admin/category.service';
import { SousCategoryService } from '../../../services/admin/sous-category.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sub-category-modal',
  templateUrl: './sub-category-modal.component.html',
  styleUrls: ['./sub-category-modal.component.css']
})
export class SubCategoryModalComponent implements OnInit{

  
  Form!: FormGroup
  categories$!:Observable<Category[]>
  Add = "create "
  formData = new FormData()
  file! :any
  imageUrl!: string| null| ArrayBuffer;
  imagePath! : any
  constructor(private categoryService : CategoryService, private sousCategoryService: SousCategoryService, @Inject(MAT_DIALOG_DATA) public data: { entity: any, type: string }
  ,private ref: MatDialogRef<SubCategoryModalComponent> , private fb : FormBuilder){

    this.Form = fb.group({
      'libelle': [''],
      'code': [''],
      'category': [null],
      'id': ['']
    }) 
  }

  ngOnInit(): void {
    this.getAllCategory()
    if(this.sousCategoryService.update){
      this.Add = "update"
      this.Form.setValue({
        libelle: this.data.entity.libelle,
        code: this.data.entity.code,
        category: this.data.entity.category.id,
        id: this.data.entity.id
      })
    }
  }

  getAllCategory(){
    this.categories$ = this.categoryService.getAllCategories(0)
    this.categories$.subscribe(data =>console.log(data))
   }
 
   submit(){
    let bodysous= {
           
      libelle: this.Form.value.libelle,
      code: this.Form.value.code,
      category : null as {}|null,
      id: this.Form.value.id
    }
    if (this.Form.value.category) {
      bodysous.category = { id: this.Form.value.category };
    }
        this.formData.append('sousCategory', JSON.stringify(bodysous))
    this.formData.append('file', this.file)
    if (this.sousCategoryService.update) {
    this.sousCategoryService.updateSousCategory(this.formData).subscribe()
  } else {
    this.sousCategoryService.addSousCategory(this.formData).subscribe()
  }

  this.close("succefully")
   }

   close(status : string){
    this.ref.close(status)
    this.sousCategoryService.update = false
   }


   upload($event:any) {
    if($event.target.files.length >0){
  
      const file = $event.target.files[0];
      this.file = file;
      var mimeType = $event.target.files[0].type
  
      if(mimeType.match(/image\/*/) == null){
        alert('accept only image')
        return;
      }
  
      var reader = new FileReader()
  
      this.imagePath = file
      reader.readAsDataURL(file)
      reader.onload = (_event)=>{
        this.imageUrl = reader.result
      }
      }
  }

}
