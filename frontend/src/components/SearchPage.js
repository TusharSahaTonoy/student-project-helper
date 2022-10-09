import { useRef } from 'react'

export default function SearchPage() {
    let nameInput = useRef('');

    const handleSubmit = () => {
        console.log(nameInput.current.value);


    }

    return (
        <>
            <h3>Search Page</h3>
            <div className="row justify-content-center">
                <div className="col-8">
                    <div className="card">
                        <div className="card-body text-center">
                            <input type="text" className="form-control" id="name" ref={nameInput} />
                            <button type="button" className="btn btn-outline-success mt-2" onClick={handleSubmit}>Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
