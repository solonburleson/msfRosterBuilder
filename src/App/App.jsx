import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import { getInventoryAction } from '../redux/actions/inventoryActions';
import { getRosterAction, getMSFGGRosterAction } from '../redux/actions/rosterActions';
import Header from '../Header/Header.jsx';
import Inventory from '../Inventory/Inventory.jsx';
import Characters from '../Characters/Characters.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import JsonForm from '../JsonForm/JsonForm.jsx';

const App = () => {
    const dispatch = useDispatch();
    const roster = useSelector(state => state.rosterReducer)
    const inventory = useSelector(state => state.inventoryReducer)
    
    useEffect(() => {
        // dispatch(getInventoryAction());
        // dispatch(getRosterAction()); 
        console.log(roster, inventory)
    }, [])

    // useEffect(() => {
    //     let rosterKeys = []

    //     for(const [key, value] of Object.entries(roster.roster)) {
    //         rosterKeys.push(key)
    //     }

    //     const count = rosterKeys.length;
        
    //     for (let index = 0; index < rosterKeys.length; index++) {
    //         if (rosterKeys[index] !== "SymbioteSpiderMan") {
    //             rosterKeys.shift()
    //             index--
    //         } else {
    //             break;
    //         }
            
    //     }

    //     console.log(rosterKeys)
    //     let percentDone = (count - rosterKeys.length)/count * 100;
    //     percentDone = Math.trunc(percentDone)
    //     console.log(percentDone + "%")
    // },[roster])

    return (
        <div id="app" className="bg-dark text-light">
            <Header />
            <p>If the textboxes appear below, then you will need to submit your roster and inventory JSON for this application to work.</p>
            <div className="row m-2">
                <div className="col-8">
                    <Characters />
                </div>
                <div className="col-4">
                    <Inventory />
                </div>
            </div>
            <div className="row m-2">

                {(roster.roster === null) && (
                <div className="col-6">
                    <Tabs defaultActiveKey="json" id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="json" title="JSON Input">
                            <JsonForm type="roster" />
                        </Tab>
                        <Tab eventKey="form" title="Form Input">
                            This part is under development.
                        </Tab>
                    </Tabs>
                </div>
                )}
                
                {inventory.myInv === null && (
                    <div className="col-6">
                        <Tabs defaultActiveKey="json" id="uncontrolled-tab-example" className="mb-3">
                            <Tab eventKey="json" title="JSON Input">
                                <JsonForm type="inventory" />
                            </Tab>
                            <Tab eventKey="form" title="Form Input">
                                This part is under development.
                            </Tab>
                        </Tabs>
                    </div>
                )}
            </div>
        </div>
    )
}

export default App;