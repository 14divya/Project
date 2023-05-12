import React from 'react'
import { Link } from 'react-router-dom'

export default function Productlanding() {
    return (
        <React.Fragment>
            <div>
                <div className="logo">
                    <img src="assets/images/EAPL.png" height="30px" alt='...' />
                    <img src="assets/images/kruger.png" className="partner" alt='...' />
                </div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">About Us</a>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/products" tabIndex="-1" aria-disabled="true">Products</Link>
                                </li>
                            </ul>
                            <form className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" style={{ color: 'white', backgroundColor: 'coral' }} type="submit">Search</button>
                                <button className="btn btn-primary me-md-2 sign" style={{ width: '150px' }} type="button">Sign up</button>
                                <button className="btn btn-primary " style={{ width: '150px' }} type="button">Login</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
            <section className="divProduct">
                
            </section>
            
            <footer>
                <div className="container-fluid">EAPL&copy;Electronics Automation Private Limited</div>
            </footer>
        </React.Fragment>
    )
}
