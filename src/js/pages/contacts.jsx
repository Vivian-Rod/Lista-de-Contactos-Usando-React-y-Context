import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const Contactos = () => {
    const { store, actions } = useContext(Context)
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [lista, setLista] = useState(store.listaContactos)
    const [refresh, setRefresh] = useState(false)
    const [estadoTemporal, setEstadotemporal] = useState({})

    useEffect(() => { 
        let funcionCarga = async () => {

            actions.funcionCarga()
        }
        funcionCarga() 

    }, [refresh])

    useEffect(() => { }, [lista, nombre])

    return (<>
        <div className="container-fluid ms-2">
            <div className="row p-5">
                <div className="col-md-12 d-flex justify-content-end">
                    <button className="btn btn-success">
                        <Link to="/add-contact" style={{ color: 'white' }}>Add a New Contact</Link>
                    </button>
                </div>
            </div>
            <div className="row d-flex justify-content-center w-100 bg-custom mb-4">
                <div className="col-12 col-md-8 col-lg-6 w-100 border">
                    <ul className="list-group">
                        {store.listaContactos && store.listaContactos.length > 0 ? (
                            store.listaContactos.map((item, index) => {
                                return (
                                    <div key={index} className="row border-bottom py-3">
                                        <div className="col-2">
                                            <img className="img-thumbnail" src="https://phantom-marca-mx.unidadeditorial.es/d01b2c211447ba0cb080f0a9e0cc6e10/resize/828/f/jpg/mx/assets/multimedia/imagenes/2023/08/11/16917106843810.jpg" />
                                        </div>
                                        <div className="col-8">
                                            <h3 className="mb-3">{item.full_name}</h3>
                                            <p className="text-white"><i class="fas fa-map-marker-alt text-secondary"></i><span className="ms-3">{item.address}</span></p>
                                            <p className="text-white"><i class="fas fa-at text-secondary"></i><span className="ms-3">{item.email}</span></p>
                                            <p className="text-white"><i class="fas fa-phone text-secondary"></i><span className="ms-3">{item.phone}</span></p>
                                        </div>
                                        <div className="col-2 d-flex align-items-center justify-content-end">
                                            <button
                                                className="btn btn-lg text-success m-2"
                                                button="button"
                                                onClick={() => {
                                                    console.log(item.full_name);
                                                    const nombrePrompt = prompt("Enter new name:", item["full_name"]);
                                                    const emailPrompt = prompt("Enter new email:", item.email);
                                                    const phonePrompt = prompt("Enter new phone number:", item.phone);
                                                    const addressPrompt = prompt("Enter new address:", item.address);
                                                    let obj = {
                                                        "full_name": nombrePrompt,
                                                        "email": emailPrompt,
                                                        "agenda_slug": "agenda_de_vivi",
                                                        "address": addressPrompt,
                                                        "phone": phonePrompt
                                                    }
                                                    actions.putFetch(item.id, obj);
                                                }}
                                            >
                                                <i class="fas fa-pencil-alt"></i>
                                            </button>
                                            <button
                                                className="btn btn-lg m-2 text-danger"
                                                type="button"
                                                onClick={async () => {
                                                    actions.deleteContact(item.id);           
                                                }}
                                            >
                                                <i class="fas fa-trash"></i>
                                            </button>

                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-3">
                                <i class="fas fa-sad-tear fa-lg"></i>
                                This Contact List Is Empty
                                <i class="fas fa-sad-tear fa-lg"></i></div>
                        )}
                    </ul>
                </div>
            </div>
        </div >
    </>)
}

export default Contactos;