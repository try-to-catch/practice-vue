import secrets from "/secrets.json"
import axios from "axios";

const ENTRY_POINT = 'https://api.novaposhta.ua/v2.0/json/'
const API_KEY = secrets.API_KEY

export function getCitiesByString(city) {
    return axios.post(ENTRY_POINT, {
        "apiKey": API_KEY,
        "modelName": "Address",
        "calledMethod": "getCities",
        "methodProperties": {
            "FindByString": city,
            "Limit": "20"
        }
    }).then((res) => res.data.data)
}


export function getAddressByWarehouseNumber(warehouseNumber, cityName) {
    return axios.post(ENTRY_POINT, {
        "apiKey": API_KEY,
        "modelName": "Address",
        "calledMethod": "getWarehouses",
        "methodProperties": {
            "CityName": cityName,
            "WarehouseId": warehouseNumber,
            "Limit": "20"
        }
    }).then((res) => res.data.data)
}