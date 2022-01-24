import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Curso } from 'src/app/models/curso';
import { CursosService } from 'src/app/services/cursos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagenesService } from 'src/app/services/imagenes.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.page.html',
  styleUrls: ['./cursos-form.page.scss'],
})
export class CursosFormPage implements OnInit {

  notas: number[];
  foto: string;
  curso: Curso;
  indice: number;

  formCurso: FormGroup;
  nombre: FormControl;
  puntuacion: FormControl;
 
  constructor(
    private cursoService: CursosService,
    private router: Router,
    private activateroute: ActivatedRoute,
    private imgService: ImagenesService) {}

  ngOnInit() {
    this.notas = [1,2,3,4,5];
    this.foto = 'assets/noimage.png';

    this.nombre = new FormControl('', [Validators.minLength(3), Validators.required]);
    this.puntuacion = new FormControl('', Validators.required);
    this.formCurso = new FormGroup({
      nombre: this.nombre,
      puntuacion: this.puntuacion
    });
  }

  ionViewWillEnter(){
    this.activateroute.params.subscribe(param => {
      if (param['i'] !== 'new') {
        this.indice = param['i'];
        this.curso = this.cursoService.getCuro(param['i']);
        this.foto = this.curso.foto;
        this.nombre.setValue(this.curso.nombre);
        this.puntuacion.setValue(this.curso.puntuacion);
      }
    });
  }

  messageError(campo: string){
    const error = this.formCurso.get(campo)?.errors;
    if( error?.required ) return 'El campo es obligatorio';
    else if(error?.minlength) return 'Al menos 3 caracteres';
    return '';
  }

  agregarCurso(){
    if(this.formCurso.invalid){
      this.formCurso.markAllAsTouched();
      return;
    }

    if(this.foto === 'assets/noimage.png') this.foto = '';

    this.cursoService.addCurso(new Curso(this.nombre.value, this.puntuacion.value, this.foto))
    this.router.navigate(['/cursos']);
  }

  modificarCurso(){
    if(this.formCurso.invalid){
      this.formCurso.markAllAsTouched();
      return;
    }

    if(this.foto === 'assets/noimage.png') this.foto = '';

    this.cursoService.modify(new Curso(this.nombre.value, this.puntuacion.value, this.foto), this.indice)
    this.router.navigate(['/cursos']);
  }

  async agregarImagen(){
    this.foto = await this.imgService.takePicture(); 
  }

}
