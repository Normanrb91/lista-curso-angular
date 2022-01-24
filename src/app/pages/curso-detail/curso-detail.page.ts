import { Component, OnInit } from '@angular/core';
import { Curso } from '../../models/curso';
import { CursosService } from '../../services/cursos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-curso-detail',
  templateUrl: './curso-detail.page.html',
  styleUrls: ['./curso-detail.page.scss'],
})
export class CursoDetailPage implements OnInit {

  curso: Curso;
  indice: number;

  constructor(
    private cursoservice: CursosService,
    private router: Router,
    private activateroute: ActivatedRoute,
    private allertcrt: AlertController,
  ) { }

  ngOnInit() {
    this.activateroute.params.subscribe(param => {
      this.curso = this.cursoservice.getCuro(param['i']);
      this.indice = param['i'];
    });
  }

  async eliminarCurso() {
    const alert = await this.allertcrt.create({
      cssClass: 'my-custom-class',
      header: this.curso.nombre,
      message: '<strong>¿Desea Eliminar?</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, 
        {
          text: 'OK',
          id: 'confirm-button',
          handler: () => {
            this.cursoservice.deleteCUrso(this.curso);
            this.router.navigateByUrl('/cursos');
          }
        }
      ]
    });

    await alert.present();
  }

  editar(){
    this.router.navigateByUrl(`form/${this.indice}`)
    
  }

}
