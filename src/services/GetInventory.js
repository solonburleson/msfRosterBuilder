import axios from "axios";

import serviceURLs from "./endpoints";

const inventoryURL = serviceURLs.GET_INVENTORY;

export const getInventory = () => 
    axios
        .get(inventoryURL)
        .then(response => response)
        .catch(error => {
            throw error
        });