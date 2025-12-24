export interface Jugador {
    codigo: string; // Alfanum, Mayus, Sin espacios, Max 10. Unique.
    nombres: string; // Max 100
    camiseta?: string; // Max 2
    equipo: string; // Dropdown
    campeonatos?: string; // Visible if Team start with 'a' or 'b'
}

// Helper for teams
export const EQUIPOS: string[] = [
    'Barcelona',
    'Real Madrid',
    'Atlético Nacional',
    'Boca Juniors',
    'América de Cali',
    'Chelsea',
    'Arsenal',
    'Bayern Múnich'
].sort(); // Sorted alphabetically ascending
