import * as constants from '@/store/constants'
import CourseContract from '@/contracts/Certifier.json'

// Se tienen unas variable suqe componen toda la aplicación
const state = {
    //leyes de morgan x = null, !x -> false, !!x -> true
    provider: !!(window.web3 && window.web3.currentProvider),
    isOwner: false,
    contract: null, // Guarda la instancia del contrato
    coinbase: null  // direccion con la que estamos conectados en Metamask
}

//Son metodos asincronos -> se comunica con externos -> mediante accione sno deberia modificar el estado de la aplicación
const actions = {
    //[constans.COURSE_INIT] lo interpola a course/INIT
    [constants.COURSE_INIT]: ({commit}) => {
        const abi = CourseContract.abi
        const contracAddress = '0x0417288a15ef184afa05bcdecd122b71ff5e8f31' //direccion donde el contrato fue desplegado en ganache-cli (manual)
        const contract = web3.eth.contract(abi).at(contracAddress) //contrato con contenido abi, en la direccion contract address
        commit(constants.COURSE_SET_CONTRACT, contract) //dicta cual mutación debe usar
        //Coinbase da la direccion del cliente(Nosotros) en Metamask
        web3.eth.getCoinbase((error, coinbase) => {
            if(error) console.error(error)
            commit(constants.COURSE_SET_COINBASE, coinbase) //manda la app al estado coinbase
            //Objeto transaccional coinbase que en este momento en result
            //contractFunction(Transactional Object -> ({from: coinbase})) -> direccion del owner (quien desplego el contrato)
            //callback -> (error, isOwner)
            contract.isOwner({from: coinbase}, (error, isOwner) => {
                if(error) console.error(error)
                commit(constants.COURSE_SET_IS_OWNER, isOwner)
            })
        })
    },
    [constants.COURSE_ADD_COURSE]: ({state}, data) => {
        const {
            courseCode,
            courseName,
            courseCost,
            courseDuration,
            courseThreshold,
            course
        } = data
        state.contract.addCourse(
            courseCode,
            courseName,
            courseCost,
            courseDuration,
            courseThreshold,
            course,
            {from: state.coinbase},
            (error, result) => {
                if(error) console.error(error)
                    console.info(result)
            }
        )

    }

}

//Son metodos sincronos -> se ejecutan secuencialmente -> modifica el estado de la aplicación
const mutations = {
    [constants.COURSE_SET_CONTRACT]: (state, contract) => {
        state.contract = contract
    },
    [constants.COURSE_SET_COINBASE]: (state, coinbase) => {
        state.coinbase = coinbase
    },
    [constants.COURSE_SET_IS_OWNER]: (state, isOwner) => {
        state.isOwner = isOwner
    }
}

//hace una transformación del estado de la aplicación, trae cosas más puntuales
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}