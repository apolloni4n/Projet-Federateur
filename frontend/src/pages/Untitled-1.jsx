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
        <h5 class="modal-title" id="exampleModalLabel">
          Add scan
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
              scan Name
            </label>
            <input
              type="text"
              class="form-control rounded"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="scanname"
              onChange={(e) => {
                setscanName(e.target.value);
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
            addscan();
          }}
          data-bs-dismiss="modal"
        >
          Save changes
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
          Update scan
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
                scanname
              </label>
              <input
                type="text"
                class="form-control rounded"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="scanname"
                value={scanname}
                onChange={(e) => {
                  setscanName(e.target.value);
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
            update_scan();
          }}
          data-bs-dismiss="modal"
        >
          Save changes
        </button>
      </div>
    </div>
  </div>
</div>
  {/*Modal view */}
        
  <div
  class="modal fade"
  id="exampleModal5"
  tabIndex="-1"
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
                scanname
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
</div>