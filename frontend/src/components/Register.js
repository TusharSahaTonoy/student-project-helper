import axios from "axios";
import React, { useRef } from 'react'
import { useNavigate } from "react-router-dom";

export default function Register() {

    let nameInput = useRef('');
    let emailInput = useRef('');
    let passwordInput = useRef('');
    let typeSelect = useRef('');
    let navigate = useNavigate();
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [type, setType] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // axios POST request
        axios.post('http://localhost:6500/register', {
            name: nameInput.current.value,
            email: emailInput.current.value,
            password: passwordInput.current.value,
            type: typeSelect.current.value
        }).then(function (response) {
            if (response.data._id) {
                navigate('/home');
            }
            // console.log(response.data);

        }).catch(function (error) {
            console.log(error);
        });

        // const options = {
        //     url: 'http://localhost:6500/register',
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json;charset=UTF-8'
        //     },
        //     data: {
        //         name: 'David',
        //         age: 45
        //     }
        // };

        // axios(options)
        //     .then(response => {
        //         console.log(response.status);
        //     });

        // console.log(emailInput.current.value, passwordInput.current.value, typeSelect.current.value);
    }

    return (
        <form className="col-6" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" ref={nameInput} />
            </div>
            <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={emailInput} />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" ref={passwordInput} />
            </div>

            <div className="mb-3">
                <label htmlFor="disabledSelect" className="form-label">Disabled select menu</label>
                <select defaultValue={''} id="disabledSelect" className="form-select" ref={typeSelect}>
                    <option value={''}>Disabled select</option>
                    <option value={'dev'}>Dev</option>
                    <option value={'student'}>Student</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}
