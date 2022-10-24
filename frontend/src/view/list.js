import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import Swal from "sweetalert2";
import axios from 'axios';
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import '../App.css';


export default function ListComponent() {
    const [Datafilmes, setdatafilmes] = useState([]);
    const [generos, setGeneros] = useState([]);

    useEffect(() => {
        Loadfilmes();
    }, []);

    
    function Loadfilmes() {
        const url = "http://localhost:3000/filmes/list";
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setdatafilmes(data);
                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error)
            });
    }
    
    function OnDelete(id)
    {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this imaginary file!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                SendDelete(id)
            } else if (result.dismiss ===Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        })
    }

   function SendDelete(FilmeID)
    {
        // url do backend
        const baseUrl = "http://localhost:3000/filmes/delete"
        // network
        axios.post(baseUrl, {
            id: FilmeID
        })
            .then(response => {
                if (response.data.success) {
                    Swal.fire(
                        'Deleted!',
                        'Your movie has been deleted.',
                        'success'
                    )
                    Loadfilmes();
                }
            })
            .catch((error) => {
                alert("Error 325 ")
            });
    }

    return (
        <table className="table table-hover table-striped">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Título</th>
                    <th scope="col">Género</th>
                    <th scope="col">Foto</th>
                    <th scope="col">Descrição</th>
                    <th colspan="2">Action</th>
                </tr>
            </thead>
            <tbody>
                <LoadFillData />
            </tbody>
        </table>
    );



    function LoadFillData() {
        return Datafilmes.map((data, index) => {
            return (
                <tr key={index}>
                    <th>{data.id}</th>
                    <td>{data.título}</td>
                    <td>{data.genero.genero}</td>
                    <td><img src={data.foto} className="img"></img></td>
                    <td>{data.descrição}</td>
                    <td>
                        <Link className="btn btn-outline-info " to={"/edit/" + data.id} >Edit</Link>
                    </td>
                    <td>
                        <button class="btn btn-outline-danger" onClick={() => OnDelete(data.id)}> Delete </button>
                    </td>
                </tr>
            )
        });
    }
 }
