
/************************************************************************************************/
/*                                          Parcial                                            **/
/************************************************************************************************/

// definimos parcial como una estructura inmutable
type Parcial = {
  readonly materia: string,
  readonly cantidadDePreguntas: number
}

const Parcial = (_materia: string, _preguntas: number): Parcial => {
  return {
    materia: _materia,
    cantidadDePreguntas: _preguntas
  }
}

/************************************************************************************************/
/*                                  Criterios de estudio                                       **/
/************************************************************************************************/
type CriterioEstudio = (_parcial: Parcial) => boolean

const estudioso: CriterioEstudio = (parcial: Parcial) => true

const hijoDelRigor = (minimoPreguntas: number) => (parcial: Parcial) => 
  parcial.cantidadDePreguntas > minimoPreguntas

const cabulero: CriterioEstudio = (parcial: Parcial) => parcial.materia.length % 2 == 0;

const cambiarCriterioEstudio = (criterioNuevo: CriterioEstudio, alumno: Alumno): Alumno => {
  return {
    ...alumno,
    criterioEstudio: criterioNuevo,
  }
}


/************************************************************************************************/
/*                                            Alumno                                           **/
/************************************************************************************************/
type Fecha = [number, number, number] // Tuplas en Typescript

// definimos Alumno como una estructura inmutable
// 
type Alumno = {
  readonly nombre: string,
  readonly fechaNacimiento: Fecha,
  readonly legajo: number,
  readonly materiasQueCursa: string[],
  readonly criterioEstudio: CriterioEstudio
}

const Alumno = (_nombre: string, _fechaNacimiento: Fecha, _legajo: number, _materiasQueCursa: string[], _criterio: CriterioEstudio): Alumno => {
  return {
    nombre: _nombre,
    fechaNacimiento: _fechaNacimiento,
    legajo: _legajo,
    materiasQueCursa: _materiasQueCursa,
    criterioEstudio: _criterio
  }
}

/************************************************************************************************/
/*                                    Casos de uso                                             **/
/************************************************************************************************/

const estudia = (parcial: Parcial, alumno: Alumno): boolean => alumno.criterioEstudio(parcial)

export { Parcial, Alumno, estudioso, hijoDelRigor, cabulero, cambiarCriterioEstudio, estudia }