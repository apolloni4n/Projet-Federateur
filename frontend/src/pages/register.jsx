import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header"
// import Login from "../components/Login"

export default function RegisterPage(){

    const [username, setUserName] = useState("");
    const [nom, setnom] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");
    const [birth, setBirth] = useState("");
    let navigate = useNavigate();

const register = () => {
    axios
      .post("http://localhost:9999/api/utilisateurs/addUser", {
        username: username,
        nom: nom,
        email: email,
        password1: password1, password2: password2,
        phone: phone,
        role: role,
        birth: birth,
      })
      .then((res) => { console.log("eeeeeeeee");
      navigate("/login", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return(
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
             
              <div class="modal-body">
                <form className="container">
                  <div className="my-2"></div>
                  <div className="row">
                    <div class="mb-3 col-md-6">
                      <label for="exampleInputEmail1" class="form-label">
                        Username
                      </label>
                      <input
                        type="text"
                        class="form-control rounded"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="username"
                        value={username}
                        onChange={(e) => {
                          setUserName(e.target.value);
                        }}
                        required
                       
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="exampleInputEmail1" class="form-label">
                        Nom
                      </label>
                      <input
                        type="text"
                        class="form-control rounded"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="Nom"
                        value={nom}
                        onChange={(e) => {
                          setnom(e.target.value);
                        }}
                        required
                        
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div class="mb-3 col-md-6">
                      <label for="exampleInputEmail1" class="form-label">
                        Day Of Birth
                      </label>
                      <input
                        type="Date"
                        class="form-control rounded"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="birth"
                        value={birth}
                        onChange={(e) => {
                          setBirth(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="exampleInputEmail1" class="form-label">
                        Role
                      </label>
                      <select  aria-label="Default select example" 
                        class="form-control rounded"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="role"
                        value={role}
                        onChange={(e) => {
                          setRole(e.target.value);
                        }}
                        required>
                          <option>Choose the Role</option>
                          <option value="Utilisateur">Utilisateur</option> 
        
                        </select>
                    </div>
                  </div>
                  <div className="row">
                    <div class="mb-3 col-md-6">
                      <label for="exampleInputEmail1" class="form-label">
                        Email
                      </label>
                      <input
                        type="text"
                        class="form-control rounded"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="exampleInputEmail1" class="form-label">
                        Phone
                      </label>
                      <input
                         type="text"
                         class="form-control rounded"
                         id="exampleInputEmail1"
                         aria-describedby="emailHelp"
                         name="phone"
                         value={phone}
                         onChange={(e) => {
                           setPhone(e.target.value);
                         }}
                         required
                      />
                    </div>
                  </div>
                  <div className="row">
                     <div class="mb-3 col-md-6">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control rounded" id="exampleInputPassword1" onChange={(e)=>{ setPassword1(e.target.value) }}/>
                    </div>
                  
                 
                  <div className="row">
                     <div class="mb-3 col-md-6">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control rounded" id="exampleInputPassword1" onChange={(e)=>{ setPassword2(e.target.value) }}/>
                    </div>
                  
                  </div> </div>
                </form>
              </div>
              <div class="modal-footer">
               
                <button
                  type="button"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    register();
                  }}
                  data-bs-dismiss="modal"
                >
                  Register
                </button>
             
          </div>
        </div>
)
}