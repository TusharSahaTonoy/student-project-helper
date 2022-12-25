import axios from "axios";
import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {

    let emailInput = useRef('');
    let passwordInput = useRef('');
    let navigate = useNavigate();

    const { setUser } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(process.env.REACT_APP_BACKEND_URL + "/login", {
            email: emailInput.current.value,
            password: passwordInput.current.value,
        })
        .then(function (response) {
            if (response.data.id) {
                localStorage.setItem('x-csrf-token', response.headers["x-csrf-token"]);
                setUser({
                    login : true,
                    role: response.data.role_name
                });
                // console.log(response.headers["x-csrf-token"], localStorage.getItem('x-csrf-token'));
                navigate('/home');
            }
            else {
                alert('password not matched.');
            }
            // console.log(response.data);

        }).catch(function (error) {
            console.log(error);
        });
    };

    return (
        <form className="col-6" onSubmit={handleSubmit}>

            <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={emailInput} />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" ref={passwordInput} />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}