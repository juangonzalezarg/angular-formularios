import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

  miFormulario = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    favoritos: this.formBuilder.array([
      ['Mario Bros', Validators.required],
      ['Minecraft', Validators.required]
    ], Validators.required)
  });

  nuevo: FormControl = this.formBuilder.control('', Validators.required);

  get favoritosArr() {
    return this.miFormulario.get('favoritos') as FormArray;
  }

  constructor(private formBuilder: FormBuilder) { }

  campoEsValido(campo: string) {
    return this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
  }

  agregar() {
    if (this.nuevo.invalid) { return; }

    // this.favoritosArr.push(new FormControl(this.nuevo.value, Validators.required));
    this.favoritosArr.push(this.formBuilder.control(this.nuevo.value, Validators.required));

    this.nuevo.reset();
  }

  borrar(index: number) {
    this.favoritosArr.removeAt(index);
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }

}
