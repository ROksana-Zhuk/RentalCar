import axios from "axios";

axios.defaults.baseURL = 'https://car-rental-api.goit.global/';


export const getCarDetails = async (carId) => {

    const res = await axios.get(
        `/cars/${carId}`,
    );
    return res.data;
};