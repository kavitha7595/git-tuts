
function colorReducer(state="white" ,action) {
    switch(action.type) {
        case "red":
            return "rgb(250,50,50)";
            case "green":
                return "rgb(50,250,50)";
                case "blue" :
                    return "rgb(50,50,250)";
                    default:
                        return state;
    }
}
export default colorReducer;