import React, { useEffect, useState } from "react";

import Sidebar from "../partials/Sidebar_user";
import Header from "../partials/Header2";
import DashboardAvatars from "../partials/dashboard/DashboardAvatars";
import FilterButton from "../partials/actions/FilterButton";
import Datepicker from "../partials/actions/Datepicker";

import axios from "axios";



function Patient() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [NomFamille, setNomFamille] = useState("")
  const [Prenom, setPrenom] = useState("");
  const [birth, setBirth] = useState("")
  const [adress, setAdress] = useState("")
  const [sexe,setSex]=useState("")
  const [phone,setPhone]=useState("")
  const [age,setAge]=useState("")
  const [cin,setCin]=useState("")
  const [fetchedData, setFechedData] = useState([])
  const [demande , setDemande] = useState(false)
  const [DateCreation, setDateCreation] = useState("");
  const [typeAnalyse, setTypeAnalyse] = useState("");
  const [patientID, setPatientID] = useState("")

  useEffect(()=>{
    fetchData();
  },[])

  // Fetch Data Fuction
  const fetchData = () => {
    axios("http://localhost:5000/api/patients")
    .then((res)=>{ setFechedData(res.data)})
    .catch((err)=>{ console.log(err)})
  }

  // Inseting a new demande
  const addPatient =()=>{
    let data = {
        NomFamille:NomFamille,
        Prenom:Prenom,
        birth:birth,
        adress:adress,
        phone:phone,
        age:age,
        sexe:sexe,
        cin:cin

    }
    axios.post("http://localhost:5000/api/patients/addPatient", data)
    .then((res)=>{ fetchData() })
    .catch((err)=>{ console.log(err)})
  
  }

  //GET PATIENT BY ID

  const getPatientByID = (id) => {
    axios(`http://localhost:5000/api/patients/getPatient/${id}`)
      .then((res) => {
       
        setNomFamille(res.data.NomFamille);
        setPrenom(res.data.Prenom);
        setBirth(res.data.birth);
        setAdress(res.data.adress);
        setSex(res.data.sexe);
        setPhone(res.data.phone);
        setAge(res.data.age);
        setCin(res.data.cin);
      })
      .catch((err) => {
        console.log(err);
      });
  };

    // Inseting a new demande
  const addDemande = () => {
    let data = {
      Patient: patientID,
      DateCreation: DateCreation,
      typeAnalyse: typeAnalyse,
    };
    axios
      .post("http://localhost:5000/api/demandes/addDemande", data)
      .then((res) => {
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

 // Delete function
  const delete_patient = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce patient ?")){

      axios.delete(`http://localhost:5000/api/patients/delete/${id}`)
      .then(res => fetchData())
      .catch(err=> console.log(err))

    }
  }


  //Update patient
  const update_patient = () => {
    let data = {
      NomFamille:NomFamille,
      Prenom:Prenom,
      birth:birth,
      adress:adress,
      phone:phone,
      age:age,
      sexe:sexe,
      cin:cin
    };
    axios
      .patch(
        `http://localhost:5000/api/patients/updatePatient/${patientID}`,
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
            <div className="relative">
        <h1 className="text-2xl md:text-3xl text-slate-800 font-bold mb-1">BIENVENUE UTILISATEUR</h1>
      </div>

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
                <button
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
                  <span className="hidden xs:block ml-2">Ajouter Patient</span>
                </button>
              </div>
            </div>

              {/* Table */}
            <div className="grid grid-cols-13 gap-7">
              <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
                <header className="px-5 py-4 border-b border-slate-100">
                  <h2 className="font-semibold text-slate-800">Patients</h2>
                </header>
                <div className="p-3">
                  {/* Table */}
                  <div className="overflow-hidden">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      {/* Table header */}
                      <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
                        <tr>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">Nom Famille</div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">Prenom</div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">Date de Naissance</div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">
                            Adresse
                            </div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-center">Numero de telephone</div>
                          </th>

                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-center">Statu</div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-center">Ajouter Demande</div>
                          </th>
                        
                        </tr>
                      </thead>
                      {/* Table body */}
                      <tbody className="text-sm divide-y divide-slate-100">
                        {fetchedData.map((patient) => {
                          return (
                            <tr key={patient._id}>
                              <td className="p-2 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="font-semibold text-slate-800 text-center">
                                    {patient.NomFamille}
                                  </div>
                                </div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-slate-800 text-center">{patient.Prenom}</div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-slate-800 text-center">
                                  {patient.birth}
                                </div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-slate-800 text-center">
                                  {patient.adress}
                                </div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-slate-800 text-center">
                                  {patient.phone}
                                </div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-slate-800 text-center">
                                  {/* {user.statu} */}
                                </div>
                                <td class="flex justify-center items-center space-x-2 mt-1">
                                <button
                                    className="px-4 py-2 text-white font-normal bg-black rounded-lg "
                                    onClick={() => {
                                      getPatientByID(patient._id);
                                    }}
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal4"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-6 w-6"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                      />
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                      />
                                    </svg>
                                  </button>
                                  <button type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal3"
                                    className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                                    onClick={() => {
                                      getPatientByID(patient._id);
                                      setPatientID(patient._id);
                                    }}>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      class="h-6 w-6"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      stroke-width="2"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                      />
                                    </svg>
                                  </button>
                                  <button className="px-4 py-2 text-white font-normal bg-red-600 rounded-lg" onClick={()=>{delete_patient(patient._id)}}>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      class="h-6 w-6"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      stroke-width="2"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                      />
                                    </svg>
                                  </button>
                                  

                                </td>
                              </td>
                              <td>
                                <button
                                  type="button"
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal"
                                  className="btn bg-indigo-800 hover:bg-indigo-800 text-white"
                                  onClick={()=>{
                                    setDemande(true);
                                    setPatientID(patient._id)
                                  }}
                                >
                                  <svg
                                    className="w-4 h-4 fill-current opacity-50 shrink-0"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                                  </svg>
                                  <span className="hidden xs:block ml-2">Ajouter Demande</span>
                                </button>
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

        {/* Modal */}
        <div
          class="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                {
                  demande === false ?(
                    <h5 class="modal-title" id="exampleModalLabel">
                      Ajouter Patient
                    </h5>
                  ) : (
                    <h5 class="modal-title" id="exampleModalLabel">
                      Ajouter Demande
                    </h5>
                  )
                }
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >X</button>
              </div>
              <div class="modal-body">
                
              <div>
                {
                  demande === false ? (
                    <div>
                      <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Nom de famille</label>
                        <input type="text" class="form-control rounded" id="exampleInputEmail1" aria-describedby="emailHelp" name="nom" onChange={(e)=>{ setNomFamille(e.target.value) }} required/>
                      </div>
                      <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Prenom </label>
                        <input type="text" class="form-control rounded" id="exampleInputEmail1" aria-describedby="emailHelp" name="prenom" onChange={(e)=>{ setPrenom(e.target.value) }} required/>
                      </div>
                      <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Date de Naissance</label>
                        <input type="date" class="form-control rounded" id="exampleInputEmail1" aria-describedby="emailHelp" name="datec" onChange={(e)=>{setBirth(e.target.value) }} required/>
                      </div>
                      <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Adress</label>
                        <input type="text" class="form-control rounded" id="exampleInputEmail1" aria-describedby="emailHelp" name="type" onChange={(e)=>{ setAdress(e.target.value) }} required/>
                      </div>
                      <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Age</label>
                        <input type="text" class="form-control rounded" id="exampleInputEmail1" aria-describedby="emailHelp" name="type" onChange={(e)=>{ setAge(e.target.value) }} />
                      </div>

                      <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Numero de telephone</label>
                        <input type="text" class="form-control rounded" id="exampleInputEmail1" aria-describedby="emailHelp" name="type" onChange={(e)=>{ setPhone(e.target.value) }} required/>
                      </div>
                      <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">CIN</label>
                        <input type="text" class="form-control rounded" id="exampleInputEmail1" aria-describedby="emailHelp" name="type" onChange={(e)=>{ setCin(e.target.value) }} />
                      </div>

                      <div class="mb-3">
                        <label class="form-label">Sexe</label>
                        <select class="form-select" aria-label="Default select example" name="sexe" onChange={(e)=>{ setSex(e.target.value) }}>
                          <option>Choose the Sexe</option>
                          <option value="Femme">Femme</option>
                          <option value="Homme">Homme</option>
        
                        </select>
                      </div> 
                    </div>
                  ):(
                    <div>
                     <form>
                        <div class="mb-3">
                          <label for="exampleInputEmail1" class="form-label">
                            Date de Creation
                          </label>
                          <input
                            type="date"
                            class="form-control rounded"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            name="datec"
                            onChange={(e) => {
                              setDateCreation(e.target.value);
                            }}
                            required
                          />
                        </div>
                        <div class="mb-3">
                          <label for="exampleInputEmail1" class="form-label">
                            Type de demande
                          </label>
                          <input
                            type="text"
                            class="form-control rounded"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            name="type"
                            onChange={(e) => {
                              setTypeAnalyse(e.target.value);
                            }}
                            required
                          />
                        </div>
                      </form>
                    </div>
                  )
                }
                
              </div>

              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  data-bs-dismiss="modal"
                  onClick={()=>{
                    setDemande(false);
                    setAdress("");
                    setAge("");
                    setBirth("")
                    setCin("")
                    setDateCreation("")
                  }}
                >
                 Fermer
                </button>
                <button type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>{ demande === false ? addPatient() : addDemande() }} data-bs-dismiss="modal">
                 
Sauvegarder les modifications
                </button>
              </div>
            </div>
          </div>
        </div>

        {/*Modal update */}

        <div
          class="modal fade"
          id="exampleModal3"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                Mettre à jour les informations de patient                </h5>
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
                        Nom de patient
                      </label>
                      <input
                        type="text"
                        class="form-control rounded"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="NomFamille"
                        value={NomFamille}
                        onChange={(e) => {
                          setNomFamille(e.target.value);
                        }}
                        required
                       
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="exampleInputEmail1" class="form-label">
                        Prenom de patient
                      </label>
                      <input
                        type="text"
                        class="form-control rounded"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="prenom"
                        value={Prenom}
                        onChange={(e) => {
                          setPrenom(e.target.value);
                        }}
                        required
                        
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div class="mb-3 col-md-6">
                      <label for="exampleInputEmail1" class="form-label">
                       Date de Naissance
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
                        Sexe
                      </label>
                      <select  aria-label="Default select example" 
                        class="form-control rounded"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="sexe"
                        value={sexe}
                        onChange={(e) => {
                          setSex(e.target.value);
                        }}
                        required>
                          <option>Choose the Sexe</option>
                          <option value="Femme">Femme</option>
                          <option value="Homme">Homme</option>
        
                        </select>
                    </div>
                  </div>
                  <div className="row">
                    <div class="mb-3 col-md-6">
                      <label for="exampleInputEmail1" class="form-label">
                        Adresse
                      </label>
                      <input
                        type="text"
                        class="form-control rounded"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="cin"
                        value={adress}
                        onChange={(e) => {
                          setAdress(e.target.value);
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
                         name="cin"
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
                        Age
                      </label>
                      <input
                        type="text"
                        class="form-control rounded"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="cin"
                        value={age}
                        onChange={(e) => {
                          setAge(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="exampleInputEmail1" class="form-label">
                        Cin
                      </label>
                      <input
                         type="text"
                         class="form-control rounded"
                         id="exampleInputEmail1"
                         aria-describedby="emailHelp"
                         name="cin"
                         value={cin}
                         onChange={(e) => {
                           setCin(e.target.value);
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
                  Fermer
                </button>
                <button
                  type="button"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    update_patient();
                  }}
                  data-bs-dismiss="modal"
                >
                  Sauvegarder les modifications
                </button>
              </div>
            </div>
          </div>
        </div>

        {/*Modal view */}
        
        <div
          class="modal fade"
          id="exampleModal4"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                Affichage des informations
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
                        Nom de Patient
                      </label>
                      <input
                        type="text"
                        class="form-control rounded"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="datec"
                        value={NomFamille}
                        disabled
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="exampleInputEmail1" class="form-label">
                       Prenom de Patient
                      </label>
                      <input
                        type="text"
                        class="form-control rounded"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="datec"
                        value={Prenom}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div class="mb-3 col-md-6">
                      <label for="exampleInputEmail1" class="form-label">
                        Date de Naissance
                      </label>
                      <input
                        type="date"
                        class="form-control rounded"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="datec"
                        value={birth}
                        disabled
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="exampleInputEmail1" class="form-label">
                        Sexe
                      </label>
                      <input
                        type="text"
                        class="form-control rounded"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="datec"
                        value={sexe}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div class="mb-3 col-md-6">
                      <label for="exampleInputEmail1" class="form-label">
                        Adresse
                      </label>
                      <input
                        type="text"
                        class="form-control rounded"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="datec"
                        value={adress}
                        disabled
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="exampleInputEmail1" class="form-label">
                        Numéro de téléphone
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
                        Age
                      </label>
                      <input
                        type="number"
                        class="form-control rounded"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="datec"
                        value={age}
                        disabled
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="exampleInputEmail1" class="form-label">
                        Cin
                      </label>
                      <input
                        type="text"
                        class="form-control rounded"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="datec"
                        value={cin}
                        disabled
                      />
                    </div>
                  </div>
                  
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Patient;