import * as types from '../actionTypes';

const initialState = {
    myInv: {},
    gearNeeded: {},
    gearNeededv2: [],
    gearDiff: {},
    gearDiffv2: {}
}

const updateGearNeeded = (state, gearList) => {
    let updatedGearList = state.gearNeeded

    for(const [key, value] of Object.entries(gearList)) {
        if(updatedGearList[key]) {
            updatedGearList[key] += value;
        } else {
            updatedGearList[key] = value
        }
    }

    const sortedKeys = Object.keys(updatedGearList).sort((a,b) => updatedGearList[a] - updatedGearList[b])

    let sortedGearList = {};

    for (let index = 0; index < sortedKeys.length; index++) {
        sortedGearList[sortedKeys[index]] = updatedGearList[sortedKeys[index]]
        
    }

    return sortedGearList
}

export default function(state={...initialState}, action) {
    switch (action.type) {
        case types.SET_MY_INVENTORY:
            return {
                ...state,
                myInv: action.payload
            }
        case types.UPDATE_GEAR_NEEDED: 
            return {
                ...state,
                gearNeeded: updateGearNeeded(state, action.gearNeeded),
            }
        case types.UPDATE_GEAR_NEEDED_V2:
            return {
                ...state,
                gearNeededv2: action.gearNeeded
            }
        case types.UPDATE_GEAR_DIFFERENCE:
            return {
                ...state,
                gearDiff: action.gearDiff
            }
        case types.UPDATE_GEAR_DIFFERENCE_V2:
            return {
                ...state,
                gearDiffv2: action.gearDiffv2
            }
        default:
            return state;
    }
}