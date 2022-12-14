
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Projects() {

    const [programs, setPrograms] = useState([]);
    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_URL + "/projects").then((res) => {
            // console.log(process.env);
            // console.log(res);
            setPrograms(res.data);
        });
    }, []);

    let nameInput = useRef('');
    let priceInput = useRef('');
    let navigate = useNavigate();

    const [selectedFile, setSelectedFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append('name', nameInput.current.value,);
        formData.append('price', priceInput.current.value,);

        axios.post(process.env.REACT_APP_BACKEND_URL + "/project/add", formData).then(function (response) {
            if (response.data._id) {
                navigate('/home');
            }
            console.log(response.data);

        }).catch(function (error) {
            console.log(error);
        });
    };

    const handleFileSelect = (e) => {
        setSelectedFile(e.target.files[0])
        // console.log(selectedFile);
    }

    return (<>
        <div className="row">
            {programs.map((item) => {
                return (
                    <div key={item._id} className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">Price: {item.price}</p>
                                <Link to={'/projects/' + item._id} className="btn btn-primary" > Go somewhere </Link>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
        <div className="row">
            <form className="col-6" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" ref={nameInput} />
                </div>

                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price ($)</label>
                    <input type="number" className="form-control" id="price" ref={priceInput} />
                </div>

                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Project Image</label>
                    <input type="file" className="form-control" id="image" onChange={handleFileSelect} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    </>);
}