import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommandLineService } from '../../../services/admin/command-line.service';
import { ArticleService } from '../../../services/admin/article.service';
import { Article } from '../../../models/admin/Article';
import { Observable, switchMap, of, EMPTY, Subscription} from 'rxjs'
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
     @Inject(MAT_DIALOG_DATA) public data: { entity: any, type: string }, private commandLineService : CommandLineService){
      this.Form = fb.group({
        'libelle': [''],
        'quantity': [0]
      })
     }

     ngOnInit(){
      this.getAllArticle();
      if(this.commandLineService.update){
        console.log(this.data.entity)
        this.Form.setValue({
          libelle: this.data.entity.codeArticle,
          quantity: this.data.entity.quantity
        })
      }
     }

     getAllArticle(){
      this.article$ = this.articleService.getAllArticles(0)
    }

    submit(){
      if(this.Form.value.quantity != 0){

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
            console.log('selected article:', selectedArticle);
          });
        }else{
this.commandLineService.update = false
        }
        
  this.close("saved successfully")
    }

    close(status : string){
      
  this.ref.close(status)
      this.commandLineService.update = false
    }

    ngOnDestroy(): void {
  
      this.subscriptions.unsubscribe()
    }
}
