type Fecha = readonly [number, number, number] // Tuplas en Typescript

type Parcial = Readonly<{
  materia: string,
  cantidadDePreguntas: number
}>

const Parcial = (_materia: string, _preguntas: number): Parcial => ({
  materia: _materia,
  cantidadDePreguntas: _preguntas
})

type CriterioEstudio = (parcial: Parcial) => boolean

type Alumno = Readonly<{
  nombre: string,
  fechaNacimiento: Fecha,
  legajo: number,
  materiasQueCursa: readonly string[],
  criterioEstudio: CriterioEstudio
}>

const Alumno = (_nombre: string, _fechaNacimiento: Fecha, _legajo: number, _materiasQueCursa: readonly string[], _criterio: CriterioEstudio): Alumno => ({
  nombre: _nombre,
  fechaNacimiento: _fechaNacimiento,
  legajo: _legajo,
  materiasQueCursa: _materiasQueCursa,
  criterioEstudio: _criterio
})

const estudioso: CriterioEstudio = (_parcial) => true

const hijoDelRigor = (preguntas: number): CriterioEstudio => (_parcial: Parcial) => _parcial.cantidadDePreguntas > preguntas

const cabulero: CriterioEstudio = (_parcial: Parcial) => _parcial.materia.length % 2 === 0

const cambiarCriterioEstudio = (nuevoCriterio: CriterioEstudio, alumno: Alumno): Alumno => ({ ...alumno, criterioEstudio: nuevoCriterio })

const estudia = (parcial: Parcial, alumno: Alumno): boolean => alumno.criterioEstudio(parcial)


export { Parcial, Alumno, estudioso, hijoDelRigor, cabulero, cambiarCriterioEstudio, estudia }
