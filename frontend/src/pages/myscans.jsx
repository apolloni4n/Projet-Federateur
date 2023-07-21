import React, { useEffect, useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import DashboardAvatars from "../partials/dashboard/DashboardAvatars";
import FilterButton from "../partials/actions/FilterButton";
import Datepicker from "../partials/actions/Datepicker";
import DashboardCard10 from "../partials/dashboard/DashboardCard10";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function Myscans() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [scanname, setName] = useState("");
  const [targets, settarget] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [scanID, setscanID] = useState("");
  const [fetchedData, setFechedData] = useState([]);
  const [value, setValue] = React.useState('fruit');

  const handleChange = (event) => {
 
    setValue(event.target.value);
 
  };
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch Data Fuction
  const fetchData = () => {
    axios("http://localhost:9999/api/scans/")
      .then((res) => {
        setFechedData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //Get scan ID

  const getScanByID = (id) => {
    axios(`http://localhost:9999/api/scans/getScan/${id}`)
      .then((res) => {
        setName(res.data.name);
        settarget(res.data.targets);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const new_scan = (name,targets) => {
    function isip(targets){
      return  isIP(targets);
      
    }
    axios
      .post("http://localhost:9999/api/scans/upload", {
        name:name,
         targets: targets,
         scantime: Date.now(),
       
      }) 
   .then((res) => {
        fetchData();
        setFechedData(res);
      })
      .catch((err) => {
          console.log(err);
          });
  };
  // Inseting a new scan
  const newScan = () => {
    axios
      .post("http://localhost:9999/api/scans/newScan", {
        name: name,
        targets: targets,
        
      })
      .then((res) => {
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Updating scan
  const update_scan = () => {
    let data = {
      name:  name,
      targets:targets,
    };
    axios
      .patch(
        `http://localhost:9999/api/utilisateurs/updateScan/${scanID}`,
        data
      )
      .then((res) => fetchData())
      .catch((err) => console.log(err));
  };

  // Delete scan
  const delete_scan = (id) => {
    if (window.confirm("Are you sure you want to delete this Scan ?")) {
      axios
        .delete(`http://localhost:9999/api/scans/delete/${id}`)
        .then((res) => fetchData())
        .catch((err) => console.log(err));
    }
  };
  const export_scan = (id) => { 
    if (window.confirm("Are you sure you want to export this Scan ?")) {
     
      axios(`http://localhost:9999/api/scans/exportfile/${id}`)
      .then((res) => {//window.open(res.data.path, '_blank');
        setName(res.data.name);  
        settarget(res.data.targets);
      })
      .catch((err) => {
        console.log(err);
      });
    }

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
                  onClick={event =>  window.location.href='/newscan'}
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
                  <span className="hidden xs:block ml-2">Add scan</span>
                </button>
         
              </div>
            </div>

            {/* Table */}
            <div className="grid grid-cols-13 gap-7">
              <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
                <header className="px-5 py-4 border-b border-slate-100">
                  <h2 className="font-semibold text-slate-800">scanS</h2>
                </header>
                <div className="p-3">
                  {/* Table */}
                  <div className="overflow-hidden">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      {/* Table header */}
                      <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
                        <tr>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left"> Name</div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">IP</div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">Start time</div>
                          </th>
                        </tr>
                      </thead>
                      {/* Table body */}
                      <tbody className="text-sm divide-y divide-slate-100">
                        {fetchedData.map((scan) => {
                          return (
                            <tr key={scan._id}>
                              <td className="p-2 whitespace-nowrap">
                                  <div className="font-medium text-slate-800">
                                    {scan.name}
                                </div>
                              </td>
                             <td className="p-2 whitespace-nowrap">
                                  <div className="font-medium text-slate-800">
                                    {scan.targets}
                                </div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                  <div className="font-medium text-slate-800">
                                    {scan.scantime}
                                </div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <div className="text-lg text-center">
                                  {/* {scan.statu} */}
                                </div>
                                <td class="flex justify-center items-center space-x-2 mt-1">
                                  <button   className="px-4 py-2 text-white font-normal bg-black rounded-lg "
                                   onClick={() => {
                                    getScanByID(scan._id);
                                    /* export_scan(scan._id);*/
                                  }}
                               /*onClick={() => {
                                      getscanByID(scan._id);
                                    }}*/ 
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal5">
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
                                  <button   type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal5"
                                    className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                                    onClick={() => {
                                    new_scan(scan.name,scan.targets);
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
                                  <button
                                    className="px-4 py-2 text-white font-normal bg-red-600 rounded-lg"
                                    onClick={() => {
                                      delete_scan(scan._id);
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

        {/*Modal view */}
        
        {fetchedData.map((scan) => {
                          return (   <div
          class="modal fade"
          id="exampleModal5"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div  class="modal-dialog">
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
              <div > <label style = {{
        margin: '10px'}}  for="exampleInputEmail1" class="form-label">
                       Export
                      </label><br/>
              <select style = {{
        margin: '10px'}} value={value} onChange={handleChange}>


<option value="CSV">CSV</option>

<option value="PDF">PDF</option>

</select>
<button   className="px-4 py-2 text-white font-normal bg-black rounded-lg "
                                   onClick={() => {
                                    if({value}.value=="PDF"){  
                                   export_scan(scan._id);}
                                  }}
                                
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

   </div>
              <div class="modal-body">
                <form className="container">
                  <div className="my-2"></div>
                  <div className="row">
                    <div class="mb-3 col-md-6">
                      <label for="exampleInputEmail1" class="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        class="form-control rounded"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="datec"
                        value={scanname}
                        disabled
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="exampleInputEmail1" class="form-label">
                        IP
                      </label>
                      <input
                        type="text"
                        class="form-control rounded"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="datec"
                        value={targets}
                        disabled
                      />
                    </div>
                  </div>
                  </form>
              </div>
            </div>
          </div>
        </div>
       );
      })}
      </div>
    </div>
  );
}

export default Myscans;
