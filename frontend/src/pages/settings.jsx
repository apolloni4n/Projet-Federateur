
 import React, { useEffect, useState } from "react";

 import Sidebar from "../partials/Sidebar";
 import Header from "../partials/Header";
 import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
 import DashboardAvatars from "../partials/dashboard/DashboardAvatars";
 import FilterButton from "../partials/actions/FilterButton";
 import Datepicker from "../partials/actions/Datepicker";
 import DashboardCard10 from "../partials/dashboard/DashboardCard10";
 
 import axios from "axios";
 
 function Settings() {
   const [sidebarOpen, setSidebarOpen] = useState(false);
 
   const [username, setUserName] = useState("");
   const [nom, setnom] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [role, setRole] = useState("");
   const [phone, setPhone] = useState("");
   const [date, setDate] = useState("");
   const [userID, setuserID] = useState("");
   const [fetchedData, setFechedData] = useState([]);
 
   useEffect(() => {
     fetchData();
   }, []);
 
   // Fetch Data Fuction
   const fetchData = () => {
     axios("http://localhost:9999/api/utilisateurs/")
       .then((res) => {
         setFechedData(res.data);
       })
       .catch((err) => {
         console.log(err);
       });
   };
   const update_user = () => {
    let data = {
      username: username,
      nom: nom,
      email: email,
      password: password,
      phone: phone,
      role: role,
      birth: date,
    };
    axios
      .patch(
        `http://localhost:9999/api/utilisateurs/updateUser/${userID}`,
        data
      )
      .then((res) => fetchData())
      .catch((err) => console.log(err));
  };

   
   return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Welcome banner */}
            <WelcomeBanner />

<div
tabIndex="-1"
aria-labelledby="exampleModalLabel"
aria-hidden="true"
>
<div >
  <div >
    <div >
      <h5 class="modal-title" id="exampleModalLabel">
        Update User
      </h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      >
        X
      </button>
    </div>
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
              value={date}
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
                <option value="Admin">Admin</option>
            <option value="User">User</option>

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
            <label for="exampleInputEmail1" class="form-label">
              Password
            </label>
            <input
              type="text"
              class="form-control rounded"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      
      <button
        type="button"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          update_user();
        }}
        data-bs-dismiss="modal"
      >
        Save changes
      </button>
    </div>
  </div>
</div>
</div></div></main></div></div>);
}

export default Settings;
