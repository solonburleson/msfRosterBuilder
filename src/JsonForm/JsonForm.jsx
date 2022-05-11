import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {handleJSONSubmitAction} from '../redux/actions/jsonSubmitActions'
import './styles/JsonForm.css';

const JsonForm = ({type}) => {
    const dispatch = useDispatch();
    const [json, setJson] = useState();

    const handleChange = (e) => {
        setJson(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(handleJSONSubmitAction(json, type))
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <h3><label>{`${type.charAt(0).toUpperCase()}${type.slice(1)}`} JSON</label></h3>
            <textarea value={json} onChange={handleChange} />
            <input type="submit" value="Submit" />
        </form>
    )
}

export default JsonForm;