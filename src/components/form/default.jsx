import React from "react";
import PropTypes from "prop-types";
import Button from "../button/deafult";

const Form = (props) => {
    const {
        title,
        brands,
        models,
        concessionaires,
        clients,
        year,
        date,
        price,
        type,
        onSubmit
    } = props;

    const maxDate = new Date().toISOString().split('T')[0];

    const handleSubmit = (e) => {
        console.log('Submit');
        e.preventDefault();
        onSubmit(e);
    }

    return (
        <div className="Form">
            <h2 className="Form-Title">{title}</h2>
            <form onSubmit={e => handleSubmit(e)}>
                <div className="Form-Group">
                    <label htmlFor="Marca">Marca</label>
                    {
                        type === 'add' && (
                            <select name="Marca" id="brand">
                                {brands.map( el => {
                                    return <option key={el} value={el}>{el}</option>
                                })}
                            </select>
                        )
                    }
                    {
                        type === 'modify' && <input type="text" id="Marca" name="Marca" value={brands[0]} disabled/>
                    }
                </div>
                <div className="Form-Group">
                    <label htmlFor="Modelo">Modelo</label>
                    {
                        type === 'add' && (
                            <select name="Modelo" id="model">
                                {models.map( el => {
                                    return <option key={el} value={el}>{el}</option>
                                })}
                            </select>
                        )
                    }
                    {
                        type === 'modify' && <input type="text" id="Modelo" name="Modelo" value={models[0]} disabled/>
                    }
                </div>
                <div className="Form-Group">
                    <label htmlFor="Anio">Año</label>
                    <input type="number" id="Anio" name="Anio" min={1950} max={3000} defaultValue={year}/>
                </div>
                <div className="Form-Group">
                    <label htmlFor="NombreCliente">Nombre Cliente</label>
                    {
                        type === 'add' && (
                            <select name="NombreCliente" id="client">
                                {clients.map( el => {
                                    return <option key={el} value={el}>{el}</option>
                                })}
                            </select>
                        )
                    }
                    {
                        type === 'modify' && <input type="text" id="NombreCliente" name="NombreCliente" value={clients[0]} disabled/>
                    }
                </div>
                <div className="Form-Group">
                    <label htmlFor="NombreConcesionario">Nombre Concesionario</label>
                    {
                        type === 'add' && (
                            <select name="NombreConcesionario" id="NombreConcesionario">
                                {concessionaires.map( el => {
                                    return <option key={el} value={el}>{el}</option>
                                })}
                            </select>
                        )
                    }
                    {
                        type === 'modify' && <input type="text" id="NombreConcesionario" name="NombreConcesionario" value={concessionaires[0]} disabled/>
                    }
                </div>
                <div className="Form-Group">
                    <label htmlFor="FechaVenta">Fecha de Venta</label>
                    <input type="date" id="FechaVenta" name="FechaVenta" max={maxDate} defaultValue={date}/>
                </div>
                <div className="Form-Group">
                    <label htmlFor="PrecioVenta">Precio de Venta</label>
                    <input type="number" id="PrecioVenta" name="PrecioVenta" min={0} step={1000000} defaultValue={price}/>
                </div>
                <Button label="Guardar" type="add"/>
            </form>
        </div>
    );
}

export default Form;

Form.propTypes = {
    title: PropTypes.string.isRequired,
    brands: PropTypes.arrayOf(PropTypes.string).isRequired,
    models: PropTypes.arrayOf(PropTypes.string).isRequired,
    concessionaires: PropTypes.arrayOf(PropTypes.string).isRequired,
    clients: PropTypes.arrayOf(PropTypes.string).isRequired,
    date: PropTypes.number,
    price: PropTypes.number,
    year: PropTypes.number,
    type: PropTypes.oneOf(["add", "modify"]).isRequired,
    onSubmit: PropTypes.func.isRequired,
}

Form.defaultProps = {
    date: new Date().toISOString().split('T')[0],
    price: 0,
    year: new Date().getFullYear(),
}
