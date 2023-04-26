import {Alumno, Parcial, cabulero, cambiarCriterioEstudio, estudia, estudioso, hijoDelRigor}  from './app'

const parcialPdep = Parcial("Paradigmas de programacion", 5)
const parcialOerativos = Parcial("Sistemas operativos", 2)
const nico = Alumno("Nico",[10, 3, 1993],124124,["sysop", "proyecto"],estudioso)

describe('Criterios de estudio', () => {
  test('Estudioso siempre estudia', () => {
    expect(estudioso(parcialPdep)).toBeTruthy()
  })

  test('Cabulero estudia si el nombre de la materia cumple con su condición', () => {
    expect(cabulero(parcialPdep)).toBeTruthy()
  })

  test('Cabulero no estudia si el nombre de la materia no cumple con su condición', () => {
    expect(cabulero(parcialOerativos)).toBeFalsy()
  })

  test('Hijo del rigor estudia si cumple la condición el parcial', () => {
    expect(hijoDelRigor(4)(parcialPdep)).toBeTruthy()
  })

  test('Hijo del rigor no estudia si no cumple la condición el parcial', () => {
    expect(hijoDelRigor(4)(parcialOerativos)).toBeFalsy()
  })
})

describe('Alumnos', () => {

  test('Alumno cambia criterio de estudio', () => {
    expect(nico.criterioEstudio(parcialOerativos)).toBeTruthy()
    const nuevoNico = cambiarCriterioEstudio (hijoDelRigor(4), nico)
    expect(nuevoNico.criterioEstudio(parcialOerativos)).toBeFalsy()
  })

  test('Saber si un alumno estudia para un parcial', () => {
    const nuevoNico = cambiarCriterioEstudio (hijoDelRigor(4), nico)
    expect(estudia(parcialOerativos, nuevoNico)).toBeFalsy()
  })

})