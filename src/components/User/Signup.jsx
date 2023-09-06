import { useRef } from "react"
// import { useNavigate } from "react-router-dom";

import { db } from "../../firebaseInit"
import { doc, getDoc, setDoc } from "firebase/firestore";

import { toast } from "react-toastify";

export default function Signup(props){

    const nameRef = useRef();
    const emailRef = useRef();
    const passRef = useRef();
    const cpassRef = useRef();

    // const navigate = useNavigate();

    const handleSubmit = async (event)=>{

        event.preventDefault();

        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const pass  = passRef.current.value;
        const cpass = cpassRef.current.value;

        if(pass!==cpass){
            toast.error("Password Missmatch")
        }
        else{

            const user = await getDoc(doc(db,"users",email))
            console.log(user.data())
            if(user.data()){
                toast.error("User already exists, try again with different email")
            }
            else{

                await setDoc(doc(db,"users",email),{
                    name,pass,email
                })
                toast.success("User created successfully!!!");
                props.setUser({id:email,name})
                window.sessionStorage.setItem("user",JSON.stringify({"email":email,"name":name}))
                // navigate('/');
            }
        }
    }

    return (
        <div className="form--container">
            <div className="Signup-form user-form">
                <form onSubmit={handleSubmit}>
                    <div className="close-form" onClick={props.toggleSignup}>X</div>
                    <h1>
                        Signup
                    </h1>
                    <div className="form--inp">
                        <input type="text" placeholder="Enter Name" ref={nameRef} required/>
                    </div>
                    <div className="form--inp">
                        <input type="text" placeholder="Enter Email"ref={emailRef} required/>
                    </div>
                    <div className="form--inp">
                        <input type="password" placeholder="Enter password" ref={passRef} required/>
                    </div>
                    <div className="form--inp">
                        <input type="password" placeholder="Confirm Password" ref={cpassRef} required/>
                    </div>
                    <div className="form--inp">
                        <button className="Signup">Signup</button>
                    </div>
                </form>
            </div>
        </div>
    )
}