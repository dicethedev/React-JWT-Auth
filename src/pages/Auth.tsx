import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom' 
import {MDBInput} from "mdb-react-ui-kit"
import { useLoginUserMutation } from '../services/authAPI'
import { toast } from 'react-toastify'

const initialState = {
     firstName: "",
     lastName: "",
     email: "",
     password: "",
     confirmPassword: "",   
}

const Auth = () => {

     const [formValue, setFormValue] = useState(initialState);

     //the destructure the FormValue
     const {firstName, lastName, email, password, confirmPassword} = formValue;

     const [showRegister, setShowRegister] = useState(false);
     
     const navigate = useNavigate();
     //loginUser as already being declared in authAPI.tsx and useLoginUserMutation is coming from there also
     const [
          loginUser, 
          {
               data: loginData, 
               isSuccess: isLoginSuccess, 
               isError: isLoginError, 
               error: loginError
          },
     ] = useLoginUserMutation();

     const handleChange = (e: any) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
     };


     const handleLogin = async () => {
         if(email && password) {
           await loginUser({email, password });
         } else {
              toast.error("Please fill all Input Field")
         }
     }

     //================ useEffect for declared react-toastify ========================
     useEffect(() => {
        if(isLoginSuccess) {
           toast.success("User Login Sucessfully")
           navigate("/dashboard")
        }
     }, [isLoginSuccess]);
    //================================================================================


     return (
         <section className="vh-100 gradient-custom">
           <div className="container py-4 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                     <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                          <div className="card bg-dark text-white" style={{borderRadius: "1rem"}}>
                             <div className="card-body p-4 text-center">
                                  <div className="mb-md-5 mt-md-4 pb-5">
                                       <h2 className="fw-bold mb-2 text-uppercase">
                                            {/* The Login $ Register magic changes */}
                                            {!showRegister ? "Login" : "Register"} 
                                       </h2>
                                       <p className="text-white-50 mb-4">
                                            {!showRegister ? "Please enter your Email & Password"
                                            : "Please enter User Details" }
                                       </p>

                                       {/* This will be showing the remaining input field for register page */}
                                   {showRegister && (
                                        <>
                                                       {/* Form 1 */}
                                                       <div className="form-outline form-white mb-4">
                                                            <MDBInput type="text" name="firstName" value={firstName}
                                                                 onChange={handleChange} label="First Name"
                                                                 className="form-control form-control-lg" />
                                                       </div>
                                                       {/* Form 2 */}
                                                       <div className="form-outline form-white mb-4">
                                                            <MDBInput type="text" name="lastName" value={lastName}
                                                                 onChange={handleChange} label="Last Name"
                                                                 className="form-control form-control-lg" />
                                                       </div>
                                        </>
                                   )}

                                  {/* Form 1 */}
                                       <div className="form-outline form-white mb-4">
                                            <MDBInput type="email" name="email" value={email}
                                            onChange={handleChange} label="Email"
                                            className="form-control form-control-lg" />
                                       </div>
                                      {/* Form 2 */}
                                             <div className="form-outline form-white mb-4">
                                                  <MDBInput type="password" name="password" value={password}
                                                   onChange={handleChange} label="Password"
                                                   className="form-control form-control-lg" />
                                             </div>

                                   {/* This will be showing the confirm password input field for register page */}
                                   {showRegister && (
                                           <div className="form-outline form-white mb-4">
                                             <MDBInput type="password" name="confirmPassword" value={confirmPassword}
                                                  onChange={handleChange} label="Confirm Password"
                                                  className="form-control form-control-lg" />
                                           </div>
                                   )}


                                     {/* Checking Button for Login or Register  */}
                                     {!showRegister ? (
                                        <button className="button btn btn-outline-light btn-lg px-5" 
                                        type="button" onClick={() => handleLogin()}>
                                           Login
                                        </button>
                                     ): (
                                        <button className="button btn btn-outline-light btn-lg px-5" type="button">
                                           Register
                                       </button> 
                                     )}
                                     </div>
                                     {/* switching to the Login or Register page */}
                                     <div>
                                          <h5 className="mb-0">
                                               {!showRegister ? (
                                                    <>
                                                     Don't have an account?
                                                     <p className="text-white-50 fw-bold" style={{ cursor: 'pointer' }}
                                                     onClick={() => setShowRegister(true)}>Sign up</p>
                                                    </>
                                               ): (
                                                  <>
                                                     Already have an account?
                                                     <p className="text-white-50 fw-bold" style={{ cursor: 'pointer' }}
                                                  onClick={() => setShowRegister(false)}>Sign in</p>
                                                  </>
                                               )}
                                          </h5>
                                     </div>
                                  </div>
                             </div>
                          </div>
                     </div>
                </div>
         </section>
     )
}

export default Auth
