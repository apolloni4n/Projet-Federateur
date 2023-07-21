import React, { useEffect, useState } from "react";
import {isIP, isIPv4} from 'is-ip';

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
 
import axios from "axios";
function Newscan() {
  let datafetch=[];
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fetchedData, setFechedData] = useState([]);
  const [isfetchedData, setIsFechedData] = useState(false);
  const [datab, setDatab] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const [name, setname] = useState("");
  const [targets, settargets] = useState("");

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
  //Get User ID
  
  // Inseting a new user
  const new_scan = () => {
    function isip(targets){
      return  isIP(targets);
      
    }
    axios
      .post("http://localhost:9999/api/scans/upload", {
        name:name,
         targets: targets,
         scantime: Date.now(),userid:"63d6ae9512b9edb2feb763fd",
       
      }) 
   .then((res) => {
        fetchData();
        setFechedData(res);
        setIsPending(false);
        setDatab(res.data.datab);
        setIsFechedData(true);
      })
      .catch((err) => {
          console.log(err);
          });
  };

    
  let myScript = `127.0.0.1

  localhost
  
  80
  
  Apache/2.4.41 (Ubuntu)
  
  0
  
  /%2e/: Directory indexing found.
  
  /%2e/: Weblogic allows source code or directory listing, upgrade to v6.0 SP1 or higher. BID-2513.
  
  /./: Appending '/./' to a directory allows indexing
  
  /./: Directory indexing found.
  
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////: Abyss 1.03 reveals directory listing when     /'s are requested.
  
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////: Directory indexing found.
  
  ///: Directory indexing found.
  
  //: Apache on Red Hat Linux release 9 reveals the root directory listing by default if there is no index page.
  
  //: Directory indexing found.
  
  /: Directory indexing found.
  
  /?-s: Directory indexing found.
  
  /?D=A: Directory indexing found.
  
  /?M=A: Directory indexing found.
  
  /?N=D: Directory indexing found.
  
  /?Open: Directory indexing found.
  
  /?OpenServer: Directory indexing found.
  
  /?PageServices: Directory indexing found.
  
  /?PageServices: The remote server may allow directory listings through Web Publisher by forcing the server to show all files via 'open directory browsing'. Web Publisher should be disabled. CVE-1999-0269.
  /?S=A: Directory indexing found.
  /?\"><script>alert('Vulnerable');</script>: Directory indexing found.
  /?_CONFIG[files][functions_page]=http://cirt.net/rfiinc.txt?: Directory indexing found.
  /?mod=<script>alert(document.cookie)</script>&op=browse: Directory indexing found.
  /?mod=node&nid=some_thing&op=view: Directory indexing found.
  /?mod=some_thing&op=browse: Directory indexing found.
  /?npage=-1&content_dir=http://cirt.net/rfiinc.txt?%00&cmd=ls: Directory indexing found.
  /?npage=1&content_dir=http://cirt.net/rfiinc.txt?%00&cmd=ls: Directory indexing found.
  /?pattern=/etc/*&sort=name: Directory indexing found.
  /?show=http://cirt.net/rfiinc.txt??: Directory indexing found.
  /?sql_debug=1: Directory indexing found.
  /?wp-cs-dump: Directory indexing found.
  /?wp-cs-dump: The remote server may allow directory listings through Web Publisher by forcing the server to show all files via 'open directory browsing'. Web Publisher should be disabled. CVE-1999-0269.
  /server-status: This reveals Apache information. Comment out appropriate line in httpd.conf or restrict access to allowed hosts.
  Allowed HTTP Methods: GET, POST, OPTIONS, HEAD 
  The anti-clickjacking X-Frame-Options header is not present.
  53`;
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
         {/*  <WelcomeBanner />*/}

          

            {/* Table */}
            <div className="grid grid-cols-13 gap-7">
              <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
                <header className="px-5 py-4 border-b border-slate-100">
                  <h2 className="font-semibold text-slate-800">NEW SCAN</h2>
                </header>
                <form action="/upload"  method="post" className="container">
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
                        name="name"
                        value={name}
                        onChange={(e) => {
                          setname(e.target.value);
                        }}
                        required
                       
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="exampleInputEmail2" class="form-label">
                        Targets
                      </label>
                      <input
                        type="text"
                        class="form-control rounded"
                        id="exampleInputEmail2"
                        aria-describedby="emailHelp"
                        name="Targets"
                        value={targets}
                        onChange={(e) => {
                          settargets(e.target.value);
                        }}
                        required
                        
                      />
                    </div>
                  </div>  <button
                  id="btn"
                  type="button"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    setIsPending(true);
                    new_scan();

                    ```setTimeout( function () {
                      datafetch.push(dataToSend[0])
                    console.log({datafetch});
                  } ,50000 );```
                  }}
                  data-bs-dismiss="modal"
                >
                  Start scan
                </button></form>
                <div className="p-3">
                <div class="list">
                    <ul>
                        <li>  <div className="font-medium text-slate-800">
                      
                              </div></li>
                    </ul>
                    </div>
                </div>
              </div>
            </div>
            <br/>
               {/* Table */} <div style={{  float: "right" }} >
               <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                   <tbody className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
                       
                              <tr className="p-2 whitespace-nowrap">
                                  <div className="font-medium text-slate-800">
                                  Name: {isPending && <div>{name}</div>} 
                                </div>
                              </tr>
                             <tr className="p-2 whitespace-nowrap">
                                  <div className="font-medium text-slate-800">
                                  Status:  {isPending && <div>Running...</div>} {!isPending && <div>Completed</div>}
                                </div>
                              </tr>
                              <tr className="p-2 whitespace-nowrap">
                                  <div className="font-medium text-slate-800">
                                  Date:  <div>{Date()}</div> 
                                </div>
                              </tr>
                        
                      </tbody>
                      </table></div>s
                 <div className="grid grid-cols-13 gap-7">
            
            </div>         </div>

          
        </main>


        
        </div>

      </div>
  );
}

export default Newscan;
