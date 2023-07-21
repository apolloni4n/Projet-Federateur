import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header"
// import Login from "../components/Login"

export default function LoginPage(){

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    //login function
    const login = () => {
        let infos ={
            username: userName,
            password: password
        }
        axios
        .post("http://localhost:9999/api/utilisateurs/login", infos)
        .then((res) => {
           
            let token = res.data.token;
            let role = res.data.role;
            if (role === "admin") {
                localStorage.setItem("token", token);
                localStorage.setItem("role", role);
                navigate("/", { replace: true });
            } if (role === "Utilisateur") {
                localStorage.setItem("token", token);
                localStorage.setItem("role", role);
                navigate("/myscans", { replace: true });
            }  else{
                localStorage.setItem("token", token);
                localStorage.setItem("role", role);
                navigate("/home", { replace: true });

            } 
        })
        
        .catch((err) => console.log(err));
    }
    return(
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <Header
                    heading="Login to your account"
                    paragraph="Don't have an account yet? "
                    linkName="Signup"
                    linkUrl="/signup"
                />
                <div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">User Name</label>
                        <input type="text" class="form-control rounded" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>{ setUserName(e.target.value) }} />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control rounded" id="exampleInputPassword1" onChange={(e)=>{ setPassword(e.target.value) }}/>
                    </div><div>  <a href="/recover">forgot password?</a>
</div>
                    <button type="submit" class="btn bg-indigo-500 hover:bg-indigo-600 text-white" onClick={login}>Login</button>
                </div>
                <div><a href="/register">Create an account</a></div>
            </div>
        </div>
    )
}


// import React from "react";
// import Joi from "@hapi/joi";
// import Form from "./commons/form";
// import { login } from "./../services/authService";
// import PageTitle from "./commons/pageTitle";

// class LoginForm extends Form {
//   state = {
//     data: { username: "", password: "" },
//     errors: {},
//   };

//   schema = Joi.object({
//     username: Joi.string()
//       .username({ tlds: { allow: false } })
//       .required()
//       .label("Email"),
//     password: Joi.string().required().label("Password"),
//   });

//   doSubmit = async () => {
//     try {
//       await login(this.state.data);
//       window.location = "/";
//     } catch ({ response }) {
//       if (response && response.status >= 400 && response.status < 500) {
//         const errors = { ...this.state.errors };
//         errors.password = response.data;
//         this.setState({ errors });
//       }
//     }
//   };

//   render() {
//     return (
//       <React.Fragment>
//         <div className="container">
//           <PageTitle title="Login" />
//           <form onSubmit={this.handleSubmit}>
//             {this.renderInput("username", "username", "username")}
//             {this.renderInput("Password", "password", "password")}
//             {this.renderSubmitButton("Submit")}
//           </form>
//         </div>
//       </React.Fragment>
//     );
//   }
// }

// export default LoginForm;
