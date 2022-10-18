import React from 'react'
import { useParams } from "react-router-dom";

export default function ProjectDetails() {
    let { id } = useParams();

    return (
        <section className="section">
            <div className="row align-items-top">
                <div>ProjectDetails id is : {id}</div>
                <div className="card">
                    <img src="/assets/img/card.jpg" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Card with an image on top</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's
                            content.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
