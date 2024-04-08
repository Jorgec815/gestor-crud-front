import axios from "axios";


const apiurl = 'https://gestor-transacciones.somee.com';


export const getTransacciones = async () => {
    const response = await axios.get(`${apiurl}/api/Transacciones`);
    return response.data;
}

export const getVehiculos = async () => {
    const response = await axios.get(`${apiurl}/api/Vehiculos`);
    return response.data;
}

export const getClientes = async () => {
    const response = await axios.get(`${apiurl}/api/Clientes`);
    return response.data;
}

export const getConcesionarios = async () => {
    const response = await axios.get(`${apiurl}/api/Concesionarios`);
    return response.data;
}

export const postTransaccion = async (data) => {
    const response = await axios.post(`${apiurl}/api/Transacciones`, data);
    return response.data;
}

export const putTransaccion = async (data) => {
    const response = await axios.put(`${apiurl}/api/Transacciones/${data.transaccionId}`, data);
    return response.data;
}

export const deleteTransaccion = async (id) => {
    const response = await axios.delete(`${apiurl}/api/Transacciones/${id}`);
    if(response.status === 204) return true;
    return false;
}