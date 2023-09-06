import { getDoc,doc } from "firebase/firestore";
import { useRef } from "react";
import { db } from "../../firebaseInit";
import { toast } from "react-toastify";

export default function Login(props){

    const emailRef = useRef();
    const passRef = useRef();
    
    const handleSubmit = async (event)=>{

        const email = emailRef.current.value;
        const pass = passRef.current.value;

        event.preventDefault();

        const user = await getDoc(doc(db,"users",email))
        const data = user.data()

        if(data && data.pass === pass){
            props.setUser({id:data.email,name:data.name})
            toast.success("Logged in Successfully")
            window.sessionStorage.setItem("user",JSON.stringify({"email":data.email,"name":data.name}))
        }
        else{
            toast.error("Invalid email or password");
        }
    }
   
    return(
        <div className="form--container">
            <div className="Login-form user-form">
                <form onSubmit={handleSubmit}>
                    <div className="close-form" onClick={props.toggleLogin}>X</div>
                    <h1>
                        Login
                    </h1>
                    <div className="form--inp">
                        <input type="text" placeholder="Email" ref={emailRef} required/>
                    </div>
                    <div className="form--inp">
                        <input type="password" placeholder="Password" ref ={passRef} required/>
                    </div>
                    <div className="form--inp">
                        <button className="Login">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}