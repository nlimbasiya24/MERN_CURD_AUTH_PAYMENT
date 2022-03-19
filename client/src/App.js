import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import EmailVerify from "./components/EmailVerify";
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";
import NoteState from "./context/NoteState"
import { useState } from "react";
import  Alert from "./components/Alert/Alert";


function App() {
	const [alert,setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    })
    setTimeout(()=>{
        setAlert(null);
    },3000);
  }
	const user = localStorage.getItem("token");
	return (
		<>
		<NoteState>
		<Routes>
			{user && <Route path="/" exact element={<Main showAlert={showAlert} />} />}
			<Route path="/signup" exact element={<Signup/>} />
			<Route path="/login" exact element={<Login/>} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/users/:id/verify/:token" element={<EmailVerify />} />
			<Route path="/forgot-password" element={<ForgotPassword />} />
			<Route path="/password-reset/:id/:token" element={<PasswordReset />} />
		</Routes>
		<Alert alert={alert}/>
		
		</NoteState>
		</>
	);
}

export default App;
