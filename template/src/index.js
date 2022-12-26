import React from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./pages/App";
import "./index.css";

const root = ReactDOMClient.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
