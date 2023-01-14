import React from 'react';
import { useState, useEffect , useHistory,useRef} from "react";
import Logo from '../assets/img/Jana-Small-Finance-logo4.jpg';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import Dashboard from './Dashboard';
import { useNavigate } from 'react-router-dom';
import { Outlet, Link } from "react-router-dom";
import { CommentsDisabledOutlined } from '@mui/icons-material';


function Login(props) {

	const [inputs, setInputs] = useState({});
	const [error, seterror] = useState();
	const userref = useRef();
	const passref = useRef();
	const Navigate = useNavigate()

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs(values => ({ ...values, [name]: value }))
	}

	const handleSubmit = async (event) => {

		event.preventDefault();		
		if(userref.current.value == ""){
			alert("Please Enter User Name")
			Navigate("/");
			return;
		}

		if(passref.current.value == ""){
			alert("Please Enter Password")
			Navigate("/");
			return;
		}

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				"username": inputs.username,
				"password": inputs.password
			})
		};
		await fetch('http://192.168.0.196:8090/login', requestOptions)
			.then(response => response.json())
			.then((response) => {
				// console.log(response.menu)
				// seterror(response);
				 if(response.errorMessage == 'Error'){
					alert(response.message)
					Navigate("/");
				 }
				 else{
					Navigate("/index",{state: response});
				 }
				//  Navigate("/index",{state: response});

				// console.log(error)				
			})

	}


	return (
		<>
			<div className="hero-img  login-page">		
				<div className="login-content">
					<div className='row h-100'>
						<div className="col-6 d-flex justify-content-center align-items-center h-100">
							<div className="card rounded  p-4 shadow-lg">
								<div className="text-center mb-4">
									<img className="" src={Logo} />
								</div>
								<form action="login" className="form" onSubmit={handleSubmit}>
									<div className=''></div>
									<div className="input-div one mt-3">
										<div className="i">
										<FontAwesomeIcon icon={faUser}/> 
										</div>
										<div className="div">
											<input type="text" className="form-control" id="username" name="username"
												autoComplete="off" maxLength="50" minlenght="1" placeholder="User Name"  ref={userref} value={inputs.username || ""}
												onChange={handleChange} />
										</div>
									</div>
									<div className="input-div pass mb-4">
										<div className="i">
										<FontAwesomeIcon icon={faLock}/> 
										</div>
										<div className="div">
											<input type="password" className="form-control" id="password"
												name="password" autoComplete="off" maxLength="30" minlenght="8" placeholder="Password" ref={passref} value={inputs.password || ""}
												onChange={handleChange} />
										</div>
									</div>
									<input type="submit" value="Login" className="btn text-center my-2" id="loginSubmit" >
									{/* <Link to={{pathname: "/index",state:  }} /> */}
									</input>									
								</form>

							</div>
						</div>
						<div className="col-6 d-flex justify-content-center align-items-center h-100">
						</div>
					</div>
				</div>
			</div>

		
		</>
	);
}

export default Login;