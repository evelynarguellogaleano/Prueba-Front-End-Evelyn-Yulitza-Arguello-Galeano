import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Jugador } from '../models/jugador.interface';

@Injectable({
    providedIn: 'root'
})
export class JugadorService {
    private readonly STORAGE_KEY = 'jugadores_data';
    private jugadoresSubject = new BehaviorSubject<Jugador[]>([]);

    jugadores$ = this.jugadoresSubject.asObservable();

    constructor() {
        this.cargarDeStorage();
    }

    private cargarDeStorage(): void {
        if (typeof localStorage !== 'undefined') {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (stored) {
                this.jugadoresSubject.next(JSON.parse(stored));
            }
        }
    }

    private guardarEnStorage(jugadores: Jugador[]): void {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(jugadores));
        }
        this.jugadoresSubject.next(jugadores);
    }

    getJugadores(): Observable<Jugador[]> {
        return this.jugadores$;
    }

    // Returns true if success, false if code exists (and not updating same record)
    guardarJugador(jugador: Jugador, esEdicion: boolean, codigoOriginal?: string): boolean {
        const current = this.jugadoresSubject.getValue();

        if (esEdicion && codigoOriginal) {
            // Update
            // Check if new code exists in OTHER records
            if (jugador.codigo !== codigoOriginal && current.some(j => j.codigo === jugador.codigo)) {
                return false;
            }
            const index = current.findIndex(j => j.codigo === codigoOriginal);
            if (index !== -1) {
                const updated = [...current];
                updated[index] = jugador;
                this.guardarEnStorage(updated);
                return true;
            }
        } else {
            // Create
            if (current.some(j => j.codigo === jugador.codigo)) {
                return false;
            }
            this.guardarEnStorage([...current, jugador]);
            return true;
        }
        return false;
    }

    eliminarJugador(codigo: string): void {
        const current = this.jugadoresSubject.getValue();
        this.guardarEnStorage(current.filter(j => j.codigo !== codigo));
    }
}
