import {CODECONENET_DATA} from '../action';

const CodeContentData = (state=[],action) => { 
    switch (action.type) { 
        case CODECONENET_DATA:
            return {
                ...state,
                codeContentData: action.codeContentData,
            }
        default:
            return state
    }
};
export default CodeContentData;
