import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from "react";
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function EditComponent() {
    const [Datafilmes, setdatafilmes] = useState([]);
    const [Datagen,setGeneros]=useState([]);
    const [campdescrição, setcampdescrição] = useState("");
    const [camptítulo, setcamptítulo] = useState("");
    const [campfoto, setcampfoto] = useState("");
    const [campgénero, setcampgénero] = useState("");
    const [stringRole, setstringRole] = useState("");
    const [selectRole, setselectRole] = useState("");

    useEffect(() => {
        const url = "http://localhost:3000/filmes/getgen";
        axios
          .get(url)
          .then((res) => {
            if (res.data.success) {
              const data = res.data.data;
              setGeneros(data);
            } else {
              alert("Error Web Service!");
            }
          })
          .catch((error) => {
            alert(error);
          });
      }, []);

    return (
        <div>
            <div className="form-row justify-content-center">
                <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4">Título </label>
                    <input type="text" className="form-control"
                        placeholder="Título"
                        value={camptítulo} onChange={value => setcamptítulo(value.target.value)} />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="inputEmail4">Descrição</label>
                    <input type="text" className="form-control"
                        placeholder="Descrição"
                        value={campdescrição} onChange={value => setcampdescrição(value.target.value)} />
                </div>

                <div className="form-group col-md-6">
                    <label htmlFor="inputEmail4">Foto</label>
                    <input type="text" className="form-control"
                        placeholder="foto"
                        value={campfoto} onChange={value => setcampfoto(value.target.value)} />

                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="inputState">Género</label>
                    <select id="inputState" className="form-control"
                        onChange={(value) => setcampgénero(value.target.value)}>
                        <option defaultValue>Choose...</option>
                       {Datagen.map(genero => 
                        <option value={genero.id}>{genero.genero}</option>)}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary"
                    onClick={() => SendSave()}>Save</button>
            </div>
        </div>
    );

    function SendSave() {
        if (campdescrição === "") {
            alert("Insert the descrição!")
        }
        else if (camptítulo === "") {
            alert("Insert título!")
        }
        else if (campfoto === "") {
            alert("Insert foto!")
        }
        else if (campgénero === 0) {
            alert("Insert género!")
        }
        else {
            const baseUrl = "http://localhost:3000/filmes/create"
            const datapost = {
                descrição: campdescrição,
                título: camptítulo,
                foto: campfoto,
                generoId: campgénero,
            }
            axios.post(baseUrl, datapost)
                .then(response => {
                    if (response.data.success === true) {
                        alert(response.data.message)
                    }
                    else {
                        alert(response.data.message)
                    }
                }).catch(error => {
                    alert("Error 34 " + error)
                })
        }
    }
}
