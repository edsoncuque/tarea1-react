import React, { useState, useEffect } from "react";
import Swalert from "sweetalert2";
import DataTable from "react-data-table-component";
import { type } from "@testing-library/user-event/dist/type";

const Formulario = () => {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState("");
  const [correo, setCorreo] = useState("");
  const [modoEdicion, setmodoEdicion] = useState(false);
  const [lista, setLista] = useState([]);
  const [filtrarPersona, setFiltrarPersona] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  /* Generar Codigo Automatico */
  const generarId = () => {
    return Math.floor(Math.random() * 1000000);
  };

  /* Validacion de Campos */
  const llenarCampos = (dato) => {
    Swalert.fire({
      icon: "error",
      title: "El Campo esta Vacio",
      text: `El Campo ${dato} no puede estar vacio`,
    });
  };

  /* Agregar un Usuario */
  const agregarUsuario = (e) => {
    e.preventDefault();
    if (nombre.trim() === "") {
      llenarCampos("Nombre");
      return;
    }
    if (nombre.trim() === "") {
      llenarCampos("Apellido");
      return;
    }
    if (nombre.trim() === "") {
      llenarCampos("Edad");
      return;
    }
    if (nombre.trim() === "") {
      llenarCampos("Correo");
      return;
    }

    const nuevoUsuario = {
      codigo: generarId(),
      nombre,
      apellido,
      edad,
      correo,
    };
    /* Spread Operator ... hace una copia de la lista */
    setLista([...lista, nuevoUsuario]);
    console.log(lista);
    setNombre("");
    setApellido("");
    setEdad("");
    setCorreo("");

    Swalert.fire({
      position: "center",
      icon: "success",
      title: "Agregado Correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  /* eliminar usuario */
  const eliminarUsuario = (codigo, nombre) => {
    Swalert.fire({
      title: `Estas Seguro de Eliminar a ${nombre}`,
      text: "No Podra Revertir el cambio despues de Confirmar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        const nuevaLista = lista.filter((item) => item.codigo !== codigo);
        setLista(nuevaLista);
        Swalert.fire(
          "Eliminado Correctamente",
          "El registro ha sido eliminado correctamente.",
          "success"
        );
      }
    });
  };

  /* Editar Usuario */

  const editarUsuario = (row) => {
    setmodoEdicion(true);
    setCodigo(row.codigo);
    setNombre(row.nombre);
    setApellido(row.apellido);
    setEdad(row.edad);
    setCorreo(row.correo);
  };

  const guardarCambios = (e) => {
    e.preventDefault();
    if (nombre.trim() === "") {
      llenarCampos("Nombre");
      return;
    }
    if (nombre.trim() === "") {
      llenarCampos("Apellido");
      return;
    }
    if (nombre.trim() === "") {
      llenarCampos("Edad");
      return;
    }
    if (nombre.trim() === "") {
      llenarCampos("Correo");
      return;
    }

    const editado = lista.map((item) =>
      item.codigo === codigo ? { codigo, nombre, apellido, edad, correo } : item
    );
    setLista(editado);
    setmodoEdicion(false);
    setNombre("");
    setApellido("");
    setEdad("");
    setCorreo("");

    Swalert.fire({
      position: "center",
      icon: "success",
      title: "Usuario Editado",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  useEffect(() => {
    const filtrar = () => {
      const resultado = lista.filter((item) => {
        return (
          item.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
          item.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
          item.edad.toLowerCase().includes(busqueda.toLowerCase()) ||
          item.correo.toLowerCase().includes(busqueda.toLowerCase())
        );
      });
      setFiltrarPersona(resultado);
    };
    filtrar();
  }, [busqueda, lista]);

  return (
    <div className="container py-5">
      <h1 className="py-5">Formulario de Clientes - Cliente CRUD</h1>
      {/* Inicio del Formulario */}
      <form className="form-group">
        <input
          type="text"
          placeholder="Ingrese su Nombre"
          className="form-control mb-3"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ingrese su Apellido"
          className="form-control mb-3"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
        <input
          type="number"
          min={0}
          max={100}
          placeholder="Ingrese su Edad"
          className="form-control mb-3"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
        />
        <input
          type="email"
          placeholder="Ingrese su Correo"
          className="form-control mb-3"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        {modoEdicion ? (
          <button
            onClick={(e) => guardarCambios(e)}
            type="submit"
            className="btn btn-warning btn-block"
          >
            Guardar Cambios
          </button>
        ) : (
          <button
            className="btn btn-dark btn-block"
            type="submit"
            onClick={(e) => agregarUsuario(e)}
          >
            <span>
              <i className="fa-solid fa-plus py-1"></i>{" "}
            </span>
            Agregar Usuario
          </button>
        )}
      </form>
      {/* Crear Datatable */}
      <div className="container py-5">
        <h1>Listado de Clientes</h1>
        <DataTable
          columns={[
            {
              name: "Codigo",
              selector: (row) => row.codigo,
              sortable: true,
            },
            {
              name: "Nombre",
              selector: (row) => row.nombre,
              sortable: true,
            },
            {
              name: "Apellido",
              selector: (row) => row.apellido,
              sortable: true,
            },
            {
              name: "Edad",
              selector: (row) => row.edad,
              sortable: true,
            },
            {
              name: "Correo",
              selector: (row) => row.correo,
              sortable: true,
            },
            {
              name: "Acciones",
              cell: (row) => (
                <>
                  <button
                    onClick={() => {
                      eliminarUsuario(row.codigo, row.nombre);
                    }}
                    className="btn btn-danger btn-sm"
                  >
                    <span>
                      <i className="fa-solid fa-trash-can"></i>
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      editarUsuario(row);
                    }}
                    className="btn btn-warning btn-sm mx-1"
                  >
                    <span>
                      <i className="fa-solid fa-pencil"></i>
                    </span>
                  </button>
                </>
              ),
            },
          ]}
          data={filtrarPersona}
          pagination
          paginationComponentOptions={{
            rowsPerPageText: "Filas por Pagina",
            rangeSeparatorText: "de",
            noRowsPerPage: false,
            selectAllRowsItem: false,
            selectAllRowsItemText: "Todos",
          }}
          highlightOnHover
          pointerOnHover
          subHeader
          subHeaderComponent={
            <input
              type="text"
              placeholder="Buscar"
              className="w-25 form-control"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            ></input>
          }
        ></DataTable>
      </div>
    </div>
  );
};

export default Formulario;
