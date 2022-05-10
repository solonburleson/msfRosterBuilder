import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInventoryAction, calculateGearDifferenceAction, calculateGearDifferenceActionV2 } from '../redux/actions/inventoryActions';

const Inventory = () => {
    const inventory = useSelector(state => state.inventoryReducer);
    const characters = useSelector(state => state.characterListReducer)
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getInventoryAction());
    //     console.log(characters)
    // }, [])

    useEffect(() => {
        dispatch(calculateGearDifferenceAction(inventory))
    }, [inventory.gearNeeded])

    useEffect(() => {
        console.log("calculating gear differenve v2")
        dispatch(calculateGearDifferenceActionV2(inventory))
    }, [JSON.stringify(inventory.gearNeededv2)])

    useEffect(() => {
        console.log(inventory)
    }, [inventory])

    return (
        <div>
            <h2>Inventory</h2>
            <ol>
                {inventory.gearDiffv2 && Object.keys(inventory.gearDiffv2).map((key) => {
                    return <p key={key}>{key} {inventory.gearDiffv2[key]}</p>
                })}
            </ol>
        </div>
    )
}

export default Inventory;