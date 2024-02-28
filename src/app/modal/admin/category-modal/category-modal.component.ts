import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../../services/admin/category.service';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.css']
})
export class CategoryModalComponent implements OnInit{
 
  Form!: FormGroup
  Add = 'add'
  file! :any
  imageUrl!: string| null| ArrayBuffer;
  imagePath! : any
  formData = new FormData()
  constructor(private ref: MatDialogRef<CategoryModalComponent>, public fb: FormBuilder,
     @Inject(MAT_DIALOG_DATA) public data: { entity: any, type: string }, private categoryService : CategoryService,){
      this.Form = fb.group({
        'libelle': [''],
        'code': [''],
        'id': [''],
      })
  }

  ngOnInit(): void {
     if(this.categoryService.update){
        this.Add = "update"
        this.Form.setValue({
          libelle: this.data.entity.libelle,
          code: this.data.entity.code,
          id: this.data.entity.id
        })
        this.imageUrl=`http://localhost:8080/werehouse/image/${this.data.entity.image}/category/${this.data.entity.company.user.username}`
    
      }
  }

  submit(){
    const category = this.Form.value
    this.formData.append('categoryDto', JSON.stringify(category))
    this.formData.append('file', this.file)
    this.formData.forEach(x=>{console.log(x)})
  if (this.categoryService.update) {
    this.categoryService.updateCategory(this.formData).subscribe()
  } else {
    this.categoryService.addCategory(this.formData).subscribe()
  }
  this.close("saved successfully")
  }

  close(status : string){
  this.ref.close(status)
  this.categoryService.update = false
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
