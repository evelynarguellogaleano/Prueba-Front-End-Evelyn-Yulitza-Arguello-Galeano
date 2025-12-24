import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { JugadorService } from '../../core/services/jugador.service';
import { Jugador, EQUIPOS } from '../../core/models/jugador.interface';
import { Observable } from 'rxjs';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';

/**
 * Componente principal para la gestión CRUD de jugadores
 * Permite listar, agregar, editar y eliminar jugadores con validaciones específicas
 */
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

    /**
     * Inicializa el componente y suscribe a cambios en el campo 'equipo'
     * para manejar la visibilidad condicional del campo 'campeonatos'
     */
    ngOnInit(): void {
        this.jugadorForm.get('equipo')?.valueChanges.subscribe(equipo => {
            this.verificarCampeonatos(equipo);
        });
    }

    /**
     * Validador personalizado para el código del jugador
     * Requisitos:
     * - Alfanumérico
     * - Debe contener al menos una letra Y al menos un número
     * @param control Control del formulario
     */
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

    /**
     * Validador para asegurar que un campo contenga solo dígitos
     * @param control Control del formulario
     */
    private numericoValidator(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        if (!value) return null;

        const valid = /^[0-9]+$/.test(value);
        return valid ? null : { soloNumeros: true };
    }

    /**
     * Lógica para mostrar u ocultar el campo 'campeonatos'
     * Si el equipo seleccionado comienza con 'a' o 'b', el campo es obligatorio
     * si no, se oculta y se limpia
     * @param equipo Nombre del equipo seleccionado
     */
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

    /**
     * Muestra el formulario para crear un nuevo jugador
     * Reinicia el estado a "creación"
     */
    mostrarFormulario(): void {
        this.formVisible = true;
        this.editando = false;
        this.codigoOriginalEdicion = null;
        this.jugadorForm.reset();
    }

    /**
     * Oculta el formulario y limpia los campos
     */
    cancelar(): void {
        this.formVisible = false;
        this.jugadorForm.reset();
    }

    /**
     * Carga los datos de un jugador existente en el formulario para su edición
     * @param jugador Objeto Jugador a editar
     */
    cargarJugador(jugador: Jugador): void {
        this.formVisible = true;
        this.editando = true;
        this.codigoOriginalEdicion = jugador.codigo;
        this.jugadorForm.patchValue(jugador);
    }

    /**
     * Guarda el jugador si el formulario es válido
     * Muestra error si en el código ya existe el registro
     */
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

    /**
     * Abre el modal de confirmación para eliminar un jugador
     * @param codigo Código del jugador a eliminar
     */
    eliminar(codigo: string): void {
        this.jugadorAEliminar = codigo;
        this.modalEliminarVisible = true;
    }

    /**
     * Ejecuta la eliminación del jugador seleccionado tras confirmación
     */
    confirmarEliminacion(): void {
        if (this.jugadorAEliminar) {
            this.jugadorService.eliminarJugador(this.jugadorAEliminar);
            this.cerrarModalEliminar();
        }
    }

    /**
     * Cierra el modal de confirmación y limpia el estado de eliminación
     */
    cerrarModalEliminar(): void {
        this.modalEliminarVisible = false;
        this.jugadorAEliminar = null;
    }
}
