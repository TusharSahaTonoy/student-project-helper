import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Users() {
    let navigate = useNavigate();

    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.defaults.headers.common['X-Csrf-Token'] = localStorage.getItem('x-csrf-token');
        axios.get(process.env.REACT_APP_BACKEND_URL + "/users").then((res) => {
            // console.log(process.env);
            // console.log(res);
            if (res.data)
                setUsers(res.data);
            else
                navigate('/home');
        });
    }, []);

    return (
        <>
            <div className="pagetitle">
                <h1>User List</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item">Pages</li>
                        <li className="breadcrumb-item active">Blank</li>
                    </ol>
                </nav>
            </div>

            <section className="section">
                <div className="row">
                    <div className="col-lg-6">

                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Default List Group</h5>
                                <ul className="list-group">
                                    {users.map(item => <li className="list-group-item"> {item.name} </li>)}
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );

}