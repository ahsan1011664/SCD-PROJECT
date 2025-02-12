import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import LoggedInRoutes from "./LoggedInRoutes";
import LoggedOutRoutes from "./LoggedOutRoutes";
import { ToastContainer } from "react-toastify";

function App() {
  
  const [token, setToken] = useState(localStorage.getItem("accessToken"));

  useEffect(() => {

      const checkTokenExpiration = () => {

        const storedToken = localStorage.getItem("accessToken");
        if (!storedToken) return;

        try {
          const tokenPayload = JSON.parse(atob(storedToken.split(".")[1])); 
          const currentTime = Math.floor(Date.now() / 1000); 

          if (tokenPayload.exp < currentTime) {
            localStorage.removeItem("accessToken");
            setToken(null); 
            window.location.href = "/"; 
          }
          } catch (error) {
          console.error("Invalid token format.");
          localStorage.removeItem("accessToken");
          setToken(null);
        }
      };

    checkTokenExpiration(); 
    const interval = setInterval(checkTokenExpiration, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <Router>
        {token ? <LoggedInRoutes token={token} /> : <LoggedOutRoutes />}
      </Router>
    </>
  );
}

export default App;
