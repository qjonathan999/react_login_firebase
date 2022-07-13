import {Routes,Route} from "react-router-dom"
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import AuthProvider from "./context/authContext";
import { ProtectedRout } from "./Components/ProtectedRoute";

function App() {
  return (
    <div className="bg-gray-300 h-screen text-blue-600">
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
