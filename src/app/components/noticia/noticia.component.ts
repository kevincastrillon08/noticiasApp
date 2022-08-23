import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/index';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: Article;
  @Input() indice: number;

  constructor(private actionCtrl: ActionSheetController,
              private socialSharing: SocialSharing,
              private StorageService: StorageService,
              private iab: InAppBrowser) { }

  ngOnInit() { }

  abrirNoticia(){
    const browser = this.iab.create(this.noticia.url);

  }

  async LanzarMenu() {
    const noticiaEnFavoritos = this.StorageService.noticiaEnFavoritos(this.noticia);
    const actionSheet = await this.actionCtrl.create({
      buttons: [{
        text: 'compartir',
        icon: 'share-social-outline',
        id: 'delete-button',
        handler: () => {
          this.socialSharing.share(
          this.noticia.title,
          this.noticia.source.name,
          '',
          this.noticia.url
          );
        }
      }, {
        text: noticiaEnFavoritos ? 'Remover De Favoritos' : 'Agregar a Favoritos',
        icon: noticiaEnFavoritos ? 'star-half' : 'share',
        handler: () => {
         this.StorageService.saveRemoveNoticia(this.noticia);
        }
      }, {
        text:  'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('click en el boton cancelar');
        }
      }]
    });
    await actionSheet.present();
  }
}
