import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routers from "./routers";
import { AuthProvider } from "./context/auth";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
