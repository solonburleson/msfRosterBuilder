import { getRoster, getMSFGGRoster } from '../../services/GetRoster';

export const getRosterAction = () => async dispatch => {
    try {
        const response = await getRoster();
        dispatch({
            type: "SET_MY_ROSTER",
            payload: response.data
        })
    } catch(e) {
        /* */
    }
}

export const getMSFGGRosterAction = () => async dispatch => {
    try {
        const response = await getMSFGGRoster();
    } catch(e) {
        /* */
    }
}