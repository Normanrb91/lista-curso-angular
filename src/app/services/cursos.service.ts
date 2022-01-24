import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Curso } from '../models/curso';


@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private listaCursos: Curso[];
  private _listacursos;
  readonly listaCursos$;
  

  constructor() { 
    this._listacursos = new Subject<Curso[]>();
    this.listaCursos$ = this._listacursos.asObservable();
    this.listaCursos = [];
    this.readFile(); 
  }

  getCuros(){
    return [...this.listaCursos];
  }

  getCuro(ind: number){
    return this.listaCursos[ind];
  }

  addCurso(curso: Curso){
    this.listaCursos.push(curso);
    this._listacursos.next([...this.listaCursos]);
    this.writeFiles();
  }

  deleteCUrso(curso: Curso){
    this.listaCursos = this.listaCursos.filter(cur => cur != curso);
    this._listacursos.next([...this.listaCursos]);
    this.writeFiles();
  }

  modify(curso: Curso, ind: number){
    this.listaCursos.splice(ind, 1, curso);
    this._listacursos.next([...this.listaCursos]);
    this.writeFiles();
  }

  async writeFiles(){
    await Filesystem.writeFile({
      path: 'cursos.json',
      data: JSON.stringify(this.listaCursos),
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
  };
  
  async readFile(){
    const contents = await Filesystem.readFile({
      path: 'cursos.json',
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
    
    const data = await JSON.parse(contents.data);
    data.forEach(curso => {
      this.listaCursos.push(new Curso(curso.nombre, curso.puntuacion, curso.foto));
    });
    
    this._listacursos.next([...this.listaCursos]);
  };

}
