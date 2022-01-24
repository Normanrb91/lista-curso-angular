import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CursosService } from 'src/app/services/cursos.service';
import { Curso } from '../../models/curso';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage implements OnInit {

  listaCursos: Curso[];

  constructor(
    private cursosService: CursosService,
    private router: Router
    ) {}

  ngOnInit() {
    this.listaCursos = this.cursosService.getCuros();
    this.cursosService.listaCursos$.subscribe(data => this.listaCursos = data);
  }

  agregarCurso(){
    this.router.navigateByUrl('/form/new')
  }

  eliminarCurso(curso:Curso){
    this.cursosService.deleteCUrso(curso);
  }

  editar(ind: number){
    this.router.navigateByUrl(`form/${ind}`)
    
  }


}
