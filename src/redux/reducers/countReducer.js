

function counterReducer(state=0, action){
    switch(action.type){
        case "inc" :
            return state+1;
            case "dec":
                return state-1;
                default:
                    return state;
    }
}
export default counterReducer;