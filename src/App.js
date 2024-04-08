import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/default';
import Table from './components/table/default';
import Button from './components/button/deafult';
import Form from './components/form/default';
import axios from 'axios';

function App() {
  const [activeForm, setActiveForm] = useState('disabled');
  const [transacciones, setTransacciones] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [concesionarios, setConcesionarios] = useState([]);
  const baseUrl = 'https://gestor-transacciones.somee.com/api';

  useEffect(() => {
    const fetchTransacciones = async () => {
      const result = await axios(
        baseUrl + '/Transacciones',
      );
      setTransacciones(result.data);
    }
    const fetchVehiculos = async () => {
      const result = await axios(
        baseUrl + '/Vehiculos',
      );
      setVehiculos(result.data);
      setMarcas(result.data.map((element) => element.marca));
      setModelos(result.data.map((element) => element.modelo));
    }
    const fetchClientes = async () => {
      const result = await axios(
        baseUrl + '/Clientes',
      );
      setClientes(result.data);
    }
    const fetchConcesionarios = async () => {
      const result = await axios(
        baseUrl + '/Concesionarios',
      );
      setConcesionarios(result.data);
    }
    fetchVehiculos();
    fetchClientes();
    fetchConcesionarios();
    fetchTransacciones();
  }, [])

  const sendTransaction = (event) => {
    const json = {
      "vehiculoId": vehiculos.find(el => el.marca === event.target.elements.Marca.value && el.modelo === event.target.elements.Modelo.value).vehiculoId,
      "clienteId": clientes.find(el => el.nombre === event.target.elements.NombreCliente.value).clienteId,
      "concesionarioId": concesionarios.find(el => el.nombre === event.target.elements.NombreConcesionario.value).concesionarioId,
      "fechaVenta": event.target.elements.FechaVenta.value,
      "precioVenta": event.target.elements.PrecioVenta.value,
    }
    axios.post(baseUrl + '/Transacciones', json)
      .then((response) => {
        console.log(response);
        setTransacciones([...transacciones, response.data]);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div className="App">
      <Header title="Administrador de Ventas" />
      <div className='Layout'>
        <Table data={transacciones}/>
        {
          activeForm !== 'add' && activeForm !== 'modify' && (
            <Button label='Agregar' type='add' onClick={() => setActiveForm('add')} />
          )
        }
        {
          activeForm === 'add' && (
            <Form
              type='add'
              title='Agregar Venta'
              brands={marcas}
              models={modelos}
              concessionaires={concesionarios.map((element) => element.nombre)}
              clients={clientes.map((element) => element.nombre)}
              onSubmit={(e) => sendTransaction(e)}/>
          )
        }
        { activeForm !== 'disabled' && (
          <Button label='Cancelar' type='delete' onClick={() => setActiveForm('disabled')} />
        )}
      </div>
    </div>
  );
}

export default App;


