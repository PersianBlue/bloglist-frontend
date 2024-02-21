
import "./notification.css";

const Notification = ({message, type})=>{
    const style = type==="error"? "error" : "alert";
    if(!message){
        return null
    }
    
    return <div className={`${style}`}>
        {message}
    </div>

}
export default Notification