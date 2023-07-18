import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompanyService } from '../../../services/user/company/company.service';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/guest/login/login.service';

@Component({
  selector: 'app-add-company-modal',
  templateUrl: './add-company-modal.component.html',
  styleUrls: ['./add-company-modal.component.css']
})
export class AddCompanyModalComponent implements OnInit {

  companyForm : FormGroup
  file! :any
  imageUrl!: string| null| ArrayBuffer;
  imagePath! : any
  constructor(private ref : MatDialogRef<AddCompanyModalComponent>,
     @Inject(MAT_DIALOG_DATA) public data: { entity: any, type : string },
   public fb : FormBuilder, private companyService : CompanyService,
              private router : Router, private loginService : LoginService){
    this.companyForm = fb.group({
      'name':[''],
      'code':[''],
      'codecp':[''],
       'matfisc':[''],
       'address':[''],
       'phone':[''],
       'bankaccountnumber':[''],
       'email':[''],
       'indestrySector':[''],
       'capital':[''],
       'margin':[''],
       'rate':[],
       'raters':[''],
    })
  }
ngOnInit(): void {
  console.log(this.data.entity)
  let update = this.companyService.update
  if(this.data.type === "update"){
    this.companyForm.setValue({
      name : this.data.entity.name,
      code : this.data.entity.code,
      codecp : this.data.entity.codecp,
      matfisc : this.data.entity.matfisc,
      address : this.data.entity.address,
      phone : this.data.entity.phone,
      bankaccountnumber : this.data.entity.bankaccountnumber,
      email : this.data.entity.email,
      indestrySector : this.data.entity.indestrySector,
      capital : this.data.entity.capital,
      margin : this.data.entity.margin,
      rate : this.data.entity.rate,
      raters : this.data.entity.raters
    })
    this.imageUrl=`http://localhost:8080/werehouse/image/${this.data.entity.logo}/company/${this.data.entity.user.username}`
    
  }
}

  submit(){
    console.log(this.companyForm.value)

    const formData = new FormData()
    const company = this.companyForm.value
    formData.append('company',JSON.stringify(company))
    formData.append('file',this.file)
    if(this.data.type === "add"){
      this.companyService.addCompany(formData).subscribe(data=>{
        this.loginService.refreshToken().subscribe(data =>{
          let token = data['token'];
          localStorage.setItem('jwt',token)
          this.close()
          this.router.navigate(["/my-company"])
        })
      })
    }
    else{
      this.companyService.updateCompany(formData).subscribe(data =>{
        this.close()
        //  this.router.navigate(["/my-company"])
      })
    }
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
  close(){
    this.ref.close()
    this.companyService.update =false
  }
}
