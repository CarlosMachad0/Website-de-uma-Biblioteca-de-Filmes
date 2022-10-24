import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useEffect, useState } from 'react';
import React from "react";
import "react-router-dom";
import axios from 'axios';
import { useParams } from "react-router-dom";
const baseUrl = "http://localhost:3000";

export default function EditComponent() {

    const [datafilmes, setdatafilmes] = useState("");
    const [campdescrição, setcampdescrição] = useState("");
    const [camptítulo, setcamptítulo] = useState("");
    const [campfoto, setcampfoto] = useState("");
    const [campgénero, setcampgénero] = useState("");
    const [Datagen,setGeneros]=useState([]);


    const { filmesId } = useParams();

    useEffect(() => {
        const url = baseUrl + "/filmes/get/" + filmesId;
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data[0];
                    setdatafilmes(data);
                    setcampdescrição(data.descrição);
                    setcamptítulo(data.título);
                    setcampfoto(data.foto);
                    setcampgénero(data.Idgenero);
                }
                else {
                    alert("Error web service")
                }
            })
            .catch(error => {
                alert("Error server: " + error)
            })
    }, []);
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
                        placeholder="Título" value={camptítulo} onChange={(value) => setcamptítulo(value.target.value)} />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="inputEmail4">Descrição</label>
                    <input type="email" className="form-control"
                        placeholder="Descrição" value={campdescrição} onChange={(value) => setcampdescrição(value.target.value)} />
                </div>
            </div>
            <div>
                <div className="form-group col-md-6">
                    <label htmlFor="inputEmail4">Foto</label>
                    <input type="text" className="form-control"
                        placeholder="foto" value={campfoto} onChange={(value) => setcampfoto(value.target.value)} />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="inputState">Género</label>
                    <select id="inputState" className="form-control" onChange={(value) => setcampgénero(value.target.value)}>
                        {Datagen.map(genero =>
                            <option value={genero.id}>{genero.genero}</option>)}
                    </select>
                </div>
            </div>
            <button type="submit" class="btn btn-primary" onClick={() => SendUpdate()}>Update</button>
        </div>
    );


    function SendUpdate() {
        // url de backend
        const url = baseUrl + "/filmes/update/" + filmesId
        const datapost = {
            descrição: campdescrição,
            título: camptítulo,
            foto: campfoto,
            generoId: campgénero,
        }
        axios.post(url, datapost)
            .then(response => {
                if (response.data.success === true) {
                    alert(response.data.message)
                }
                else {
                    alert("Error")
                }
            }).catch(error => {
                alert("Error 34 " + error)
            })
    }

}