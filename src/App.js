import {Routes,Route} from "react-router-dom"
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import AuthProvider from "./context/authContext";
import { ProtectedRout } from "./Components/ProtectedRoute";

function App() {
  return (
    <div className="h-screen align-items:center bg-sky-300">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<ProtectedRout><Home/></ProtectedRout>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
