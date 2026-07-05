# Hércules — Visión del Producto

*(Conocido en el código y el stack como "Kuiper"; "Hércules" es el nombre con el que el equipo se refiere al producto y su misión.)*

## 1. ¿Qué es Hércules?

Hércules es una plataforma de entrenamiento de fuerza impulsada por datos reales: construida a partir del uso diario real en el gimnasio, no diseñada en el vacío. Combina un catálogo de ejercicios con técnica real y específica, prescripción de entrenamiento basada en principios de hipertrofia y fatiga, y una arquitectura pensada desde el inicio para soportar coaching inteligente (IA), seguimiento de progreso y nutrición — no solo para registrar series y repeticiones.

## 2. ¿Qué problema resuelve?

Quien entrena en serio hoy tiene que elegir entre dos extremos: un registrador genérico de entrenamientos (sin ninguna inteligencia, sin técnica, sin criterio de orden o progresión) o una app sobrecargada de funciones que no conoce ni el gimnasio real del usuario ni su historial. Ninguno de los dos enseña, ninguno corrige, ninguno conecta lo que se entrenó ayer con lo que se debería entrenar hoy.

Hércules resuelve esto ofreciendo, desde la base de datos hacia arriba, un catálogo de ejercicios con calidad de entrenador personal (técnica, errores comunes, músculos a sentir, alternativas reales según el equipo disponible), un orden de ejercicios basado en lógica biomecánica real, y una arquitectura de datos que permite construir progreso y coaching con IA sobre el historial real del usuario, no sobre suposiciones genéricas.

## 3. ¿Qué NO es Hércules?

- No es un simple registrador de series y repeticiones.
- No es una red social de fitness ni depende de contenido de otros usuarios.
- No es una app de conteo de calorías aislada, sin conexión con el entrenamiento.
- No es un generador de rutinas genéricas que ignora el equipo real disponible.
- No es una demo o un MVP descartable — se construye para durar años y escalar a miles de usuarios.
- No es una app que le muestra al usuario datos, rachas o progreso inventado para "que se vea bien".

## 4. Misión

Ayudar a las personas a entrenar con más inteligencia, técnica y consistencia de la que lograrían por su cuenta, usando siempre datos reales de su propio entrenamiento para guiar cada decisión — nunca suposiciones ni contenido genérico.

## 5. Visión (3-5 años)

Hércules es la plataforma de referencia para entrenamiento de fuerza basado en datos reales: entrenamiento, progreso, nutrición y un AI Coach trabajan juntos sobre el historial real y verificado del usuario. La plataforma corre sobre un backend propio (Node.js + PostgreSQL + Prisma) capaz de sostener miles de usuarios, con un catálogo de ejercicios que creció de 12 a cientos de fichas de calidad profesional, y con un AI Coach que programa y ajusta entrenamientos con el mismo criterio biomecánico que un entrenador humano experto — sin nunca inventar datos que el usuario no generó.

## 6. Público objetivo

Personas que entrenan fuerza en serio y quieren progresión real, técnica correcta y decisiones basadas en su propio historial — no principiantes casuales buscando una app bonita sin sustancia. El primer caso de uso real es el propio programa de transformación del fundador (ver `docs/07_HERCULES.md`), usado como validación diaria antes de escalar a más usuarios.

## 7. Principios del producto (nunca se rompen)

- Resolver problemas reales de entrenamiento, no agregar funciones vanidosas.
- Enseñar, no solo registrar: cada pantalla debe dejar al usuario con más criterio técnico, no solo con más filas guardadas en una tabla. Hércules existe para formar al usuario, no para ser un cuaderno digital.
- UX premium y minimalista, con la mínima fricción posible durante una sesión de entrenamiento en vivo.
- Nunca mostrar datos inventados, progreso falso o métricas sin fuente real.
- La técnica y la seguridad del ejercicio están por encima de la gamificación.
- La experiencia durante el entrenamiento (no antes, no después) es la prioridad número uno de diseño.

## 8. Principios técnicos

