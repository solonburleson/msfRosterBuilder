import { getInventory } from '../../services/GetInventory';
import gearList from '../../constants/gearReqPerChar';
import { array } from 'prop-types';

export const getInventoryAction  = () => async dispatch => {
    try{
        const response = await getInventory();
        dispatch({
            type: "SET_MY_INVENTORY",
            payload: response.data
        })
    } catch (e) {
        /* */
    }
}

export const materialsNeededAction = (gearLvl, char) => async dispatch => {
    const thisChar = gearList[char.id];
    let gearNeeded = {}

    for (let gearLevel = char.gearLevel > 12 ? char.gearLevel : 13; gearLevel <= gearLvl; gearLevel++) {
        if(gearLevel !== char.gearLevel) {
            for(const [key, value] of Object.entries(thisChar[gearLevel])) {
                if(gearNeeded[key]) {
                    gearNeeded[key] += value
                } else {
                    gearNeeded[key] = value
                }
            }
            
        }
    }

    dispatch({
        type: "UPDATE_GEAR_NEEDED",
        gearNeeded
    })
}

export const materialsNeededActionV2 = (inventory, gearLvl, char, activeList) => async dispatch => {
    const thisChar = gearList[char.id];
    let gearNeeded = {}
    let newState = inventory.gearNeededv2;

    newState = newState.filter(item => item.id !== char.id)

    if(char.gearLevel < gearLvl){
        for (let gearLevel = char.gearLevel > 12 ? char.gearLevel : 13; gearLevel <= gearLvl; gearLevel++) {
            if(gearLevel !== char.gearLevel) {
                for(const [key, value] of Object.entries(thisChar[gearLevel])) {
                    if(gearNeeded[key]) {
                        gearNeeded[key] += value
                    } else {
                        gearNeeded[key] = value
                    }
                }
                
            }
        }
    }

    gearNeeded.id = char.id

    newState.push(gearNeeded)

    for (let index = 0; index < newState.length; index++) {
        if(!activeList.includes(newState[index].id)) {
            newState = newState.filter(item => item.id !== newState[index].id)
        }
    }

    console.log("updating gear needed v2")

    dispatch({
        type: "UPDATE_GEAR_NEEDED_V2",
        gearNeeded: newState
    })
}

export const calculateGearDifferenceAction = (inventory) => async dispatch => {
    const myInv = inventory.myInv;
    const gearNeeded = inventory.gearNeeded;
    let gearDiff = {};

    for(const [key, value] of Object.entries(gearNeeded)) {
        if(gearDiff[key]) {
            gearDiff[key] -= value;
        } else {
            gearDiff[key] = myInv.filter(item => {
                if(item.ItemId === key) {
                    return item.Qty;
                }
            })[0].Qty - value
        }
    }

    const sortedKeys = Object.keys(gearDiff).sort((a,b) => gearDiff[a] - gearDiff[b])

    let sortedGearList = {};

    for (let index = 0; index < sortedKeys.length; index++) {
        sortedGearList[sortedKeys[index]] = gearDiff[sortedKeys[index]]
        
    }

    dispatch({
        type: "UPDATE_GEAR_DIFFERENCE",
        gearDiff: sortedGearList
    })
}

export const calculateGearDifferenceActionV2 = (inventory) => async dispatch => {
    const myInv = inventory.myInv;
    const gearNeededv2 = inventory.gearNeededv2;
    let gearDiff = {};
    let totalGearNeeded = {};



    console.log("gear diff v2", gearNeededv2)

    for(const [key, value] of Object.entries(gearNeededv2)) {
        for(const [subKey, subValue] of Object.entries(value)) {
            if(subKey === 'id') {
                //do nothing
                continue;
            } else if(totalGearNeeded[subKey]) {
                totalGearNeeded[subKey] += subValue
            } else {
                totalGearNeeded[subKey] = subValue
            }
        }
    }

    console.log(totalGearNeeded)

    for(const [key, value] of Object.entries(totalGearNeeded)) {
        if(gearDiff[key]) {
            gearDiff[key] -= value;
        } else {
            gearDiff[key] = myInv.filter(item => {
                if(item.ItemId === key) {
                    return item.Qty;
                }
            })[0].Qty - value
        }
    }


    console.log(gearDiff);

    const sortedKeys = Object.keys(gearDiff).sort((a,b) => gearDiff[a] - gearDiff[b])

    let sortedGearList = {};

    for (let index = 0; index < sortedKeys.length; index++) {
        sortedGearList[sortedKeys[index]] = gearDiff[sortedKeys[index]]
        
    }

    console.log("sorted gear v2: ", sortedGearList)

    dispatch({
        type: "UPDATE_GEAR_DIFFERENCE_V2",
        gearDiffv2: sortedGearList
    })
}