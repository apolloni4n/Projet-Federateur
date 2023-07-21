import React, { useEffect, useState } from "react";

import Sidebar from "../partials/Sidebar_user";
import Header from "../partials/Header2";
import DashboardAvatars from "../partials/dashboard/DashboardAvatars";
import FilterButton from "../partials/actions/FilterButton";
import Datepicker from "../partials/actions/Datepicker";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from "react-router-dom";

import axios from "axios";

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [nomPatient, setNomPatient] = useState("");
  const [prenomPatient, setPrenomPatient] = useState("");
  const [birth, setBirth] = useState("");
  const [adress, setAdress] = useState("");
  const [sexe, setSex] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [cin, setCin] = useState("");
  const [DateCreation, setDateCreation] = useState("");
  const [typeAnalyse, setTypeAnalyse] = useState("");
  const [fetchedData, setFechedData] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [demandeID, setDemandeID] = useState("");
  const notify = () => toast("Sent Successefully!");

  useEffect(() => {
    fetchData();
  }, []);
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
              <h1 className="text-2xl md:text-3xl text-slate-800 font-bold mb-1">
              BIENVENUE UTILISATEUR
              </h1>
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
                  <span className="hidden xs:block ml-2">Ajouter Demande</span>
                </button> */}
              </div>
            </div>

            {/* Table */}
            <div className="grid grid-cols-13 gap-7">
              <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
             
                <header className="px-5 py-4 border-b border-slate-100">
                  <h2 className="font-semibold text-slate-800">DEMANDES</h2>
                </header>
                <div className="p-3">
                  {/* Table */}
                  <div className="overflow-hidden">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      {/* Table header */}
                      <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
                        <tr>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">
                              Nom de patient
                            </div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">
                              Prenom de patient
                            </div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">
                              Date de Creation
                            </div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-center">
                              Type de demande
                            </div>
                          </th>

                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-center">
                              Statut
                            </div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-center">
                              Etat
                            </div>
                          </th>
                        </tr>
                      </thead>
                      {/* Table body */}
                      <tbody className="text-sm divide-y divide-slate-100">
                        {fetchedData.map((demande) => {
                          return (
                            <tr key={demande._id}>
                              <td className="p-2 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="font-semibold text-slate-800 text-center">
                                    {demande.Patient.Prenom}
                                   
                                  </div>
                                </div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="font-semibold text-slate-800 text-center">
                                    <div className="text-left">
                                      {demande.Patient.NomFamille}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-slate-800 text-center">
                                  {demande.DateCreation}
                                </div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-slate-800 text-center">
                                  {demande.typeAnalyse}
                                </div>
                              </td>

                              <td className="p-2 whitespace-nowrap">
                                <div className="text-lg text-center">
                                  {/* {user.statu} */}
                                </div>
                                <td class="flex justify-center items-center space-x-2 mt-1">
                                  <button
                                    className="px-4 py-2 text-white font-normal bg-black rounded-lg "
                                    onClick={() => {
                                      getDemandeByID(demande._id);
                                    }}
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal2"
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
                                  <button
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                                    onClick={() => {
                                      getDemandeByID(demande._id);
                                      setDemandeID(demande._id);
                                    }}
                                  >
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
                                  <button
                                    className="px-4 py-2 text-white font-normal bg-red-600 rounded-lg"
                                    onClick={() => {
                                      delete_demande(demande._id);
                                    }}
                                  >
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
                              <td className="p-2 whitespace-nowrap">
                               



                                <div className="text-lg text-center">
                                {/* <Alert color="primary" dismissible visible={visible} onClose={() => setVisible(false)}>A simple primary alert—check it out!</Alert> */}
                                  <button type="submit" className="px-4 py-2 text-white font-normal bg-black rounded-lg "
                                  onClick={notify}
                               >
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
                                        d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                                      />
                                    </svg>
                                  </button>
                                  <ToastContainer />
                                  
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

        {/* Modal  UPDATE DEMANDE*/}
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
                <h5 class="modal-title" id="exampleModalLabel">
                  Mettre a jour Demande
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
                      value={DateCreation}
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
                      value={typeAnalyse}
                      onChange={(e) => {
                        setTypeAnalyse(e.target.value);
                      }}
                      required
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
                  Fermer
                </button>
                <button
                  type="button"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    update_demande();
                  }}
                  data-bs-dismiss="modal"
                >
                  
Sauvegarder les modifications
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* View modal*/}
        <div
          class="modal fade"
          id="exampleModal2"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Voir les informations
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
                        Nom de patient
                      </label>
                      <input
                        type="text"
                        class="form-control rounded"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="datec"
                        value={nomPatient}
                        disabled
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
                        name="datec"
                        value={prenomPatient}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div class="mb-3 col-md-6">
                      <label for="exampleInputEmail1" class="form-label">
                        Date de naissance
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
                        Numero de telephone
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
                  <div className="my-2">
                    <hr />
                  </div>
                  <div class="mb-3 mt-4">
                    <label for="exampleInputEmail1" class="form-label">
                      Date De Creation
                    </label>
                    <input
                      type="date"
                      class="form-control rounded"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="type"
                      value={DateCreation}
                      onChange={(e) => {
                        setDateCreation(e.target.value);
                      }}
                      disabled
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
                      value={typeAnalyse}
                      onChange={(e) => {
                        setTypeAnalyse(e.target.value);
                      }}
                      disabled
                    />
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

export default Home;