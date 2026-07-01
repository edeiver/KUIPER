# Decisions

## Objetivo del documento

Registrar decisiones técnicas y de producto importantes para preservar contexto.

## Breve descripción

Cada decisión relevante deberá incluir fecha, contexto, alternativa evaluada, decisión tomada y consecuencias esperadas.

## Índice inicial

- Decisiones técnicas
- Decisiones de producto
- Alternativas evaluadas
- Riesgos aceptados
- Decisiones pendientes

## Decisiones técnicas

- Se inicializa un único proyecto Next.js sin monorepo para reducir complejidad durante Sprint 0.
- Se mantiene JavaScript como lenguaje del proyecto, alineado con el stack definido.
- Se fija `turbopack.root` en `next.config.mjs` para evitar que Next.js infiera una raíz superior cuando existen lockfiles fuera del proyecto.
- Se agregan placeholders `.gitkeep` en carpetas vacías para preservar la estructura arquitectónica en el primer commit.
- Sprint 1 cambia de autenticación/Supabase a interfaz del módulo Workout. Backend, autenticación y base de datos quedan pospuestos.

## Riesgos aceptados

- `npm audit` reporta una vulnerabilidad moderada transitiva en `postcss` dentro de `next@15.5.19`. No se aplica `npm audit fix --force` porque propone un cambio incompatible con el stack fijado y debe reevaluarse cuando exista una actualización compatible de Next.js 15.
