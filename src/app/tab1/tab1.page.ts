import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../services/noticias.service';
import { Article } from '../interfaces/index';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) { }

  ngOnInit() {
    this.cargarNoticias();
  }

  cargarNoticias(event?) {
    this.noticiasService.getTopHeadLines()
      .subscribe(resp => {

        if (resp.articles.length === 0){
          event.target.disable = true;
        return
        }

        this.noticias.push(...resp.articles);

      
      })
  }

loadData(event){
  this.cargarNoticias(event);

   if (event){
    event.target.complete();
   }
 
}

}
