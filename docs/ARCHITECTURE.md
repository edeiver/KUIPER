# Architecture

## Objetivo del documento

Definir la arquitectura base de Kuiper y las reglas para mantener el proyecto escalable.

## Breve descripción

Kuiper inicia como un único proyecto Next.js con App Router. La arquitectura separa presentación, utilidades, servicios, estado y documentación sin crear un monorepo ni capas innecesarias.

## Índice inicial

- Principios arquitectónicos
- Estructura de carpetas
- Responsabilidades por carpeta
- Convenciones de componentes
- Manejo de estado
- Integraciones futuras
- Decisiones pendientes
