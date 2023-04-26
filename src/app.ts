type Fecha = [number,number,number] // Tuplas en Typescript

type Parcial = {
  materia : string,
  cantidadDePreguntas :number
}

const Parcial = (_materia:string,_preguntas:number):Parcial => {
  return {
    materia: _materia,
    cantidadDePreguntas: _preguntas
  } as const
}

type CriterioEstudio = (_parcial :Parcial) => boolean

type Alumno = {
  nombre : string,
  fechaNacimiento :Fecha,
  legajo: number,
  materiasQueCursa : string[],
  criterioEstudio : CriterioEstudio
}

const Alumno = (_nombre: string,_fechaNacimiento: Fecha,_legajo :number,_materiasQueCursa:string[],_criterio:CriterioEstudio) : Alumno => 
{ return {
    nombre: _nombre,
    fechaNacimiento: _fechaNacimiento,
    legajo: _legajo,
    materiasQueCursa: _materiasQueCursa,
    criterioEstudio: _criterio
 }  as const }
 
const estudioso :CriterioEstudio = (_) => true

const hijoDelRigor = (preguntas: number) :CriterioEstudio => (_parcial:Parcial) => _parcial.cantidadDePreguntas > preguntas 

const cabulero :CriterioEstudio = (_parcial :Parcial) => _parcial.materia.length % 2 === 0

const cambiarCriterioEstudio  = (nuevoCriterio: CriterioEstudio,  alumno: Alumno) :Alumno => {return {...alumno, criterioEstudio: nuevoCriterio } as const}

const estudia = (parcial:Parcial, alumno:Alumno): boolean => alumno.criterioEstudio(parcial)


export {Parcial, Alumno,estudioso,hijoDelRigor,cabulero,cambiarCriterioEstudio, estudia}