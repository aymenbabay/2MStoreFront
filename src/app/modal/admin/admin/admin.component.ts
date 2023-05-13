import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ArticleService } from '../../../services/admin/article.service';
import { Article } from '../../../models/admin/article';
import { ClientService } from '../../../services/admin/client.service';
import { CategoryService } from '../../../services/admin/category.service';
import { SousCategoryService } from '../../../services/admin/sous-category.service';
import { ProviderService } from '../../../services/admin/provider.service';
import { WorkerService } from '../../../services/admin/worker.service';
import { Category } from '../../../models/admin/category';
import { EMPTY, Observable, map, of, switchMap, take } from 'rxjs';
import { SousCategory } from '../../../models/admin/sous-category';
import { InvoiceService } from '../../../services/admin/invoice.service';
import { Client } from '../../../models/admin/client';
import { CommandLineService } from '../../../services/admin/command-line.service';
import { Provider } from '../../../models/admin/provider';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


  Form!: FormGroup
  Add = "Add"
  type = ""
  client = false
  article = false
  categories$!:Observable<Category[]>
  sousCategories$!:Observable<SousCategory[]>
  client$!:Observable<Client[]>
  providers$!:Observable<Provider[]>
  selectedOption! : any
  selectedCategoryId!: number
  article$!: Observable<Article[]>
  file! :any
  imageUrl!: string| null| ArrayBuffer;
  imagePath! : any
   formData = new FormData()
  constructor(private ref: MatDialogRef<AdminComponent>, public fb: FormBuilder,
    private articleService: ArticleService, @Inject(MAT_DIALOG_DATA) public data: { entity: any, type: string },
    private router: Router, private clientService : ClientService, private categoryService : CategoryService,
    private sousCategoryService : SousCategoryService, private commandLineService : CommandLineService,
    private providerService : ProviderService, private workerService : WorkerService, private invoiceService : InvoiceService,
    private http : HttpClient
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
                      'maxQuantity': [],
                      'barcode': [''],
                      'tva': [],
                     'provider': [],
                      'category': [],
                      'sousCategory': [],
                      'id': [],
                      'image':[]
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
      this.getAllProviders()
      if(this.articleService.update){
        this.Add = "update"
        this.Form.setValue({
          libelle: this.data.entity.libelle,
          code: this.data.entity.code,
          cost: this.data.entity.cost,
          quantity: this.data.entity.quantity,
          sellingPrice: this.data.entity.sellingPrice,
          unit: this.data.entity.unit,
          discription: this.data.entity.discription,
          minQuantity: this.data.entity.minQuantity,
          maxQuantity: this.data.entity.maxQuantity,
          barcode: this.data.entity.barcode,
          tva: this.data.entity.tva,
          provider: this.data.entity.provider,
          id: this.data.entity.id,
          category: this.data.entity.category.id,
          sousCategory: this.data.entity.sousCategory.id,
          image: this.data.entity.image
        })
        this.imageUrl=`http://localhost:8080/werehouse/image/${this.data.entity.image}/article`
      }
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
      }
      break;
      case 'provider':
        if(this.providerService.update){
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

  getAllProviders(){
    this.providers$ = this.providerService.getAllProviders()
  }

  getSubcategories($event:any){

      console.log($event.target.value)
      this.sousCategories$ = this.sousCategoryService.getAllByCategoryId($event.target.value)

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
        maxQuantity: this.Form.value.maxQuantity,
        barcode: this.Form.value.barcode,
        tva: this.Form.value.tva,
        id: this.Form.value.id,
        category: null as {}|null,
        provider: null as {}|null,
        sousCategory:null as {}|null

      }
      if(this.Form.value.category){body.category = {id:this.Form.value.category}}
      if(this.Form.value.sousCategory){body.sousCategory = {id:this.Form.value.sousCategory}}
      if(this.Form.value.provider){body.provider = {id:this.Form.value.provider}}
      this.formData.append('article',JSON.stringify(body))
      this.formData.append('file',this.file)
    if (this.articleService.update) {
      this.articleService.updateArticle(this.formData).subscribe()
    } else {
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
      this.client$
      .pipe(
        switchMap(clients => {
          const selectedClient =  clients.find(client => client.id.toString() === this.Form.value.name);
          if (selectedClient) {
            this.invoiceService.addInvoice(selectedClient).subscribe()
          }
          return selectedClient ? of(selectedClient) : EMPTY;
        })
      )
      .subscribe(selectedClient => {
        console.log('selectedClient:', selectedClient);
         this.router.navigate(["/my-company/invoice/command"])
      });
    }
    break;

    case "command":

      if(this.Form.value.quantity != 0 && !this.commandLineService.update){

        this.article$.pipe(
          switchMap(articles => {
            const selectedArticle = articles.find(article => article.code.toString() === this.Form.value.libelle);
            if(selectedArticle){
              this.commandLineService.article$ =selectedArticle
              this.commandLineService.qte = this.Form.value.quantity
            }
            return selectedArticle ? of(selectedArticle) : EMPTY;
          })
          ).subscribe(selectedArticle => {
            console.log('selectedClient:', selectedArticle);
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

}
