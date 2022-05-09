export const addCharacterAction = () => dispatch => {
    dispatch({
        type: "ADD_CHARACTER"
    })
}

export const updateCharacterNameAction = (char, idx) => dispatch => {
    dispatch({
        type: "UPDATE_CHARACTER_NAME",
        name: char.name,
        idx: char.idx,
        id: char.id,
        gearLevel: char.gearLvl,
        level: char.level
    })
}

export const updateCharacterLevelAction = (data, idx) => dispatch => {
    dispatch({
        type: "UPDATE_CHARACTER_LEVEL",
        data,
        idx
    })
}

export const updateCharacterGearLevelAction = (gearLevel, idx) => dispatch => {
    dispatch({
        type: "UPDATE_CHARACTER_GEAR_LEVEL",
        gearLevel,
        idx
    })
}