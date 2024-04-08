import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/default';
import Table from './components/table/default';
import Button from './components/button/deafult';
import Form from './components/form/default';
import {
  getTransacciones,
  getVehiculos,
  getClientes,
  getConcesionarios,
  deleteTransaccion,
  postTransaccion,
} from './utilities/endpoints/transacciones';

function App() {
  const [activeForm, setActiveForm] = useState('disabled');
  const [valueToModify, setValueToModify] = useState(null);
  const [transacciones, setTransacciones] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [concesionarios, setConcesionarios] = useState([]);
  const generateButtons = (id) => {
    return (
      <React.Fragment>
        <Button label={'Editar'} type={'modify'} onClick={() => handleEdit(id)} />
        <Button label={'Eliminar'} type={'delete'} onClick={() => handleDelete(id)} />
      </React.Fragment>
    )
  }

  const fetchTransacciones = async () => {
    await getTransacciones().then((response) => {
      response.forEach((element) => {
        element.acciones = generateButtons(element.transaccionId);
      });
      setTransacciones(response);
    });
  }

  const fetchVehiculos = async () => {
    await getVehiculos().then((response) => {
      const brands = [];
      const models = [];
      response.forEach((element) => {
        if (!brands.includes(element.marca)) {
          brands.push(element.marca);
        }
        setMarcas(brands);
        if (!models.includes(element.modelo)) {
          models.push(element.modelo);
        }
        setModelos(models);
        setVehiculos(response);
      });
    });
  }

  const fetchClientes = async () => {
    await getClientes().then((response) => {
      setClientes(response);
    });
  }

  const fetchConcesionarios = async () => {
    await getConcesionarios().then((response) => {
      setConcesionarios(response);
    });
  }

  useEffect(() => {
    fetchTransacciones();
    fetchVehiculos();
    fetchClientes();
    fetchConcesionarios();
  });

  const handleSubmit = async (e) => {
    console.log('Submit: ', e.target.elements);
    console.log('Vehiculos: ', vehiculos);
    console.log('Clientes: ', clientes);
    console.log('Concesionarios: ', concesionarios);
    const vehicleId = vehiculos.find((element) => element.marca === e.target.elements.Marca.value && element.modelo === e.target.elements.Modelo.value).vehiculoId;
    const clientId = clientes.find((element) => element.nombre === e.target.elements.NombreCliente.value).clienteId;
    const concesionarioId = concesionarios.find((element) => element.nombre === e.target.elements.NombreConcesionario.value).concesionarioId;
    const json = {
      "vehiculoId": vehicleId,
      "clienteId": clientId,
      "concesionarioId": concesionarioId,
      "fechaVenta": e.target.elements.FechaVenta.value,
      "precioVenta": e.target.elements.PrecioVenta.value,
    }
    await postTransaccion(json).then(() => {
      fetchTransacciones();
    });

    setActiveForm('disabled');
  }
  const handleEdit = (index) => {
    console.log('Edit: ', transacciones);
    setValueToModify(transacciones.find((element) => element.transaccionId === index));
    setActiveForm('modify');
  }

  const handleDelete = async (index) => {
    await deleteTransaccion(index).then(() => {
      fetchTransacciones();
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
              onSubmit={(e) => handleSubmit(e)}/>
          )
        }
        { activeForm === 'modify' && (
          <Form
            type={'modify'}
            title='Modificar Venta'
            brands={[valueToModify.vehiculo.marca]}
            models={[valueToModify.vehiculo.modelo]}
            concessionaires={[valueToModify.concesionario.nombre]}
            clients={[valueToModify.cliente.nombre]}
            date={valueToModify.fechaVenta}
            price={valueToModify.precioVenta}
            onSubmit={(e) => handleSubmit(e)}
          />
        )}
        { activeForm !== 'disabled' && (
          <Button label='Cancelar' type='delete' onClick={() => setActiveForm('disabled')} />
        )}
      </div>
    </div>
  );
}

export default App;


