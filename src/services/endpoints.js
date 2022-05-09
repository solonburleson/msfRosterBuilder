const SERVICE_CONTEXT = '/msfRosterBuilder';
const getServiceURL = endpoint => SERVICE_CONTEXT.concat(endpoint);

const msfGGApi = 'https://api-staging.msf.gg/services/api'
const getMSFGGServiceURL = endpoint => msfGGApi.concat(endpoint);

const serviceURLs = {
    get GET_INVENTORY() {
        return getServiceURL('/getInventory')
    },
    get GET_ROSTER() {
        return getServiceURL('/getRoster')
    }
}

export const msfGGURLs = {
    get GET_INVENTORY() {
        return getMSFGGServiceURL('/getInventory?ID=5f13e31e57921&Key=b2337983-874c-11ec-ada5-0234b4dc354e')
    }
} 

export default serviceURLs;