export const handleJSONSubmitAction = (json, type) => async dispatch => {
    console.log(typeof json, typeof type)
    const convertJson = JSON.parse(json);

    console.log(typeof convertJson, convertJson)

    if(type === "roster") {
        console.log("set roster")
        dispatch({
            type: "SET_MY_ROSTER",
            payload: convertJson
        })
    }

    if(type === "inventory") {
        console.log("set inventory")
        dispatch({
            type: "SET_MY_INVENTORY",
            payload: convertJson
        })
    }
}