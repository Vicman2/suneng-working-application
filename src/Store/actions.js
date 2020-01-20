export const LOGMEIN = "LOGMEIN"
export const GET_PRODUCTS = "GET_PRODUCTS"
export const SET_PRE_ORDERED = "SET_PRE_ORDERED"
export const SET_ORDERED_PRODUCT = 'SET_ORDERED_PRODUCT'
export const CANCEL_PRE_ORDERD = 'CANCEL_PRE_ORDERED'
export const NAVIGATE = 'NAVIGATE'

export const navigatge = (page)=>{
    return {type:NAVIGATE, page: page}
}
export const login = (payload)=>{
    return {type: LOGMEIN, payload:payload}
}

export const companyProduct = (payload)=> {
    return {type: GET_PRODUCTS, payload}
}

export const setOrderedPrroduct = (payload)=> {
    return {type: SET_ORDERED_PRODUCT, payload}
}
export const setPreOrdered = (payload)=> {
    return {type: SET_PRE_ORDERED, payload}
}
export const cancelPreOrder = ()=> {
    return {type: CANCEL_PRE_ORDERD}
}