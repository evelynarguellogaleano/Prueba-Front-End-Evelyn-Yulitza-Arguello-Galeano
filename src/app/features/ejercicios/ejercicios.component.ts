import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    palabra1: string = '';
    palabra2: string = '';
    resultadoAnagrama: string = '';
    monedas: number[] = [1, 1, 1, 1, 1, 1, 1, 1, 2];
    resultadoBalanza: string = '';

    agregarNumero(): void {
        if (!this.inputNumero) return;
        if (this.inputNumero.length > 4) {
            alert('Max 4 digits allowed.');
            return;
        }
        const val = parseInt(this.inputNumero, 10);
        if (isNaN(val)) return;

        this.numerosClasificados.push({
            valor: this.inputNumero,
            tipo: val % 2 === 0 ? 'Par' : 'Impar'
        });
        this.inputNumero = '';
    }

    verificarAnagrama(): void {
        const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '').split('').sort().join('');
        const s1 = normalize(this.palabra1);
        const s2 = normalize(this.palabra2);

        if (s1 === s2 && this.palabra1 && this.palabra2) {
            this.resultadoAnagrama = 'Son Anagramas';
        } else {
            this.resultadoAnagrama = 'No son Anagramas';
        }
    }

    resolverBalanza(): void {
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
