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
    // --- Par/Impar ---
    inputNumero: string = '';
    numerosClasificados: { valor: string, tipo: 'Par' | 'Impar' }[] = [];

    // --- Anagrama ---
    palabra1: string = '';
    palabra2: string = '';
    resultadoAnagrama: string = '';

    // --- Balanza ---
    // Array de monedas (pesos)
    // Logic: 9 coins. 1 heavy. 2 weighings.
    // User input simulation? Or hardcoded logic? 
    // Requirement: "Se tiene el siguiente array [M1...M9]". Let's assume user inputs weights or we strictly simulate logic.
    // The user prompt implies: "cree un método que imprima ... lo que consideraría la moneda más pesada".
    // I will provide a UI to Set Weights for M1-M9 (defaulting to 1 and 2 for heavy) to demonstrate.
    monedas: number[] = [1, 1, 1, 1, 1, 1, 1, 1, 2]; // M1-M9. M9 heavy.
    resultadoBalanza: string = '';

    // 1. Logic for Par/Impar
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

    // 2. Logic for Anagrams
    verificarAnagrama(): void {
        const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '').split('').sort().join('');
        const s1 = normalize(this.palabra1);
        const s2 = normalize(this.palabra2);

        if (s1 === s2 && this.palabra1 && this.palabra2) {
            this.resultadoAnagrama = '✅ Son Anagramas';
        } else {
            this.resultadoAnagrama = '❌ No son Anagramas';
        }
    }

    // 3. Logic for Balance (2 Weighings)
    resolverBalanza(): void {
        // Clone array to be safe
        const M = [...this.monedas];
        // Groups: A=[0,1,2], B=[3,4,5], C=[6,7,8]

        const pesoA = M[0] + M[1] + M[2];
        const pesoB = M[3] + M[4] + M[5];

        // Weighing 1
        if (pesoA > pesoB) {
            // Heavy is in A (0,1,2)
            // Weighing 2: Compare 0 vs 1
            if (M[0] > M[1]) {
                this.resultadoBalanza = 'La moneda más pesada es M1 (Pos 0)';
            } else if (M[1] > M[0]) {
                this.resultadoBalanza = 'La moneda más pesada es M2 (Pos 1)';
            } else {
                this.resultadoBalanza = 'La moneda más pesada es M3 (Pos 2)';
            }
        } else if (pesoB > pesoA) {
            // Heavy is in B (3,4,5)
            // Weighing 2: Compare 3 vs 4
            if (M[3] > M[4]) {
                this.resultadoBalanza = 'La moneda más pesada es M4 (Pos 3)';
            } else if (M[4] > M[3]) {
                this.resultadoBalanza = 'La moneda más pesada es M5 (Pos 4)';
            } else {
                this.resultadoBalanza = 'La moneda más pesada es M6 (Pos 5)';
            }
        } else {
            // Heavy is in C (6,7,8)
            // Weighing 2: Compare 6 vs 7
            if (M[6] > M[7]) {
                this.resultadoBalanza = 'La moneda más pesada es M7 (Pos 6)';
            } else if (M[7] > M[6]) {
                this.resultadoBalanza = 'La moneda más pesada es M8 (Pos 7)';
            } else {
                this.resultadoBalanza = 'La moneda más pesada es M9 (Pos 8)';
            }
        }
    }
}
