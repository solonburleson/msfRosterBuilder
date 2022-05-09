import * as types from "../actionTypes";

const initialState = {
    characters: [
        {
            id: "",
            name: "",
            targetLevel: null,
            targetGearLevel: null,
            level: null,
            gearLevel: null,
            gold: 0
        }
    ],
    gold: 0
}

const defaultChar = {
    id: "",
    name: "",
    targetLevel: null,
    targetGearLevel: null,
    level: null,
    gearLevel: null,
    gold: 0,
    gearReq: {}
}

const updateGold = (state) => {
    let gold = 0;
    const list = state.characters;
    for (let index = 0; index < list.length; index++) {
        gold += list[index].gold
        
    }
    return gold;
}

export default function(state={...initialState}, action) {
    switch (action.type) {
        case types.ADD_CHARACTER:
            return {
                ...state,
                characters: state.characters.concat(defaultChar)
            }
        case types.UPDATE_CHARACTER_NAME:
            return {
                ...state,
                characters: [
                    ...state.characters.slice(0,action.idx),
                    state.characters[action.idx] = { 
                        ...state.characters[action.idx],
                        name: action.name,
                        id: action.id,
                        level: action.level,
                        gearLevel: action.gearLevel
                    },
                    ...state.characters.slice(action.idx + 1)
                ],
                gold: updateGold(state)
            }
        case types.UPDATE_CHARACTER_LEVEL:
            return {
                ...state,
                characters: [
                    ...state.characters.slice(0,action.idx),
                    state.characters[action.idx] = { 
                        ...state.characters[action.idx],
                        targetLevel: parseInt(action.data.level),
                        gold: action.data.gold
                    },
                    ...state.characters.slice(action.idx + 1)
                ],
                gold: updateGold(state)
            }
        case types.UPDATE_CHARACTER_GEAR_LEVEL:
            return {
                ...state,
                characters: [
                    ...state.characters.slice(0,action.idx),
                    state.characters[action.idx] = { 
                        ...state.characters[action.idx],
                        targetGearLevel: parseInt(action.gearLevel)
                    },
                    ...state.characters.slice(action.idx + 1)
                ]
            }
        default:
            return state;
    }
}