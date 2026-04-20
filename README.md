# Ejercicio de alumnos

[![CI](https://github.com/uqbar-project/eg-alumnos-.ts/actions/workflows/test.yml/badge.svg)](https://github.com/uqbar-project/eg-alumnos-.ts/actions/workflows/test.yml)

Implementación en TypeScript del ejercicio de **Alumnos** del módulo 3 de *Paradigmas de Programación* (modelado funcional de datos). El objetivo es mostrar cómo se traducen los conceptos del paradigma funcional al ecosistema de TS: tipos, funciones de orden superior, **polimorfismo** e inmutabilidad.

> Enunciado original: ver el [documento del módulo 3](https://docs.google.com/document/d/11C2UAbP70dP7sTID-ZxJm_a-5ypKxQUEuZr6GVk5yFI/edit?tab=t.0).

## El dominio

Modelamos alumnos que cursan materias y rinden parciales. Cada alumno tiene un **criterio de estudio**, que es una función `Parcial → Boolean` que decide si el alumno estudia para ese parcial. Hay varios criterios:

- `estudioso`: siempre estudia.
- `cabulero`: estudia solo si el nombre de la materia tiene una cantidad par de caracteres.
- `hijoDelRigor(n)`: estudia solo si el parcial tiene más de `n` preguntas.

Los alumnos pueden cambiar su criterio a lo largo del tiempo, sin mutación: generando un nuevo alumno vía spread.

## Conceptos funcionales 

| Concepto | Dónde se ve |
|---|---|
| Funciones como ciudadanos de primera clase | `type CriterioEstudio = (parcial: Parcial) => boolean` y `criterioEstudio` como *campo* de `Alumno`. |
| **Polimorfismo** por firma común | `estudioso`, `cabulero` y `hijoDelRigor(n)` son intercambiables porque comparten el tipo `CriterioEstudio`. |
| Clausuras / factory de funciones | `hijoDelRigor(n)` captura `n` y devuelve una nueva función. |
| Inmutabilidad | `Readonly<Parcial>`, `Readonly<Alumno>` y `cambiarCriterioEstudio` que devuelve un alumno nuevo con spread. |

### Paralelismo con Haskell

| Concepto | Haskell | TypeScript |
|---|---|---|
| Alias de tipo de función | `type CriterioEstudio = Parcial -> Bool` | `type CriterioEstudio = (parcial: Parcial) => boolean` |
| Factory con clausura | `hijoDelRigor n = \p -> cantidadDePreguntas p > n` | `const hijoDelRigor = (preguntas: number): CriterioEstudio => (_parcial) => _parcial.cantidadDePreguntas > preguntas` |
| Record inmutable | `data Alumno = Alumno { ... }` (inmutable por default) | `type Alumno = Readonly<{ ... }>` |
| Actualización inmutable | `alumno { criterioEstudio = nuevo }` | `{ ...alumno, criterioEstudio: nuevo }` |

## Convención: parámetros con `_`

En el código vas a ver parámetros con prefijo guion bajo (`_materia`, `_parcial`, `_nombre`). Es una convención heredada del paradigma funcional para distinguir el **parámetro formal de la función** del **campo del objeto de dominio** con el mismo nombre:

```ts
const Parcial = (_materia: string, _preguntas: number): Parcial => ({
  materia: _materia,            // campo del dominio
  cantidadDePreguntas: _preguntas
})
```

Caso particular: `estudioso` recibe `_parcial` aunque no lo use.

```ts
const estudioso: CriterioEstudio = (_parcial) => true
```

¿Por qué mantener el parámetro? Porque si lo sacamos, la función deja de cumplir la firma `CriterioEstudio = (parcial: Parcial) => boolean` y perdemos **polimorfismo**: ya no se puede pasar `estudioso` donde se espera un `CriterioEstudio`. El parámetro formal es parte del contrato, aunque la implementación concreta lo ignore.

## Inmutabilidad (superficial vs. profunda)

Los tipos usan `Readonly<T>` para que TypeScript bloquee reasignar los campos:

```ts
const p: Parcial = Parcial("Pdep", 5)
p.materia = "Otra"  // error de compilación
```

Pero `Readonly<T>` es **superficial**: no impide mutar estructuras anidadas. Para arrays marcamos `readonly string[]` explícitamente (como en `materiasQueCursa`). Para inmutabilidad profunda arbitraria haría falta un `DeepReadonly<T>` o una estructura persistente.

En funcional puro la inmutabilidad viene por construcción; en TS es una decisión del tipado que hay que sostener.

## Requisitos

- Node.js
- Yarn (v4)
- Plugin de Jest para VSCode (opcional, para correr los tests desde el editor)

## Instalación y uso

```sh
yarn install     # instala dependencias
yarn test        # corre los tests con Jest
yarn typecheck   # valida tipos sin emitir código (tsc --noEmit)
```

`yarn typecheck` es útil porque muestra que **TypeScript valida sin ejecutar**: los errores de tipo se detectan antes de correr un solo test.
