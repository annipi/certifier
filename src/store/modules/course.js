// Se tienen unas variable suqe componen toda la aplicación
const state = {}

//Son metodos asincronos -> se comunica con externos -> mediante accione sno deberia modificar el estado de la aplicación
const actions = {}

//Son metodos sincronos -> se ejecutan secuencialmente -> modifica el estado de la aplicación
const mutations = {}

//hace una transformación del estado de la aplicación, trae cosas más puntuales
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}