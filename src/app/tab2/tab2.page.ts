import { Component, ViewChild,OnInit } from '@angular/core';
import {IonSegment} from "@ionic/angular";
import { NoticiasService } from '../services/noticias.service';
import { Article } from '../interfaces/index';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  @ViewChild(IonSegment, {static:true}) segmento: IonSegment;

  categorias: string[] = ['business','entertainment','general','health','science','sports','technology']
  noticias: Article[] = [];

  constructor(private NoticiasService: NoticiasService) {}

  ngOnInit() {
    this.segmento.value = this.categorias[0]
    this.cargarNoticias(this.categorias[2]);
  }

  cambioCategoria(event){
    console.log(event.detail.value);
    this.noticias = [];
    this.cargarNoticias(event.detail.value);

  }

  cargarNoticias(categoria: string, event?){
    this.NoticiasService.getTopHeadLinesCategoria(categoria)
    .subscribe(resp =>{
      this.noticias.push(...resp.articles);

      if(event){
        event.target.complete();
      }

    })


  }
  loadData(event){
    this.cargarNoticias(this.segmento.value, event)
}

}
