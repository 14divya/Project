import React from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
  return (
    <React.Fragment>
      <div>
        <div class="logo">
            <img src="assets/images/EAPL.png" height="30px" alt="..."/>
            <img src="assets/images/kruger.png" class="partner" alt="..."/>
        </div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <Link class="nav-link" aria-current="page" to="/">Home</Link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">About Us</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" tabindex="-1" aria-disabled="true">Products</a>
                        </li>
                    </ul>
                    <form class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button class="btn btn-outline-success" style={{color: 'white',backgroundColor:'coral'}} type="submit">Search</button>
                        <button class="btn btn-primary me-md-2 sign" style={{width: '150px'}} type="button"
                            onclick="signup()">Sign up</button>
                        <button class="btn btn-primary " style={{width: '150px'}} type="button">Login</button>
                    </form>
                </div>
            </div>
        </nav>
        {/* <script>
            function displayMessageReset() {
                alert("Alert! You Have Clicked On Reset Button, Please Fill Your Data Again");
            }
        </script> */}
    </div>
    <section class="section1">
        <div class="box">
            <div class="form1">
                <div>
                    <h3>EAPL</h3>
                </div>
                <h2>SignUp</h2>
                <form action="admin.html">
                    <div class="inputBox">
                        <input type="text" placeholder="Username" required pattern="[a-zA-Z0-9]+"
                            title="Only AlphaNumeric Characters Allowed"/>

                    </div>
                    <div class="inputBox">
                        <input type="text" placeholder="Email Id" required
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"/>

                    </div>
                    <div class="inputBox">
                        <input type="password" placeholder="Password" id="pass" required
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&]).{8,16}"
                            title="Must contain at least one number, one uppercase letter, one lowercase letter, one special character, and length should be minimum 8 and maximum 16 characters"/>
                    </div>
                    <label class="remember"><input type="checkbox"/>Remember Me</label>
                    <div class="inputBox">
                        <input class="btn" type="submit" value="SignUp"/>
                    </div>
                </form>
                <p>Have an <a class="loginBtn" href="login.html">Account</a>?</p>
            </div>
        </div>
    </section>
<footer>
    <div class="container-fluid">EAPL&copy;Electronics Automation Private Limited</div>
</footer>
    </React.Fragment>
  )
}
