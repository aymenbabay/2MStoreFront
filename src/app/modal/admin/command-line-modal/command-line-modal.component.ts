import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommandLineService } from '../../../services/admin/command-line.service';
import { ArticleService } from '../../../services/admin/article.service';
import { Article } from '../../../models/admin/Article';
import { Observable, switchMap, of, EMPTY, Subscription} from 'rxjs'
import { CommandLine } from '../../../models/admin/lineCommande';
@Component({
  selector: 'app-command-line-modal',
  templateUrl: './command-line-modal.component.html',
  styleUrls: ['./command-line-modal.component.css']
})
export class CommandLineModalComponent  implements OnInit, OnDestroy{

  
  private subscriptions: Subscription = new Subscription();
  Form!: FormGroup
  article$!: Observable<Article[]>


  constructor(private ref: MatDialogRef<CommandLineModalComponent>, public fb: FormBuilder, private articleService : ArticleService,
     @Inject(MAT_DIALOG_DATA) public data: { entity: any, type: string, index : number }, private commandLineService : CommandLineService){
      this.Form = fb.group({
        'libelle': [''],
        'quantity': [0], 
        'discount' : [0]
      })
      console.log(data)
     }

     ngOnInit(){
      this.getAllArticle();
      console.log(this.data.entity)
      if(this.commandLineService.update){
        console.log(this.data.entity)
        this.Form = this.fb.group({
          'libelle': this.data.entity.article.code,
          'quantity': this.data.entity.quantity,
          'discount': this.data.entity.discount
        })
      }
      
     }

     getAllArticle(){
      this.article$ = this.articleService.getAllArticles(0,1)
    }

    submit(){
      
      if(this.Form.value.quantity != 0 && this.data.index === -1){
        this.article$.pipe(
          switchMap(articles => {
            const selectedArticle = articles.find(article => article.code.toString() === this.Form.value.libelle);
            if(selectedArticle){
        const commandLine =new CommandLine()
        commandLine.article = selectedArticle
        commandLine.quantity = this.Form.value.quantity
        commandLine.discount = this.Form.value.discount
        if(this.Form.value.discount === undefined){
          commandLine.discount = 0
        }
        this.commandLineService.commandLine$.push(commandLine)
            }
            return selectedArticle ? of(selectedArticle) : EMPTY;
          })
          ).subscribe(selectedArticle => {
          });
        }

        if(this.data.index !== -1){
          console.log(this.data.index)
         let newLine =  this.commandLineService.commandLine$[this.data.index]
         newLine.quantity = this.Form.value.quantity
         this.commandLineService.commandLine$[this.data.index] = newLine
        }
    this.close("saved successfully")
    }

    close(status : string){
      
  this.ref.close(status)
    }

    ngOnDestroy(): void {
  
      this.subscriptions.unsubscribe()
    }
}
