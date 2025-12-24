import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * Componente que gestiona tres ejercicios de lógica:
 * 1. Clasificación de Números Pares e Impares
 * 2. Validador de Anagramas
 * 3. Resolución del problema de la moneda pesada
 */
@Component({
    selector: 'app-ejercicios',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './ejercicios.component.html',
    styleUrls: ['./ejercicios.component.css']
})
export class EjerciciosComponent {
    inputNumero: string = '';
    numerosClasificados: { valor: string, tipo: 'Par' | 'Impar' }[] = [];
    errorNumero: string = '';

    palabra1: string = '';
    palabra2: string = '';
    resultadoAnagrama: string = '';
    errorAnagrama: string = '';

    monedas: number[] = [1, 1, 1, 1, 1, 1, 1, 1, 2];
    resultadoBalanza: string = '';
    errorBalanza: string = '';

    /**
     * Valida el input numérico en tiempo real
     * Verifica que no se escriban más de 4 caracteres y que no sean negativos
     * Actualiza el mensaje de error `errorNumero` si la validación falla
     * @param valor El valor actual del input
     */
    onNumeroChange(valor: string): void {
        this.errorNumero = '';
        let strVal = String(valor);

        this.inputNumero = strVal;

        if (strVal.length > 4) {
            this.errorNumero = 'Máximo 4 dígitos permitidos';
        }

        if (strVal && Number(strVal) < 0) {
            this.errorNumero = 'No se permiten números negativos';
        }
    }

    /**
     * Valida que los inputs de anagramas no contengan números
     * Actualiza `errorAnagrama` si se detectan dígitos
     */
    validarAnagramaTiempoReal(): void {
        this.errorAnagrama = '';
        const tieneNumeros = /\d/.test(this.palabra1) || /\d/.test(this.palabra2);

        if (tieneNumeros) {
            this.errorAnagrama = 'No se permiten números, solo letras';
        }
    }

    /**
     * Valida que los pesos de las monedas no sean negativos
     */
    validarBalanzaTiempoReal(): void {
        this.errorBalanza = '';
        // Validar si hay negativos
        for (let m of this.monedas) {
            if (m < 0) {
                this.errorBalanza = 'No se permiten pesos negativos';
                break;
            }
        }
    }

    /**
     * Procesa la adición de un número a la lista de clasificados (Par o Impar)
     * Realiza validaciones finales (vacío, no numérico, longitud, negativo) antes de agregar
     */
    agregarNumero(): void {
        this.errorNumero = '';
        const inputStr = String(this.inputNumero);

        if (!inputStr || inputStr.trim() === '') {
            this.errorNumero = 'Debe ingresar un número';
            return;
        }

        const val = Number(inputStr);

        if (isNaN(val)) {
            this.errorNumero = 'Debe ingresar solo números';
            return;
        }

        if (inputStr.length > 4) {
            this.errorNumero = 'Máximo 4 dígitos permitidos';
            return;
        }

        if (val < 0) {
            this.errorNumero = 'No se permiten números negativos';
            return;
        }

        this.numerosClasificados.push({
            valor: inputStr,
            tipo: val % 2 === 0 ? 'Par' : 'Impar'
        });
        this.inputNumero = '';
    }

    /**
     * Verifica si las dos palabras ingresadas (`palabra1` y `palabra2`) son anagramas
     * Normaliza los textos (minúsculas, sin caracteres especiales ni números) y compara sus letras ordenadas
     */
    verificarAnagrama(): void {
        this.errorAnagrama = '';
        this.resultadoAnagrama = '';

        if (!this.palabra1 || this.palabra1.trim() === '') {
            this.errorAnagrama = 'Debe ingresar la primera palabra';
            return;
        }

        if (!this.palabra2 || this.palabra2.trim() === '') {
            this.errorAnagrama = 'Debe ingresar la segunda palabra';
            return;
        }

        const tieneNumeros = /\d/.test(this.palabra1) || /\d/.test(this.palabra2);
        if (tieneNumeros) {
            this.errorAnagrama = 'No se permiten números, solo letras';
            return;
        }

        if (this.palabra1.trim().length < 2 || this.palabra2.trim().length < 2) {
            this.errorAnagrama = 'Las palabras deben tener al menos 2 caracteres';
            return;
        }

        const normalize = (s: string) => s.toLowerCase().replace(/[^a-z]/g, '').split('').sort().join('');
        const s1 = normalize(this.palabra1);
        const s2 = normalize(this.palabra2);

        if (s1 === s2 && this.palabra1 && this.palabra2) {
            this.resultadoAnagrama = 'Son Anagramas';
        } else {
            this.resultadoAnagrama = 'No son Anagramas';
        }
    }

    /**
     * Algoritmo para encontrar la moneda más pesada entre 9 opciones utilizando 2 pesadas simuladas
     * Divide las monedas en grupos de 3 (A, B, C) y compara sus pesos totales para descartar grupos
     * Asume que hay exactamente una moneda más pesada
     */
    resolverBalanza(): void {
        this.errorBalanza = '';
        this.resultadoBalanza = '';

        for (let i = 0; i < this.monedas.length; i++) {
            if (this.monedas[i] === null || this.monedas[i] === undefined || isNaN(this.monedas[i])) {
                this.errorBalanza = `Debe definir el peso de la moneda M${i + 1}`;
                return;
            }
        }

        for (let i = 0; i < this.monedas.length; i++) {
            if (this.monedas[i] <= 0) {
                this.errorBalanza = 'Todos los pesos deben ser números positivos';
                return;
            }
        }

        const pesosPesados = this.monedas.filter((m, i, arr) => m > Math.min(...arr));
        if (pesosPesados.length === 0 || this.monedas.every(m => m === this.monedas[0])) {
            this.errorBalanza = 'Debe haber al menos una moneda más pesada que las demás';
            return;
        }

        const M = [...this.monedas];
        const pesoA = M[0] + M[1] + M[2];
        const pesoB = M[3] + M[4] + M[5];

        if (pesoA > pesoB) {
            if (M[0] > M[1]) {
                this.resultadoBalanza = 'La moneda más pesada es M1';
            } else if (M[1] > M[0]) {
                this.resultadoBalanza = 'La moneda más pesada es M2';
            } else {
                this.resultadoBalanza = 'La moneda más pesada es M3';
            }
        } else if (pesoB > pesoA) {
            if (M[3] > M[4]) {
                this.resultadoBalanza = 'La moneda más pesada es M4';
            } else if (M[4] > M[3]) {
                this.resultadoBalanza = 'La moneda más pesada es M5';
            } else {
                this.resultadoBalanza = 'La moneda más pesada es M6';
            }
        } else {
            if (M[6] > M[7]) {
                this.resultadoBalanza = 'La moneda más pesada es M7';
            } else if (M[7] > M[6]) {
                this.resultadoBalanza = 'La moneda más pesada es M8';
            } else {
                this.resultadoBalanza = 'La moneda más pesada es M9';
            }
        }
    }
}
