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
            } else {
                const jugadoresIniciales: Jugador[] = [
                    {
                        codigo: 'JUG001',
                        nombres: 'Juan Pérez García',
                        camiseta: '10',
                        equipo: 'Atlético Nacional',
                        campeonatos: '5'
                    },
                    {
                        codigo: 'JUG002',
                        nombres: 'María González López',
                        camiseta: '7',
                        equipo: 'América de Cali',
                        campeonatos: '3'
                    },
                    {
                        codigo: 'JUG003',
                        nombres: 'Carlos Rodríguez Martínez',
                        camiseta: '9',
                        equipo: 'Deportivo Cali',
                        campeonatos: ''
                    },
                    {
                        codigo: 'JUG004',
                        nombres: 'Ana Martínez Sánchez',
                        camiseta: '11',
                        equipo: 'Millonarios FC',
                        campeonatos: ''
                    },
                    {
                        codigo: 'JUG005',
                        nombres: 'Luis Fernando Díaz',
                        camiseta: '23',
                        equipo: 'Águilas Doradas',
                        campeonatos: '2'
                    }
                ];
                this.guardarEnStorage(jugadoresIniciales);
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

    guardarJugador(jugador: Jugador, esEdicion: boolean, codigoOriginal?: string): boolean {
        const current = this.jugadoresSubject.getValue();

        if (esEdicion && codigoOriginal) {
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
