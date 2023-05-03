import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CompanyService } from '../../../services/user/company/company.service';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/guest/login/login.service';

@Component({
  selector: 'app-add-company-modal',
  templateUrl: './add-company-modal.component.html',
  styleUrls: ['./add-company-modal.component.css']
})
export class AddCompanyModalComponent {

  companyForm : FormGroup
  file! :any
  imageUrl!: string| null| ArrayBuffer;
  imagePath! : any
  constructor(private ref : MatDialogRef<AddCompanyModalComponent>, public fb : FormBuilder, private companyService : CompanyService,
              private router : Router, private loginService : LoginService){
    this.companyForm = fb.group({
      'name':[''],
       'identityNumber':[''],
       'nationalIdNumber':[''],
       'address':[''],
       'indestrySector':[''],
       'capital':[''],
       'legalStructure':[''],
       'taxStatus':[''],
       'workForce':[''],
       'phone':[''],
       'email':[''],
    })
  }

  submit(){
    console.log(this.companyForm.value)
    const formData = new FormData()
    const company = this.companyForm.value
    formData.append('company',JSON.stringify(company))
    formData.append('file',this.file)
    this.companyService.addCompany(formData).subscribe(data=>{
      
      this.loginService.refreshToken().subscribe(data =>{
        let token = data['token'];
        localStorage.setItem('jwt',token)
      })
    this.close()
    this.router.navigate(["/my-company"])
    })
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
  }
}
