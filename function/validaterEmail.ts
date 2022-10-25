import { emailRegEx } from "../config/validate";

export  const validaterEmail:((a:string)=>boolean)=(email:string)=>{
     return emailRegEx.test(email)
}