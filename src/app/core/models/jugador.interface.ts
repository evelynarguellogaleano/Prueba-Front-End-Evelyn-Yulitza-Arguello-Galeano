export interface Jugador {
    codigo: string;
    nombres: string;
    camiseta?: string;
    equipo: string;
    campeonatos?: string;
}

export const EQUIPOS: string[] = [
    'Barcelona',
    'Real Madrid',
    'Atlético Nacional',
    'Boca Juniors',
    'América de Cali',
    'Chelsea',
    'Arsenal',
    'Bayern Múnich',
    'Millonarios FC',
    'Deportivo Cali',
    'Águilas Doradas'
].sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));
