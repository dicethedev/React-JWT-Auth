import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom' 
import {MDBInput} from "mdb-react-ui-kit"
import { useLoginUserMutation, useRegisterUserMutation  } from '../services/authAPI'
import { toast } from 'react-toastify'
import { useAppDispatch } from '../app/hooks'
import { setUser } from '../features/authSlice'

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

     //====================== I bring dispatch from the hook.tsx found app folder ===============

     const dispatch = useAppDispatch(); 

     //+++++++++++++++++++++++++++======================+++++++++++++++++++++++++++++++++++++++++
     
     const navigate = useNavigate();
     
     //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
      //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

      // +++++++++++++++++++++++++++++++++++++++++++=====================
      //RegisteUser Function
     const [
          registerUser, {
               data: registerData,
               isSuccess: isRegisterSuccess,
               isError: isRegisterError,
               error: registerError
          },
        ] = useRegisterUserMutation();
     // ++++++++++++++++++++++++++++++++++++++++++========================

     const handleChange = (e: any) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
     };

      // This is for Login page
     const handleLogin = async () => {
         if(email && password) {
           await loginUser({email, password });
         } else {
              toast.error("Please fill all Input Field")
         }
     }

     //This is for Register page
     const handleRegister = async () => {
     if (password !== confirmPassword) {
          return toast.error("Password don't match")
      }

     if(firstName && lastName && password && email) {
          await registerUser({firstName, lastName, email, password});
      }

     }

     //================ useEffect for declared react-toastify ========================
     useEffect(() => {
          //This for Login function
        if(isLoginSuccess) {
           toast.success("User Login Sucessfully")
           //setUser id from authSlice in features folder
             dispatch(
                  setUser({ name: loginData.result.name, token: loginData.token })
                  );
           navigate("/dashboard")
        }
          
        //This id for Register function
          if (isRegisterSuccess) {
               toast.success("User Register Sucessfully")
               //setUser id from authSlice in features folder
               dispatch(
                    setUser({ name: registerData.result.name, token: registerData.token })
                    );
               navigate("/dashboard")
          }
     }, [isLoginSuccess, isRegisterSuccess]);
    //================================================================================

    // =========================== active for details that does not match the information in the database =================

     useEffect(() => {
        if(isLoginError) {
             toast.error((loginError as any).data.message)
        }

          if (isRegisterError) {
               toast.error((registerError as any).data.message)
          }
     }, [isLoginError, isRegisterError])

     // ===============================================================================================================

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
                                        <button className="button btn btn-outline-light btn-lg px-5" 
                                             type="button" onClick={() => handleRegister()}>
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
