# Kuiper

Kuiper es una plataforma de rendimiento personal impulsada por IA. Su objetivo es ayudar a las personas a mejorar de forma integral mediante entrenamiento, nutrición, recuperación, seguimiento de progreso e inteligencia artificial.

## Visión

Construir una plataforma SaaS personal-first que convierta datos, hábitos y contexto individual en recomendaciones accionables para mejorar rendimiento, salud y consistencia.

## Objetivos

- Preparar una base técnica profesional, limpia y mantenible.
- Separar responsabilidades desde el inicio sin introducir complejidad prematura.
- Documentar las decisiones iniciales del producto y de la arquitectura.
- Dejar el proyecto listo para incorporar módulos funcionales de forma progresiva.

## Stack tecnológico

- Next.js 15
- React 19
- JavaScript
- App Router
- Tailwind CSS
- ESLint
- Turbopack
- npm

## Cómo ejecutar el proyecto

Instalar dependencias:

```bash
npm install
```

Ejecutar en desarrollo:

```bash
npm run dev
```

Construir para producción:

```bash
npm run build
```

Ejecutar lint:

```bash
npm run lint
```

## Estructura de carpetas

```text
app/
components/
  common/
  dashboard/
  workouts/
  nutrition/
  progress/
  ui/
hooks/
lib/
services/
stores/
utils/
styles/
docs/
public/
```

## Convenciones

- Mantener componentes pequeños y con responsabilidad única.
- Evitar lógica de negocio dentro de componentes visuales.
- Usar nombres descriptivos y consistentes.
- No agregar dependencias sin una necesidad clara del sprint.
- Documentar decisiones relevantes en `docs/DECISIONS.md`.
- Mantener JavaScript como lenguaje del proyecto hasta que se decida lo contrario.

## Roadmap inicial

- Sprint 0: Fundamentos técnicos, estructura y documentación.
- Sprint 1: Interfaz del módulo de entrenamiento.
- Sprint 2: Evolución del módulo de entrenamiento.
- Sprint 3: Módulo de nutrición.
- Sprint 4: Módulo de progreso.
- Sprint 5: ChatGPT Sync.

## Git

Primer commit sugerido:

```bash
git add .
git commit -m "chore: initialize Kuiper project"
```
