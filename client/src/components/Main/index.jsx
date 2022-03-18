import styles from "./styles.module.css";
import Notes from "../Notes/Notes.js"


const Main = (props) => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
	const {showAlert}=props
	return (
		<>
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>iNotebook</h1>
				{/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item"> */}
							<h1>Home</h1>
						{/* </li>
						<li className="nav-item">
							About
						</li>
				 </ul>
      		  </div> */}
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
		</div>
         <Notes showAlert={showAlert}/>
		</>
	);
};

export default Main;
