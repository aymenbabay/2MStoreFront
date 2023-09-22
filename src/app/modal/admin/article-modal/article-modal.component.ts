import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ArticleService } from '../../../services/admin/article.service';
import { Category } from '../../../models/admin/category';
import { SubCategory } from '../../../models/admin/sub-category';
import { Observable } from 'rxjs'
import { Provider } from '../../../models/admin/provider';
import { SousCategoryService } from '../../../services/admin/sous-category.service';
import { ProviderService } from '../../../services/admin/provider.service';
import { CategoryService } from '../../../services/admin/category.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-article-modal',
  templateUrl: './article-modal.component.html',
  styleUrls: ['./article-modal.component.css']
})
export class ArticleModalComponent implements OnInit{
  Form!: FormGroup
  Add = "Add"
  type = "article"
  categories$!:Observable<Category[]>
  subCategories$!:Observable<SubCategory[]>
  providers$!:Observable<Provider[]>
  imageUrl!: string| null| ArrayBuffer;
  file! :any
  imagePath! : any
  formData = new FormData()
  categoryId! : number
  subCategoryId! : number
  constructor(private ref: MatDialogRef<ArticleModalComponent>, public fb: FormBuilder,
    private articleService: ArticleService, @Inject(MAT_DIALOG_DATA) public data: { entity: any, type: string},
    private sousCategoryService : SousCategoryService, private providerService :ProviderService,
     private categoryService : CategoryService
    ){
      this.type = this.data.type
      console.log(this.type)
      switch (this.data.type){
                  case 'article':
                    this.Form = this.fb.group({
                      'libelle': [''],
                      'code': [''],
                      'cost': [],
                      'quantity': [],
                      'margin': [],
                      'unit': [''],
                      'discription': [''],
                      'minQuantity': [],
                      'barcode': [''],
                      'tva': [],
                     'provider': [],
                      'category': [],
                      'subCategory': [],
                      'id': [],
                      'image':[],
                    })
      break;
                     
      case 'Quantity':
        this.Form = fb.group({
         'libelle': [''],
         'quantity': [''],
         'id': ['']
        })
       break;
    }
    }

    ngOnInit(): void {
      console.log(this.data.entity)
      switch(this.data.type){
        
  case 'Quantity':
    this.type = this.data.type
    this.Form.setValue({
      libelle: this.data.entity.libelle,
      quantity:0,
      id: this.data.entity.id
    })
    break;
    default :
        this.getAllCategory()
      this.getAllVirtualProviders()
      if (this.articleService.update){
        this.Add = "update"
        this.getSubcategories("any",this.data.entity.category.id)
        this.categoryId = this.data.entity.category.id;
        this.subCategoryId = this.data.entity.subCategory.id;
            if(this.data.type==='companyArticle'){
              this.Form.setValue({
                libelle: this.data.entity.article.libelle,
                code: this.data.entity.article.code,
              quantity: this.data.entity.quantity,
              margin: this.data.entity.article.margin,
              id: this.data.entity.article.id,
              category: this.data.entity.category.id,
              subCategory: this.data.entity.subCategory.id,
            })
          
          }
          else{
            this.Form.setValue({
              libelle: this.data.entity.libelle,
              code: this.data.entity.code,
            cost: this.data.entity.cost,
            quantity: this.data.entity.quantity,
            margin: this.data.entity.margin,
            unit: this.data.entity.unit,
            discription: this.data.entity.discription,
            minQuantity: this.data.entity.minQuantity,
            barcode: this.data.entity.barcode,
            tva: this.data.entity.tva,
            provider: this.data.entity.provider.id,
            id: this.data.entity.id,
            category: this.data.entity.category.id,
            subCategory: this.data.entity.subCategory.id,
            image: this.data.entity.image,
          })
          
          this.imageUrl=`http://localhost:8080/werehouse/image/${this.data.entity.image}/article/${this.data.entity.provider.company.user.username}`
          
        }
          }
      }
  }

  getAllCategory(){
    this.categories$ = this.categoryService.getAllCategories()
    this.categories$.subscribe(data =>console.log(data))
   }

   getAllVirtualProviders(){
    this.providers$ = this.providerService.getAllMyVirtualProviders()
  }

    getSubcategories($event:any, id:number){
      if(id===0){
  
        console.log($event.target.value)
        this.subCategories$ = this.sousCategoryService.getAllByCategoryId($event.target.value)
      }else{
        this.subCategories$ = this.sousCategoryService.getAllByCategoryId(id)
  
      }
  
    }

    submit(){
      switch (this.data.type){
        case 'Quantity':
          this.articleService.addQuantity(this.Form.value.quantity,this.Form.value.id).subscribe()
          break;
          default :
          let Id
          this.providerService.getMeProviderId().subscribe(x=>{Id = x})
          console.log(this.data.entity)
          if(this.Add === 'Add' || (this.Add === 'update' && Id === this.data.entity.provider.id)){

            let body = {
              
        code: this.Form.value.code,
        libelle: this.Form.value.libelle,
        cost: this.Form.value.cost,
        quantity: this.Form.value.quantity,
        margin: this.Form.value.margin,
        unit: this.Form.value.unit,
        discription: this.Form.value.discription,
        minQuantity: this.Form.value.minQuantity,
        barcode: this.Form.value.barcode,
        tva: this.Form.value.tva,
        id: this.Form.value.id,
        category: this.Form.value.category,
        provider: this.Form.value.provider,
        subCategory: this.Form.value.subCategory
        
      }
        if(this.Add === "Add"){

          if(this.Form.value.provider ){
            body.provider = {id:this.Form.value.provider}
          }
          if(this.Form.value.category){
            body.category = {id:this.Form.value.category}
          }
          if(this.Form.value.subCategory){
            body.subCategory = {id:this.Form.value.subCategory}
          }
        }
        
      
        this.formData.append('article',JSON.stringify(body))
        this.formData.append('file',this.file)
        if (this.articleService.update) {
          console.log(body)
          this.articleService.updateArticle(this.formData).subscribe()
        } else {
          console.log(body)
          this.articleService.addArticle(this.formData).subscribe()
        }
      }
      else{
        console.log(this.Form.value)
        this.Form.setValue({
          libelle: this.Form.value.libelle,
          code: this.Form.value.code,
          quantity: this.Form.value.quantity,
          margin: this.Form.value.margin,
          id: this.Form.value.id,
          category: {id:this.categoryId},
          subCategory: {id:this.subCategoryId},
        })
        console.log(this.Form.value)
        this.articleService.UpdateCompanyArticle(this.Form.value).subscribe()
      }
    }
      this.close("article")
    }
    
    close(status : string){
      this.ref.close(status)
      switch (this.data.type){
        case 'article':
          this.articleService.update = false
          break
          
        }
    }

    updateIds(event:any){
      this.subCategoryId = event.target.value
      this.categoryId = this.Form.value.category
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
