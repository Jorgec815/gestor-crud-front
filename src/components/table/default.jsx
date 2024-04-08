import React from "react";
import PropTypes from "prop-types";

const Table = (props) => {
    const { data } = props;
    return (
        <table className="Table">
            <thead>
                <tr>
                    <th>Transacción N°</th>
                    <th>Marca del automovil</th>
                    <th>Modelo</th>
                    <th>Año</th>
                    <th>Nombre Cliente</th>
                    <th>Nombre Del Concesionario</th>
                    <th>Fecha de Venta</th>
                    <th>Precio de Venta</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row) => (
                    <tr key={row.transaccionId}>
                        <td>{row.transaccionId}</td>
                        <td>{row.vehiculo.marca}</td>
                        <td>{row.vehiculo.modelo}</td>
                        <td>{row.vehiculo.anio}</td>
                        <td>{row.cliente.nombre}</td>
                        <td>{row.concesionario.nombre}</td>
                        <td>{row.fechaVenta}</td>
                        <td>{row.precioVenta}</td>
                        <td>{row.acciones}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;

Table.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            transaccionId: PropTypes.number.isRequired,
            vehiculo: PropTypes.shape({
                marca: PropTypes.string.isRequired,
                modelo: PropTypes.string.isRequired,
                anio: PropTypes.number.isRequired,
            }).isRequired,
            cliente: PropTypes.shape({
                nombre: PropTypes.string.isRequired,
            }).isRequired,
            concesionario: PropTypes.shape({
                nombre: PropTypes.string.isRequired,
            }).isRequired,
            fechaVenta: PropTypes.string.isRequired,
            precioVenta: PropTypes.number.isRequired,
            acciones: PropTypes.node,
        })
    ).isRequired,
};