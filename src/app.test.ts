import {Alumno, Parcial, cabulero, cambiarCriterioEstudio, estudia, estudioso, hijoDelRigor}  from './app'

const alumno = Alumno("Nico",[10, 3, 1993],124124,["sysop", "proyecto"],estudioso)

describe('Criterios de estudio', () => {
  test('Estudioso siempre estudia', () => {
    const parcialPdep = Parcial("Paradigmas de programacion", 5)
    expect(estudioso(parcialPdep)).toBeTruthy()
  })

  test('Estudioso estudia aunque el parcial tenga 0 preguntas', () => {
    const parcialSinPreguntas = Parcial("Matemática", 0)
    expect(estudioso(parcialSinPreguntas)).toBeTruthy()
  })

  test('Cabulero estudia si el nombre de la materia cumple con su condición', () => {
    const parcialConMateriaImpar = Parcial("Paradigmas de programacion", 5)
    expect(cabulero(parcialConMateriaImpar)).toBeTruthy()
  })

  test('Cabulero no estudia si el nombre de la materia no cumple con su condición', () => {
    const parcialConMateriaPar = Parcial("Sistemas operativos", 2)
    expect(cabulero(parcialConMateriaPar)).toBeFalsy()
  })

  test('Cabulero con materia de un solo carácter no estudia', () => {
    const parcialConMateriaDeUnCaracter = Parcial("X", 3)
    expect(cabulero(parcialConMateriaDeUnCaracter)).toBeFalsy()
  })

  test('Hijo del rigor estudia si cumple la condición el parcial', () => {
    const parcialConMuchasPreguntas = Parcial("Paradigmas de programacion", 5)
    expect(hijoDelRigor(4)(parcialConMuchasPreguntas)).toBeTruthy()
  })

  test('Hijo del rigor no estudia si no cumple la condición el parcial', () => {
    const parcialConPocasPreguntas = Parcial("Paradigmas de programacion", 4)
    expect(hijoDelRigor(4)(parcialConPocasPreguntas)).toBeFalsy()
  })

  test('Hijo del rigor no estudia cuando las preguntas igualan exactamente el umbral', () => {
    const parcialEnElUmbral = Parcial("Paradigmas de programacion", 5)
    expect(hijoDelRigor(5)(parcialEnElUmbral)).toBeFalsy()
  })
})

describe('Alumnos', () => {

  test('Alumno cambia criterio de estudio', () => {
    const parcial = Parcial("Sistemas operativos", 2)
    expect(alumno.criterioEstudio(parcial)).toBeTruthy()
    const nuevoAlumno = cambiarCriterioEstudio (hijoDelRigor(4), alumno)
    expect(nuevoAlumno.criterioEstudio(parcial)).toBeFalsy()
  })

  test('Cambiar criterio devuelve un alumno nuevo sin mutar el original', () => {
    const nuevoAlumno = cambiarCriterioEstudio(hijoDelRigor(4), alumno)
    expect(nuevoAlumno).not.toBe(alumno)
    expect(alumno.criterioEstudio).toBe(estudioso)
  })

  test('Saber si un alumno estudia para un parcial', () => {
    const parcial = Parcial("Sistemas operativos", 2)
    const nuevoAlumno = cambiarCriterioEstudio (hijoDelRigor(4), alumno)
    expect(estudia(parcial, nuevoAlumno)).toBeFalsy()
  })

})
