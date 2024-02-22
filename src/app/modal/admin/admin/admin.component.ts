import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ArticleService } from '../../../services/admin/article.service';
import { ClientService } from '../../../services/admin/client.service';
import { CategoryService } from '../../../services/admin/category.service';
import { SousCategoryService } from '../../../services/admin/sous-category.service';
import { ProviderService } from '../../../services/admin/provider.service';
import { WorkerService } from '../../../services/admin/worker.service';
import { Category } from '../../../models/admin/category';
import { EMPTY, Observable, Subscription, of, switchMap } from 'rxjs';
import { SubCategory } from '../../../models/admin/sub-category';
import { InvoiceService } from '../../../services/admin/invoice.service';
import { Client } from '../../../models/admin/client';
import { CommandLineService } from '../../../services/admin/command-line.service';
import { Provider } from '../../../models/admin/provider';
import { Article } from '../../../models/admin/Article';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription = new Subscription();

  Form!: FormGroup
  Add = "Add"
  type = ""
  client = false
  article = false
  categories$!:Observable<Category[]>
  subCategories$!:Observable<SubCategory[]>
  client$!:Observable<Client[]>
  providers$!:Observable<Provider[]>
  providerId = 0
  selectedOption! : any
  selectedCategoryId!: number
  article$!: Observable<Article[]>
  file! :any
  imageUrl!: string| null| ArrayBuffer;
  imagePath! : any
   formData = new FormData()
  constructor(private ref: MatDialogRef<AdminComponent>, public fb: FormBuilder,
    private articleService: ArticleService, @Inject(MAT_DIALOG_DATA) public data: { entity: any, type: string },
     private categoryService : CategoryService,
    private sousCategoryService : SousCategoryService, private providerService : ProviderService, private workerService : WorkerService,
    ) {
      this.type = data.type
      switch (data.type){

      case 'articleFromExistProvider':
        this.Form = fb.group({
          'idProvider':[],
          'idArticle' : []

        })

        break;
       
            case 'sous-category':
              this.Form = fb.group({
                'libelle': [''],
                'code': [''],
                'category': [null],
                'id': ['']
              })
              break;

              case 'worker':
                this.Form = fb.group({
                  'name': [''],
                  'salary': [''],
                  'phone': [''],
                  'address': [''],
                  'email': [''],
                  'id': [''],
                  'jobtitle': [''],
                  'department': [''],
                  'totdayvacation': [''],
                  'statusvacation': ['']
                })
                break;

                default:
                    console.log("sal")
    break;
}

  }

ngOnInit(): void {

  switch (this.data.type){
     
  case 'articleFromExistProvider':
    this.getAllProviders()
    this.Form.setValue({
      idProvider:0,
      idArticle : 0
    })

    break;

   
        case 'sous-category':

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
          break;
          case 'worker':
              console.log(this.data.entity)
              if(!this.workerService.update){

                this.Form.setValue({
                  name: this.data.entity.name,
                  salary: 0,
                  phone: this.data.entity.phone,
                  address: this.data.entity.address,
                  email: this.data.entity.email,
                  id: this.data.entity.id,
                  jobtitle: "",
                  department: "",
                  totdayvacation: 0,
                  statusvacation: false
                })
              }else{
                this.Add = "update"
                this.Form.setValue({
                  name: this.data.entity.name,
                  salary: this.data.entity.salary,
                  phone: this.data.entity.user.phone,
                  address: this.data.entity.user.address,
                  email: this.data.entity.user.email,
                  id: this.data.entity.id,
                  jobtitle: this.data.entity.jobtitle,
                  department: this.data.entity.department,
                  totdayvacation: this.data.entity.totdayvacation,
                  statusvacation: this.data.entity.statusvacation
                })
              }

              break;

             

            default:
              this.Form.setValue({
                undefined
              })
              break


}
  }
  getAllCategory(){
   this.categories$ = this.categoryService.getAllCategories(0)
   this.categories$.subscribe(data =>console.log(data))
  }

  getAllSubCategory(){

  }

  getAllVirtualProviders(){
    this.providers$ = this.providerService.getAllMyVirtualProviders()
  }

  getAllProviders(){
    this.providers$ = this.providerService.getAllProviders()
  }

  getProvidersArticle($event:any){
    // this.article$ = this.articleService.getAllArticlesByProviderId($event.target.value)
    // this.article$.subscribe(x =>console.log(x))
  }
  getSubcategories($event:any, id:number){
    if(id===0){

      console.log($event.target.value)
      this.subCategories$ = this.sousCategoryService.getAllByCategoryId($event.target.value,0)
    }else{
      this.subCategories$ = this.sousCategoryService.getAllByCategoryId(id,0)

    }

  }

  getArticle($event:any){
    const id = $event.target.value;
    this.article$.subscribe(articles => {
      const article = articles.find(a => a.id === id);
      if (article) {
        console.log(article);
      }
    });
  }

 

 

  // ----------------------------------------submit---------------------------------------------------
 submit(){
  switch (this.data.type){
   
    case 'Quantity':
      console.log(this.Form.value)
    this.articleService.addQuantity(this.Form.value.quantity, this.Form.value.id).subscribe()
    break;

    case 'sous-category':
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
    break;
   
    


    
  
  }
  this.close("saved successfully")
}

//cloud name dm4wzt8rr
// preset : aymenbabay
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


close(status : string){
  this.ref.close(status)
  switch (this.data.type){
   
          case 'provider':
            this.providerService.update = false
            break
           
              case 'sous-category':
                this.sousCategoryService.update = false
                break;
               
                default:
                  break
  }
}


ngOnDestroy(): void {
  
  this.subscriptions.unsubscribe()
}
}
