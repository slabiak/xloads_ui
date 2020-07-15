const initialState = {
    routeType : 'foot'
}

const reducer = (state = initialState, action) => {
    if(action.type==='CHANGE_ROUTE_TYPE'){
        return {
            routeType : action.routeType
        };
    }
    return state;
}

export default reducer;