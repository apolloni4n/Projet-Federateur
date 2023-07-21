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

function Rapports() {
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
    axios("http://localhost:9999/api/rapports/")
      .then((res) => {
        setFechedData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //Get scan ID
 
  {fetchedData.map((rapports) => { return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
        
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Welcome banner */}
            <WelcomeBanner />
            Scan All Ports, Ranges of IP Addresses, Download reports and more

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
                  <span className="hidden xs:block ml-2">New scan</span>
                </button>
         
              </div>
            </div>

            {/* Table */}
            <div className="grid grid-cols-13 gap-7">
              <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
                <header className="px-5 py-4 border-b border-slate-100">
                  <h2 className="font-semibold text-slate-800">Scanners</h2>
                </header>
                <div className="p-3">
                  {/* Table */}
                  <div className="overflow-hidden">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      {/* Table header */}
                      <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
                        <tr>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left"> {rapports.name}</div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">Scanner Type</div>
                          </th>
                           
                        </tr>
                      </thead>
                      {/* Table body */}
                      <tbody className="text-sm divide-y divide-slate-100">
                      <tr>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left"> Nmap</div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">Network</div>
                          </th>
                           
                        </tr>
                        <tr>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left"> Nikto</div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">Web</div>
                          </th>
                           
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

   
      </div>
    </div>
  );  })}
}

export default Rapports;
