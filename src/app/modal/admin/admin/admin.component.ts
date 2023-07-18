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
import { CompanyArticle } from '../../../models/admin/companyArticle';
import { Provider } from '../../../models/admin/provider';


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
  article$!: Observable<CompanyArticle[]>
  file! :any
  imageUrl!: string| null| ArrayBuffer;
  imagePath! : any
   formData = new FormData()
  constructor(private ref: MatDialogRef<AdminComponent>, public fb: FormBuilder,
    private articleService: ArticleService, @Inject(MAT_DIALOG_DATA) public data: { entity: any, type: string },
    private router: Router, private clientService : ClientService, private categoryService : CategoryService,
    private sousCategoryService : SousCategoryService, private commandLineService : CommandLineService,
    private providerService : ProviderService, private workerService : WorkerService, private invoiceService : InvoiceService
    ) {
      this.type = data.type
      switch (data.type){
                  case 'article':
                    this.article = true
                    this.Form = fb.group({
                      'libelle': [''],
                      'code': [''],
                      'cost': [],
                      'quantity': [],
                      'sellingPrice': [],
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
                      'company':[],
                      'article':[]
                    })
      break;

      case 'articleFromExistProvider':
        this.Form = fb.group({
          'idProvider':[],
          'idArticle' : []

        })

        break;

      case 'Quantity':
         this.Form = fb.group({
          'libelle': [''],
          'quantity': [''],
          'id': ['']
         })
        break;

      case 'client':
        this.Form = fb.group({
          'name': [''],
          'code': [''],
          'nature': [''],
          'bankaccountnumber':[''],
          'indestrySector':[''],
          'matfisc':[''],
          'credit': [''],
          'mvt': [''],
          'phone': [''],
          'address': [''],
          'email': [''],
          'id': ['']
        })
        break;
        case 'category':
          this.Form = fb.group({
            'libelle': [''],
            'code': [''],
            'id': ['']
          })
          break;
          case 'provider':
            this.Form = fb.group({
              'name': [''],
              'matfisc': [''],
              'bankaccountnumber': [''],
              'indestrySector': [''],
              'code': [''],
              'nature': [''],
              'credit': [''],
              'mvt': [''],
              'phone': [''],
              'address': [''],
              'email': [''],
              'id': ['']
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

                case 'vacation':
                  this.Form = fb.group({
                    'startdate':[],
                    'enddate':[],
                    'remainingday':[],
                    'usedday':[],
                    'worker':[]
                  })
                break;

                case 'invoice':
                  this.Form = fb.group({
                    'name': [''],
                    'code': [''],
                    'nature': [''],
                    'credit': [''],
                    'mvt': [''],
                    'phone': [''],
                    'address': [''],
                    'email': [''],
                    'id': ['']
                  })
                  break;

                  case "command":
                    this.Form = fb.group({
                      'libelle': [''],
                      'quantity': [0]
                    })
                    break

                  default:
                    console.log("sal")
    break;
}

  }

ngOnInit(): void {

  switch (this.data.type){
    case 'article':
      this.getAllCategory()
      this.getAllVirtualProviders()
      this.providerService.getMeProviderId().subscribe(x =>{
        this.providerId =x
        console.log(this.providerId+" "+this.data.entity.article.provider.id)
        if(this.articleService.update && this.providerId === this.data.entity.article.provider.id){
          this.getSubcategories("any",this.data.entity.category.id)
          this.Add = "update"
          this.Form.setValue({
            libelle: this.data.entity.article.libelle,
            code: this.data.entity.article.code,
          cost: this.data.entity.article.cost,
          quantity: this.data.entity.article.quantity,
          sellingPrice: this.data.entity.article.sellingPrice,
          unit: this.data.entity.article.unit,
          discription: this.data.entity.article.discription,
          minQuantity: this.data.entity.article.minQuantity,
          barcode: this.data.entity.article.barcode,
          tva: this.data.entity.article.tva,
          provider: this.data.entity.article.provider.id,
          id: this.data.entity.article.id,
          category: this.data.entity.article.category.id,
          subCategory: this.data.entity.article.subCategory.id,
          image: this.data.entity.article.image,
        })
      
        this.imageUrl=`http://localhost:8080/werehouse/image/${this.data.entity.article.image}/article/${this.data.entity.article.provider.company.user.username}`
      }
    })
  break;
  
  
  case 'articleFromExistProvider':
    this.getAllProviders()
    this.Form.setValue({
      idProvider:0,
      idArticle : 0
    })

    break;

  case 'Quantity':
      this.Form.setValue({
        libelle: this.data.entity.libelle,
        quantity:0,
        id: this.data.entity.id
      })
      break;

  case 'client':
    if(this.clientService.update){
      this.Add = "update"
      this.Form.setValue({
        name: this.data.entity.name,
        code: this.data.entity.code,
        nature: this.data.entity.nature,
        credit: this.data.entity.credit,
        mvt: this.data.entity.mvt,
        phone: this.data.entity.phone,
        address: this.data.entity.address,
        email: this.data.entity.email,
        id: this.data.entity.id
      })
    }
    break;
    case 'category':
      if(this.categoryService.update){
        this.Add = "update"
        this.Form.setValue({
          libelle: this.data.entity.libelle,
          code: this.data.entity.code,
          id: this.data.entity.id
        })
        this.imageUrl=`http://localhost:8080/werehouse/image/${this.data.entity.image}/category/${this.data.entity.company.user.username}`
    
      }
      break;
      case 'provider':
        if(this.providerService.update){
          this.Add = "update"
          this.Form.setValue({
            name: this.data.entity.name,
            code: this.data.entity.code,
            matfisc: this.data.entity.matfisc,
            bankaccountnumber: this.data.entity.bankaccountnumber,
            indestrySector: this.data.entity.indestrySector,
          nature: this.data.entity.nature,
          credit: this.data.entity.credit,
          mvt: this.data.entity.mvt,
          phone: this.data.entity.phone,
          address: this.data.entity.address,
          email: this.data.entity.email,
          id: this.data.entity.id
        })
      }
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

              case 'vacation':
                
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
                this.Form.setValue({
                  startdate: today.toISOString().substring(0, 10),
                  enddate: tomorrow.toISOString().substring(0, 10),
                  remainingday : this.data.entity.totdayvacation,
                  usedday : 0,
                  worker: this.data.entity.id
                })
                break

          case 'invoice':
            this.getAllClient();
            if(this.invoiceService.update){
              this.Form.setValue({
                name: this.data.entity.name,
                code: this.data.entity.code,
                nature: this.data.entity.nature,
                credit: this.data.entity.credit,
                mvt: this.data.entity.mvt,
                phone: this.data.entity.phone,
                address: this.data.entity.address,
                email: this.data.entity.email,
                id: this.data.entity.id
              })
            }
              break;

              case "command":
                this.getAllArticle();
                if(this.commandLineService.update){
                  console.log(this.data.entity)
                  this.Form.setValue({
                    libelle: this.data.entity.codeArticle,
                    quantity: this.data.entity.quantity
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
   this.categories$ = this.categoryService.getAllCategories()
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
      this.subCategories$ = this.sousCategoryService.getAllByCategoryId($event.target.value)
    }else{
      this.subCategories$ = this.sousCategoryService.getAllByCategoryId(id)

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

  getAllClient(){
    this.client$ = this.clientService.getAllMyClients();
    this.client$.subscribe(data =>console.log(data))
  }

  getAllArticle(){
    this.article$ = this.articleService.getAllArticles(0)
  }

  // ----------------------------------------submit---------------------------------------------------
 submit(){
  switch (this.data.type){
    case 'article':
      let body = {

        code: this.Form.value.code,
        libelle: this.Form.value.libelle,
        cost: this.Form.value.cost,
        quantity: this.Form.value.quantity,
        sellingPrice: this.Form.value.sellingPrice,
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
      if(!this.articleService.update){

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
      //  if(this.Form.value.category&&this.articleService.update){body.category = this.Form.value.category.id}
      //  if(this.Form.value.subCategory&&this.articleService.update){body.subCategory = this.Form.value.subCategory.id}
      //  if(this.Form.value.provider&&this.articleService.update){body.provider = this.Form.value.provider.id
      // console.log(this.Form.value)}
      this.formData.append('article',JSON.stringify(body))
      this.formData.append('file',this.file)
    if (this.articleService.update) {
      console.log(body)
      this.articleService.updateArticle(this.formData).subscribe()
    } else {
      console.log(body)
      this.articleService.addArticle(this.formData).subscribe()
    }
    break;

    case 'Quantity':
      console.log(this.Form.value)
    this.articleService.addQuantity(this.Form.value.quantity, this.Form.value.id).subscribe()
    break;

    case 'client':
    if (this.clientService.update) {
      console.log(this.Form.value.id)
      this.clientService.updateClient(this.Form.value, this.Form.value.id).subscribe()
    } else {
      this.clientService.addClient(this.Form.value).subscribe()
    }
    break;
    case 'category':
      const category = this.Form.value
      this.formData.append('categoryDto', JSON.stringify(category))
      this.formData.append('file', this.file)
    if (this.categoryService.update) {
      this.categoryService.updateCategory(this.formData).subscribe()
    } else {
      this.categoryService.addCategory(this.formData).subscribe()
    }
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
    case 'worker':
    if (this.workerService.update) {
      this.workerService.updateWorker(this.Form.value).subscribe()
    } else {
      this.workerService.addWorker(this.Form.value).subscribe()
    }
    break;

    case 'vacation':
      this.Form.setValue({
        startdate: this.Form.value.startdate,
        enddate: this.Form.value.enddate,
        remainingday: this.Form.value.remainingday,
        usedday: this.Form.value.usedday,
        worker : {id:this.Form.value.worker}
      })
      this.workerService.addVacation(this.Form.value).subscribe()
      break;

    case 'provider':
    if (this.providerService.update) {
      this.providerService.updateProvider(this.Form.value,this.Form.value.id).subscribe()
    } else {
      this.providerService.addProvider(this.Form.value).subscribe()
    }
    break;


    case 'invoice':
    if (this.invoiceService.update) {
      this.invoiceService.updateInvoice(this.Form.value.code).subscribe()
    } else {
      const mySubsc = this.client$
      .pipe(
        switchMap(clients => {
          const selectedClient =  clients.find(client => client.id.toString() === this.Form.value.name);
          if (selectedClient) {
            this.invoiceService.client =selectedClient
          }
          return selectedClient ? of(selectedClient) : EMPTY;
        })
      )
      .subscribe(selectedClient => {
        console.log('selectedClient:', selectedClient);
         this.router.navigate(["/my-company/invoice/command"])
      });
      this.subscriptions.add(mySubsc)

    }
    break;

    case "command":

      if(this.Form.value.quantity != 0 && !this.commandLineService.update){

        this.article$.pipe(
          switchMap(articles => {
            const selectedArticle = articles.find(article => article.article.code.toString() === this.Form.value.libelle);
            if(selectedArticle){
              this.commandLineService.article$ =selectedArticle.article
              this.commandLineService.qte = this.Form.value.quantity
            }
            return selectedArticle ? of(selectedArticle) : EMPTY;
          })
          ).subscribe(selectedArticle => {
            console.log('selectedClient:', selectedArticle.article);
          });
        }else{
this.commandLineService.update = false
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
    case 'article':
      this.articleService.update = false
      break
      case 'client':
        this.clientService.update = false
        break
        case 'category':
          this.categoryService.update = false
          break
          case 'provider':
            this.providerService.update = false
            break
            case 'worker':
              this.workerService.update = false
              break
              case 'sous-category':
                this.sousCategoryService.update = false
                break;
                case 'command':
                  this.commandLineService.update = false
                  break
                default:
                  break
  }
}


ngOnDestroy(): void {
  
  this.subscriptions.unsubscribe()
}
}
