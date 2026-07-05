# Kuiper / Hércules — Documentación

Punto de entrada oficial de toda la documentación del proyecto.

## 1. ¿Qué es Hércules?

Hércules (nombre en el código: **Kuiper**) es una plataforma de entrenamiento de fuerza impulsada por datos reales: catálogo de ejercicios con técnica profesional, prescripción basada en principios de hipertrofia y fatiga, y una arquitectura pensada desde el día uno para escalar a un backend propio (Node.js + PostgreSQL + Prisma) y soportar progreso, nutrición y un AI Coach — nunca datos inventados. Ver `docs/VISION.md` para la visión completa.

## 2. Orden de lectura recomendado (para un developer o una IA nueva)

1. **`docs/VISION.md`** — qué es Hércules, qué problema resuelve, principios y arquitectura objetivo. Empezar siempre aquí.
2. **`docs/04_ARCHITECTURE.md`** — estructura de carpetas del repositorio.
3. **`docs/05_TECH_STACK.md`** — stack actual y objetivo a largo plazo.
4. **`docs/03_PRODUCT.md`** — módulos del producto.
5. **`docs/11_DECISIONS.md`** — decisiones de arquitectura y producto ya tomadas, con su razón.
6. **`docs/10_ROADMAP.md`** y **`docs/13_TODO.md`** — qué se está construyendo y qué sigue.
7. Documentos de módulo específico según lo que se vaya a tocar (`08_WORKOUT_ENGINE.md`, `09_NUTRITION_ENGINE.md`, `06_DESIGN_SYSTEM.md`).
8. `docs/07_HERCULES.md` y `docs/12_CHANGELOG.md` como contexto adicional, no bloqueante.

Los documentos marcados como **Referencia** (ver tabla) no requieren lectura — solo apuntan a `docs/VISION.md`.

## 3. Documentos

| Documento | Propósito | Fuente oficial (si aplica) | Estado |
|---|---|---|---|
| `VISION.md` | Visión de producto, misión, principios, filosofía, arquitectura y tecnologías objetivo, no-negociables | — (autoritativo) | Activo |
| `01_VISION.md` | (histórico) Visión de producto, versión corta | `VISION.md` | Referencia |
| `02_CONSTITUTION.md` | (histórico) Principios de producto, versión corta | `VISION.md` | Referencia |
| `03_PRODUCT.md` | Lista de módulos del producto (Workout, Progress, Nutrition, AI Coach, ChatGPT Sync) | — (autoritativo) | Activo |
| `04_ARCHITECTURE.md` | Estructura de carpetas del repositorio | — (autoritativo) | Activo |
| `05_TECH_STACK.md` | Stack actual (frontend) y stack objetivo a largo plazo (backend, DB, ORM) | — (autoritativo) | Activo |
| `06_DESIGN_SYSTEM.md` | Lineamientos de diseño visual | — (autoritativo) | Activo |
| `07_HERCULES.md` | Programa personal de transformación de 24 semanas que origina el nombre "Hércules" | — (autoritativo) | Activo |
| `08_WORKOUT_ENGINE.md` | Notas del motor de entrenamiento (workflow guiado por ejercicios, local storage) | — (autoritativo) | Activo |
| `09_NUTRITION_ENGINE.md` | Notas del futuro motor de nutrición (objetivos de proteína, comidas, lista de compras) | — (autoritativo) | Planificado |
| `10_ROADMAP.md` | Roadmap de sprints | — (autoritativo) | Activo |
| `11_DECISIONS.md` | Registro de decisiones de arquitectura y producto, con justificación | — (autoritativo) | Activo |
| `12_CHANGELOG.md` | Historial de cambios notables | — (autoritativo) | Activo |
| `13_TODO.md` | Lista de tareas/pendientes de alto nivel | — (autoritativo) | Activo |
| `14_PRODUCT_PHILOSOPHY.md` | (histórico) Filosofía de producto, versión corta | `VISION.md` | Referencia |

## 4. Documentos autoritativos vs. de referencia

**Autoritativos** (fuente de verdad, se actualizan cuando cambia una decisión real):
`VISION.md`, `03_PRODUCT.md`, `04_ARCHITECTURE.md`, `05_TECH_STACK.md`, `06_DESIGN_SYSTEM.md`, `07_HERCULES.md`, `08_WORKOUT_ENGINE.md`, `09_NUTRITION_ENGINE.md`, `10_ROADMAP.md`, `11_DECISIONS.md`, `12_CHANGELOG.md`, `13_TODO.md`.

**Solo referencia** (contenido histórico ya fusionado en `VISION.md`, no se editan, solo enlazan):
`01_VISION.md`, `02_CONSTITUTION.md`, `14_PRODUCT_PHILOSOPHY.md`.

## 5. Cómo navegar esta documentación

- Si tienes 5 minutos: lee solo `VISION.md`. Cubre qué es el producto, qué no es, principios, filosofía y arquitectura objetivo en un solo lugar.
- Si vas a tocar código: lee además `04_ARCHITECTURE.md` y `05_TECH_STACK.md` antes de escribir nada.
- Si vas a tomar una decisión de arquitectura o producto: revisa `11_DECISIONS.md` primero — puede que ya se haya decidido y justificado.
- Si necesitas saber qué se está construyendo ahora o después: `10_ROADMAP.md` y `13_TODO.md`.
- Los documentos marcados **Referencia** en la tabla no aportan información nueva — existen solo para no romper enlaces históricos. Ignóralos salvo que algo te dirija ahí explícitamente.
- Ningún documento debe duplicar contenido de otro. Si al editar encuentras que dos documentos dicen lo mismo, es una señal de que uno de los dos debería fusionarse o convertirse en referencia — no lo dejes así.
