import styles from "./styles.module.css";
import Notes from "../Notes/Notes.js"
import React, { useState} from 'react';
import StripeCheckout from "react-stripe-checkout"
 



const Main = (props) => {
	const stripePromise=process.env.REACT_APP_SECRET_KEY
	//console.log(process.env);
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
	const {showAlert}=props
	const [product, setProduct] = useState({
		name:"React from FB",
		price:10,
		productBy:"Facebook"
	  });
	
	  const makePayment = token =>{
		const body = {
		  token,
		  product
		}
		const headers = {
		  "Content-Type":"application/json"
		}
	
		console.log("Nivid Limbasiya",body);
	   
		return fetch(`/api/gatway/payment`,{
		  method: "POST",
		  headers,
		  body:JSON.stringify(body)
	
		}).
		  then(response =>{
		  
		 console.log("RESPONSE",response)
		  
		 const {status}=response;
		  
		console.log("STATUS",status)
		})
		.catch(error => console.log(error))
	  }

	return (
		<>
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>iNotebook</h1>
				
							<h1>Home</h1>

							<StripeCheckout 
									stripeKey={stripePromise}
									token={makePayment}
									name="Buy React"
									amount={product.price * 100}
									shippingAddress
  									billingAddress
									>
									<button className="btn-large red">Buy react is just {product.price}</button>
      						</StripeCheckout>
						
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<Notes showAlert={showAlert}/>
		</div>
        
		</>
	);
};

export default Main;
