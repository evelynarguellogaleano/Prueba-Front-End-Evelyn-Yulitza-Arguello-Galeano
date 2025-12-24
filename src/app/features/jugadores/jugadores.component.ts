import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { JugadorService } from '../../core/services/jugador.service';
import { Jugador, EQUIPOS } from '../../core/models/jugador.interface';
import { Observable } from 'rxjs';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';

@Component({
    selector: 'app-jugadores',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ConfirmModalComponent],
    templateUrl: './jugadores.component.html',
    styleUrls: ['./jugadores.component.css']
})
export class JugadoresComponent implements OnInit {
    jugadorForm: FormGroup;
    jugadores$: Observable<Jugador[]>;
    equipos = EQUIPOS;
    mostrarCampeonatos: boolean = false;
    errorSubmit: string = '';
    editando: boolean = false;
    codigoOriginalEdicion: string | null = null;
    formVisible: boolean = false;
    modalEliminarVisible: boolean = false;
    jugadorAEliminar: string | null = null;

    constructor(private fb: FormBuilder, private jugadorService: JugadorService) {
        this.jugadorForm = this.fb.group({
            codigo: ['', [Validators.required, Validators.maxLength(10), this.codigoValidator]],
            nombres: ['', [Validators.required, Validators.maxLength(100)]],
            camiseta: ['', [Validators.maxLength(2), this.numericoValidator]],
            equipo: ['', Validators.required],
            campeonatos: ['']
        });
        this.jugadores$ = this.jugadorService.getJugadores();
    }

    ngOnInit(): void {
        this.jugadorForm.get('equipo')?.valueChanges.subscribe(equipo => {
            this.verificarCampeonatos(equipo);
        });
    }

    private codigoValidator(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        if (!value) return null;

        if (!/^[A-Z0-9]+$/.test(value)) {
            return { invalidFormat: true };
        }

        const tieneLetras = /[A-Z]/.test(value);
        const tieneNumeros = /[0-9]/.test(value);

        if (!tieneLetras || !tieneNumeros) {
            return { noAlfanumerico: true };
        }

        return null;
    }

    private numericoValidator(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        if (!value) return null;

        const valid = /^[0-9]+$/.test(value);
        return valid ? null : { soloNumeros: true };
    }

    private verificarCampeonatos(equipo: string): void {
        if (!equipo) {
            this.mostrarCampeonatos = false;
            return;
        }
        const firstChar = equipo.toLowerCase().charAt(0);
        this.mostrarCampeonatos = firstChar === 'a' || firstChar === 'b';

        const campControl = this.jugadorForm.get('campeonatos');
        if (this.mostrarCampeonatos) {
            campControl?.setValidators([Validators.required, Validators.maxLength(3), this.numericoValidator]);
        } else {
            campControl?.clearValidators();
            campControl?.setValue('');
        }
        campControl?.updateValueAndValidity();
    }

    mostrarFormulario(): void {
        this.formVisible = true;
        this.editando = false;
        this.codigoOriginalEdicion = null;
        this.jugadorForm.reset();
    }

    cancelar(): void {
        this.formVisible = false;
        this.jugadorForm.reset();
    }

    cargarJugador(jugador: Jugador): void {
        this.formVisible = true;
        this.editando = true;
        this.codigoOriginalEdicion = jugador.codigo;
        this.jugadorForm.patchValue(jugador);
    }

    guardar(): void {
        this.errorSubmit = '';
        if (this.jugadorForm.valid) {
            const datos: Jugador = this.jugadorForm.value;
            const exito = this.jugadorService.guardarJugador(
                datos,
                this.editando,
                this.codigoOriginalEdicion || undefined
            );

            if (exito) {
                this.formVisible = false;
                this.jugadorForm.reset();
            } else {
                this.errorSubmit = 'El código ya existe. Debe ser único.';
            }
        } else {
            this.jugadorForm.markAllAsTouched();
        }
    }

    eliminar(codigo: string): void {
        this.jugadorAEliminar = codigo;
        this.modalEliminarVisible = true;
    }

    confirmarEliminacion(): void {
        if (this.jugadorAEliminar) {
            this.jugadorService.eliminarJugador(this.jugadorAEliminar);
            this.cerrarModalEliminar();
        }
    }

    cerrarModalEliminar(): void {
        this.modalEliminarVisible = false;
        this.jugadorAEliminar = null;
    }
}
