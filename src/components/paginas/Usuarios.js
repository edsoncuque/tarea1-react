import React, { useState, useEffect } from "react";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  const getUsers = async () => {
    try {
      const resp = await fetch("https://jsonplaceholder.typicode.com/users");
      const users = await resp.json();
      setUsuarios(users);
      console.log("data", users);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container py-5">
      <h1 className="py-5 text-center">Listado de Usuarios</h1>
      <div className="row">
        {usuarios.map((item) => (
          <div className="col-sm-6 mb-3" key={item.id}>
            <>
              <div className="card mb-2">
                <div className="row g-0">
                  <div className="container col-md-8">
                    <img
                      src="./icon_user.png"
                      className="img-fluid rounded-start"
                      alt="..."
                    />

                    <div>
                      <div className="card-body">
                        <h5 className="card-title">Datos Personales</h5>
                        <p className="card-text">id:{item.id}</p>
                        <br />
                        <p className="card-text py-10">Nombre :{item.name}</p>
                        <p className="card-text py-10">
                          Usuario :{item.username}
                        </p>
                        <p className="card-text py-10">Email :{item.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Usuarios;
