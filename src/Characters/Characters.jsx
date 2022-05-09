import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCharacterAction, updateCharacterNameAction, updateCharacterLevelAction, updateCharacterGearLevelAction } from '../redux/actions/characterListActions';
import characterDropdown from '../constants/characters.js';
import levels from '../constants/level';
import gearLevels from '../constants/gearLevels';
import goldPerLevel from '../constants/goldPerLevel';
import { id } from 'postcss-selector-parser';
import { materialsNeededAction, materialsNeededActionV2 } from '../redux/actions/inventoryActions';

const Characters = () => {
    const dispatch = useDispatch();
    const characterList = useSelector(state => state.characterListReducer);
    const roster = useSelector(state => state.rosterReducer)
    const inventory = useSelector(state => state.inventoryReducer);
    ;let activeList = [];

    useEffect(() => {
        console.log(characterList)
    }, [characterList])

    const calculateGoldPerLevel = (targetLvl, id) => {
        let gold = 0;

        const myChar = roster.roster[id];

        for (let index = myChar.level; index < targetLvl; index++) {
            gold += goldPerLevel[index];
        }
        
        return gold;
    }

    const handleAddCharacter = () => {
        dispatch(addCharacterAction())
    }

    const handleNameChange = event => {
        let char = {};
        for (let index = 0; index < 197; index++) {
            if(event.target[index].id === event.target.value){
                char.name = event.target[index].innerHTML;

            }
        }
        char.id = event.target.value;

        const myChar = roster.roster[char.id]
        char.level = myChar.level;
        char.gearLvl = myChar.tier

        char.idx = event.target.id.replace("name", "");
        dispatch(updateCharacterNameAction(char, char.idx));
    }

    const handleLevelChange = event => {
        let data = {};
        let gold = 0;

        data.level = event.target.value
        const level = event.target.value;
        const idx = event.target.id.replace("level", "");

        if(characterList.characters[idx].id !== ""){
            gold = calculateGoldPerLevel(level, characterList.characters[idx].id)
        }

        data.gold = gold;
        dispatch(updateCharacterLevelAction(data, idx));
    }

    const handleGearLevelChange = event => {
        const gearLevel = event.target.value;
        const idx = event.target.id.replace("gearLevel", "");

        const char = characterList.characters[idx];

        for (let index = 0; index < characterList.characters.length; index++) {
            activeList.push(characterList.characters[index].id)
            
        }

        dispatch(materialsNeededAction(gearLevel, char));
        dispatch(materialsNeededActionV2(inventory, gearLevel, char, activeList));
        dispatch(updateCharacterGearLevelAction(gearLevel, idx));
    }

    return (
        <div>
            <h2>Character List</h2>
            <div>
                <ol>
                    {characterList.characters.map((char, idx) =>
                        <li key={`character${idx}`}>
                            <select onChange={handleNameChange} id={`name${idx}`}>
                                <option value={char.id}>{char.name}</option>
                                {characterDropdown.map(character => {
                                    return <option id={character.id} value={character.id}>{character.name}</option>
                                })}
                            </select>
                            <select onChange={handleLevelChange} id={`level${idx}`}>
                                <option value={char.level}>{char.level}</option>
                                {levels.map(level => {
                                    if(level > char.level) {
                                        return <option value={level}>{level}</option>
                                    }
                                })}
                            </select>
                            <select onChange={handleGearLevelChange} id={`gearLevel${idx}`}>
                                <option value={char.gearLevel}>{char.gearLevel}</option>
                                {gearLevels.map(gearLvl => {
                                    if(gearLvl > char.gearLevel) {
                                        return <option value={gearLvl}>{gearLvl}</option>
                                    }
                                })}
                            </select>
                        </li>
                    )}
                </ol>
                <p>Total Gold Required: ~{characterList.gold}</p>
                <button
                onClick={handleAddCharacter}
                >
                    Add character
                </button>
            </div>
        </div>
    )
}

export default Characters;