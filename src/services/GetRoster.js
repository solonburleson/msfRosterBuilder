import axios from "axios";

import serviceURLs, { msfGGURLs } from "./endpoints";

const rosterURL = serviceURLs.GET_ROSTER;

let msfGGRosterURL = msfGGURLs.GET_INVENTORY;

export const getRoster = () => 
    axios
        .get(rosterURL)
        .then(response => response)
        .catch(error => {
            throw error
        });

export const getMSFGGRoster = () => {
    msfGGRosterURL = msfGGRosterURL.concat('?ID=5f13e31e57921&Key=b2337983-874c-11ec-ada5-0234b4dc354e')
    return axios
        .get(msfGGRosterURL)
        .then(response => response)
        .catch(error => {
            throw error
        });
}