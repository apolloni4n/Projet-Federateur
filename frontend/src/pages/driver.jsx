import React, { useEffect, useState } from "react";

import Sidebar from "../partials/Sidebar_dr";
import Header from "../partials/Header3";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import DashboardAvatars from "../partials/dashboard/DashboardAvatars";
import FilterButton from "../partials/actions/FilterButton";
import Datepicker from "../partials/actions/Datepicker";
import DashboardCard10 from "../partials/dashboard/DashboardCard10";

import axios from "axios";

function Driver() {
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

  

 

  // //Get User ID

  // const getUserByID = (id) => {
  //   axios(`http://localhost:5000/api/utilisateurs/getUser/${id}`)
  //     .then((res) => {
  //       setUserName(res.data.username);
  //       setnom(res.data.nom);
  //       setEmail(res.data.email);
  //       setPassword(res.data.password);
  //       setRole(res.data.role);
  //       setPhone(res.data.phone);
  //       setDate(res.data.birth);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // // Inseting a new user
  // const addUser = () => {
  //   axios
  //     .post("http://localhost:5000/api/utilisateurs/addUser", {
  //       username: username,
  //       nom: nom,
  //       email: email,
  //       password: password,
  //       phone: phone,
  //       role: role,
  //       birth: date,
  //     })
  //     .then((res) => {
  //       fetchData();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // //Updating User
  // const update_user = () => {
  //   let data = {
  //     username: username,
  //     nom: nom,
  //     email: email,
  //     password: password,
  //     phone: phone,
  //     role: role,
  //     birth: date,
  //   };
  //   axios
  //     .patch(
  //       `http://localhost:5000/api/utilisateurs/updateUser/${userID}`,
  //       data
  //     )
  //     .then((res) => fetchData())
  //     .catch((err) => console.log(err));
  // };

  // // Delete User
  // const delete_user = (id) => {
  //   if (window.confirm("Are you sure you want to delete this User ?")) {
  //     axios
  //       .delete(`http://localhost:5000/api/utilisateurs/delete/${id}`)
  //       .then((res) => fetchData())
  //       .catch((err) => console.log(err));
  //   }
  // };

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
          <h1 className="text-2xl md:text-3xl text-slate-800 font-bold mb-1">
                TRAITEMENT DES DEMANDES
              </h1>

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Avatars */}
              <DashboardAvatars />

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                <FilterButton />
                {/* Datepicker built with flatpickr */}
                <Datepicker />
                {/* Add view button */}
                {/* <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                >
                  <svg
                    className="w-4 h-4 fill-current opacity-50 shrink-0"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Add User</span>
                </button> */}
              </div>
            </div>

            {/* Table */}
            <div className="grid grid-cols-13 gap-7">
              <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
                <header className="px-5 py-4 border-b border-slate-100">
                  <h2 className="font-semibold text-slate-800">DEMANDES DANS LEURS ZONE</h2>
                </header>
                <div className="p-3">
                  {/* Table */}
                  <div className="overflow-hidden">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      {/* Table header */}
                      <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
                        <tr>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">NOM</div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">PRENOM</div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">DATE</div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">STATUS</div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">SEND</div>
                          </th>
                        </tr>
                      </thead>
                      {/* Table body */}
                      <tbody className="text-sm divide-y divide-slate-100">
                        {fetchedData.map((demand) => {
                          return (
                            <tr key={demand._id}>
                              <td className="p-2 whitespace-nowrap">
                                  <div className="font-medium text-slate-800">
                                    {demand.Patient.NomFamille}
                                </div>
                              </td>
                             <td className="p-2 whitespace-nowrap">
                                  <div className="font-medium text-slate-800">
                                    {demand.Patient.Prenom}
                                </div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <div className="text-left">{demand.DateCreation}</div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <div className={"text-left font-semibold mr-2 px-2.5 py-0.5 rounded "+ (demand.status == 'pending' ? 'bg-yellow-300 text-yellow-800' : '')+ (demand.status == 'sent' ? 'bg-green-100 text-green-800' : '')}>{demand.status}</div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <div className="text-left">
                                  <button onClick={() => {
                                    sendOrder(demand._id);
                                  }}>
                                    <span className="bg-green-600 text-green-100 text-sm font-semibold inline-flex items-center p-1.5 rounded">
                                      <svg aria-hidden="true" className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                      <span className="sr-only">Icon description</span>
                                    </span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Modal
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Add User
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      class="form-control rounded"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="nom"
                      onChange={(e) => {
                        setnom(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      User Name
                    </label>
                    <input
                      type="text"
                      class="form-control rounded"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="Username"
                      onChange={(e) => {
                        setUserName(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      class="form-control rounded"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Password
                    </label>
                    <input
                      type="text"
                      class="form-control rounded"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="email"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      class="form-control rounded"
                      id="exampleInputPassword1"
                      name="birth"
                      onChange={(e) => {
                        setDate(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Role</label>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      name="role"
                      onChange={(e) => {
                        setRole(e.target.value);
                      }}
                    >
                      <option>Choose the Role</option>
                      <option value="Doctor">Doctor</option>
                      <option value="Assistent">Assistent</option>
                      <option value="Labo Agent">Labo Agent</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">
                      Phone
                    </label>
                    <input
                      type="number"
                      class="form-control rounded"
                      id="exampleInputPassword1"
                      name="phone"
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                    />
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    addUser();
                  }}
                  data-bs-dismiss="modal"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div> */}

          {/* Modal update

          <div
          class="modal fade"
          id="exampleModal3"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
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
                          <option value="Doctor">Doctor</option>
                          <option value="Assistent">Assistent</option>
                          <option value="Labo Agent">Labo Agent</option>
        
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
                  class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
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
        </div> */}

        {/*Modal view */}
        
        {/* <div
          class="modal fade"
          id="exampleModal5"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  View Informations
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
                        name="datec"
                        value={username}
                        disabled
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="exampleInputEmail1" class="form-label">
                        Full Name
                      </label>
                      <input
                        type="text"
                        class="form-control rounded"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="datec"
                        value={nom}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div class="mb-3 col-md-6">
                      <label for="exampleInputEmail1" class="form-label">
                        Day Of Birth
                      </label>
                      <input
                        type="date"
                        class="form-control rounded"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="datec"
                        value={date}
                        disabled
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="exampleInputEmail1" class="form-label">
                        Role
                      </label>
                      <input
                        type="text"
                        class="form-control rounded"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="datec"
                        value={role}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div class="mb-3 col-md-6">
                      <label for="exampleInputEmail1" class="form-label">
                        Adress Mail
                      </label>
                      <input
                        type="text"
                        class="form-control rounded"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="datec"
                        value={email}
                        disabled
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
                        name="datec"
                        value={phone}
                        disabled
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
                        name="datec"
                        value={password}
                        disabled
                      />
                    </div>
                  
              </div>
                  
                </form>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Driver;
