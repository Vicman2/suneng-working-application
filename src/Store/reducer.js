import * as actionType from './actions'

const initialStore = {
    isLoggedIn: false, 
    userData: {},
    products: null, 
    preOrdered: false,
    orderedProduct:{},
    finishedOrder: false
}


const reducer = (state = initialStore, action) => {
    switch(action.type){
        case actionType.LOGMEIN:
            return{
                ...state,
                isLoggedIn : true, 
                userData: action.payload
            }
        case actionType.GET_PRODUCTS:
            return {
                ...state, 
                products: action.payload
            }
        case actionType.SET_ORDERED_PRODUCT:
            return{
                ...state,
                orderedProduct: action.payload
            }
        case actionType.SET_PRE_ORDERED:
            return{
                ...state, 
                preOrdered : true,
                orderedProduct: action.payload
            }
        case actionType.CANCEL_PRE_ORDERD:
            return{
                ...state,
                preOrdered:false,
                orderedProduct:{}
            }
        case actionType.CONTINUE_PRE_ORDER:
            return{
                ...state,
                finishedOrder: true
            }
        case actionType.FINISHED_PRE_ORDER:
            return{
                ...state,
                preOrdered: false, 
                orderedProduct:{},
                finishedOrder:false
            }
        case actionType.LOGOUT:
            return{
                ...state, 
                userData:{}, 
                isLoggedIn: false
            }
    }
    return state;
}

export default reducer