export const SET_TRUE =  true

export const setTrue = value => dispatch => {
    dispatch({
        type: SET_TRUE,
        payload: value
})
}