- Reutilizar componentes y lógica existente antes de crear algo nuevo.
- Cero lógica duplicada entre módulos.
- Todo modelo de datos se diseña como entidades relacionales desde el día uno — IDs estables, foreign keys explícitas, tablas de unión para relaciones 1:N y N:N — pensando en PostgreSQL + Prisma, nunca en Firebase ni en estructuras tipo documento NoSQL.
- Sin dependencias ni librerías innecesarias.
- Consistencia visual y de código en todo el proyecto.
- Separación estricta entre catálogo (identidad del ejercicio) y prescripción (parámetros del plan del día) — decisión ya tomada, ver `docs/11_DECISIONS.md`.

## 9. Filosofía de desarrollo

- Explicar el impacto y proponer la solución antes de escribir código, siempre que el cambio sea significativo.
- Priorizar mantenibilidad y claridad sobre velocidad de entrega.
- Ningún cambio grande de arquitectura o producto se implementa sin aprobación explícita.
- Cuando existen varias formas válidas de resolver algo, se presentan ventajas y desventajas, se recomienda una opción, y se justifica desde la arquitectura — la decisión final es siempre del equipo, no una elección silenciosa.

## 10. Arquitectura objetivo

- **Frontend:** Next.js.
- **Backend:** Node.js (Express inicialmente, con posibilidad de migrar a NestJS cuando el proyecto lo requiera).
- **Base de datos:** PostgreSQL.
- **ORM:** Prisma.

Toda la estructura de datos actual (catálogo de ejercicios, planes, historial) se diseña para poder migrar directamente a este backend sin rediseñar el modelo — IDs estables, relaciones explícitas, sin estructuras de documento embebidas.

## 11. Tecnologías objetivo

- **Frontend:** Next.js, React, Tailwind CSS.
- **Backend:** Node.js (Express → NestJS).
- **Base de datos:** PostgreSQL.
- **ORM:** Prisma.
- **Futuras integraciones:** AI Coach sobre el historial real de entrenamiento, sincronización con ChatGPT, módulo de Nutrición conectado al gasto energético real del entrenamiento. Ninguna integración futura se compromete en este documento salvo las ya aprobadas en `docs/11_DECISIONS.md`.

## 12. Roadmap de alto nivel

Siguiendo `docs/10_ROADMAP.md`: Workout → Exercise Database (sprint actual) → Workout Engine → Progress → Nutrition → AI Coach. Cuando el volumen de datos y la necesidad de multiusuario superen lo que `localStorage` puede sostener, se activa la migración al backend propio (Node.js + PostgreSQL + Prisma) descrito en la sección 10 — sin rediseñar el modelo de datos, porque se diseñó pensando en esa migración desde el principio.

## 13. No negociables

- Nunca mostrar datos falsos.
- Nunca inventar progreso.
- Priorizar siempre la experiencia del entrenamiento.
- Mantener una arquitectura escalable.
- Documentar las decisiones importantes.
- Favorecer la reutilización del código.
- Pensar siempre a largo plazo.

## 14. Cómo se toman las decisiones

Toda funcionalidad o cambio de arquitectura nuevo se evalúa así, antes de escribir código:

1. ¿Qué impacto tiene en la escalabilidad de la arquitectura?
2. ¿Qué deuda técnica introduce o resuelve?
3. ¿Existe ya un componente, función o patrón que se pueda reutilizar?
4. ¿Se puede lograr sin duplicar lógica existente?
5. Si el cambio es importante: proponer la solución (archivos afectados, archivos nuevos, riesgos, impacto) y esperar aprobación explícita antes de implementar.
6. Si la decisión afecta al proyecto, actualizar `ROADMAP.md`, `DECISIONS.md`, `TODO.md` y/o `ARCHITECTURE.md` — solo los documentos necesarios, sin duplicar contenido.

## 15. Manifiesto

Hércules no se construye rápido, se construye para durar. Cada ejercicio del catálogo tiene técnica real, no relleno. Cada dato que ve el usuario es un dato que él mismo generó entrenando, nunca uno inventado para impresionar. Cada línea de código se escribe pensando en el usuario número mil, no solo en el primero. La velocidad nunca justifica la deuda técnica silenciosa, y ninguna funcionalidad nueva vale más que la experiencia de la persona que está entrenando ahora mismo, serie tras serie. Hércules se construye una decisión documentada a la vez.
