import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import Image01 from "../../images/user-36-05.jpg";
import Image02 from "../../images/user-36-06.jpg";
import Image03 from "../../images/user-36-07.jpg";
import Image04 from "../../images/user-36-08.jpg";
import Image05 from "../../images/user-36-09.jpg";
import axios from "axios";

function DashboardCard10() {
  const [fetchedData, setFechedData] = useState([])

  useEffect(()=>{
    fetchData();
  },[])

  // Fetch Data Fuction
  const fetchData = () => {
    axios("http://localhost:9999/api/utilisateurs/")
    .then((res)=>{ setFechedData(res.data)})
    .catch((err)=>{ console.log(err)})
  }
  const users = [
    {
      id: "0",
      image: Image01,
      name: "Alex Shatov",
      email: "alexshatov@gmail.com",
      location: "Maroc",
      Naissance: "18-08-1988",
      Number: "0606077726",
    },
    {
      id: "1",
      image: Image02,
      name: "Philip Harbach",
      email: "philip.h@gmail.com",
      location: "Maroc",
      Naissance: "01-01-1990",
      Number: "0606077726",
    },
    {
      id: "2",
      image: Image03,
      name: "Mirko Fisuk",
      email: "mirkofisuk@gmail.com",
      location: "Maroc",
      Naissance: "19-09-1992",
      Number: "0606077726",
    },
    {
      id: "3",
      image: Image04,
      name: "Olga Semklo",
      email: "olga.s@cool.design",
      location: "Maroc",
      Naissance: "03-05-1989",
      Number: "0606077726",
    },
    {
      id: "4",
      image: Image05,
      name: "Burak Long",
      email: "longburak@gmail.com",
      location: "Maroc",
      Naissance: "18-04-1979",
      Number: "0606077726",
    },
    {
      id: "5",
      image: Image05,
      name: "Burak Long",
      email: "longburak@gmail.com",
      location: "Maroc",
      Naissance: "20-13-1980",
      Number: "0606077726",
    },
  ];

  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">USERS</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-hidden">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">
                    Date de Naissance
                  </div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Role</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Numero</div>
                </th>

                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Statu</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100">
              {fetchedData.map((user) => {
                return (
                  <tr key={user._id}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        {/* <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                          <img
                            className="rounded-full"
                            // src={user.image}
                            width="40"
                            height="40"
                            alt={user.nom}
                          />
                        </div> */}
                        <div className="font-medium text-slate-800">
                          {user.nom}
                        </div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{user.email}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left font-medium text-green-500">
                        {user.birth}
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-lg text-center">
                        {user.role}
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-lg text-center">
                        {user.phone}
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-lg text-center">
                        {/* {user.statu} */}
                      </div>
                      <td class="flex justify-center items-center space-x-2 mt-1">
                        <button className="px-4 py-2 text-white font-normal bg-black rounded-lg ">
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
                        <button className="px-4 py-2 text-white font-normal bg-blue-600 rounded-lg">
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
                        <button className="px-4 py-2 text-white font-normal bg-red-600 rounded-lg">
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
  );
}

export default DashboardCard10;
