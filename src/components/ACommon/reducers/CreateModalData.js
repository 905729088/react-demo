import { CREATEMODAL_FILE_DATA } from '../action';

const CreateModalData = (state=[],action) => { 
    switch (action.type) { 
        case CREATEMODAL_FILE_DATA:
            return {
                ...state,
                file: action.file,
            }
        default:
            return state
    }
};
export default CreateModalData;
