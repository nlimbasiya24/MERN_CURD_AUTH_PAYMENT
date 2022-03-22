import React from "react";
import ReactDOM from "react-dom";
import { HashRouter,BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(
	<React.StrictMode>
		<HashRouter>
			<App />
		</HashRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
