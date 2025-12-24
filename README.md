# Prueba Front End - Evelyn Yulitza Arguello Galeano

Este proyecto es una aplicación Angular que incluye gestión de jugadores de fútbol y ejercicios de lógica.
## Características

### 1. Gestión de Jugadores (`/jugadores`)
Módulo CRUD para administrar una lista de jugadores con las siguientes funcionalidades:
- **Almacenamiento Local**: Los datos se duran en el navegador usando `localStorage`.
- **Validaciones**:
  - Código único, alfanumérico y en mayúsculas.
  - Campos obligatorios y longitudes máximas.
- **Lógica Condicional**: El campo "Campeonatos" es obligatorio y visible solo si el equipo seleccionado comienza con la letra 'A' o 'B'.

### 2. Ejercicios de Lógica (`/ejercicios`)
Panel con tres herramientas interactivas:
- **Pares e Impares**: Clasificación de números ingresados (máximo 4 dígitos).
- **Anagramas**: Verificación de si dos palabras contienen exactamente las mismas letras.
- **La Moneda Pesada**: Algoritmo para encontrar una moneda más pesada en un grupo de 9 usando teóricamente solo dos pesadas.
## Instalación y Ejecución

Para ejecutar este proyecto localmente:

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Iniciar el servidor de desarrollo**:
   ```bash
   ng serve
   ```

3. **Abrir la aplicación**:
   Navegar a `http://localhost:4200/`.

## Estructura del Proyecto

- `src/app/features/jugadores`: Componentes y lógica para la gestión de jugadores.
- `src/app/features/ejercicios`: Componentes para los ejercicios de lógica.
- `src/app/core/services`: Servicios compartidos (ej. `JugadorService` para manejo de datos).
- `src/app/core/models`: Interfaces de TypeScript (ej. `Jugador`).

## Tecnologías

- **Angular 19**
- **TypeScript**
- **CSS3** 
- **localStorage** 
