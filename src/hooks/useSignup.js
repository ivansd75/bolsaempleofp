import { useState, useEffect } from "react";
import { projectAuth, projectFirestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";


export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false);
const [error, setError] = useState(null);
const [isPending, setIsPending] = useState(false);
const {dispatch} = useAuthContext();

const signup = async (email, password, displayName, titulacion) => {
setError(null);
setIsPending(true);

try{
    //Damos de alta usuario
 const res = await projectAuth.createUserWithEmailAndPassword(email,password);
 //console.log(res.user);


 if (!res){
    throw new Error('No pude completar el alta del nuevo usuario')
 }

 //Muestra el user id por la consola, lo puedo usar para añadir otros campos en otro documento de usuario para roles
 console.log('El id de usuario es: ' + res.user.uid);
 //Añado displayName al usuario
 await res.user.updateProfile({displayName: displayName});

 //Creamos documento en una coleccion para usuarios aparte con los datos extra que quiero guardar
await projectFirestore.collection('usuarios').doc(res.user.uid).set({
    uid:res.user.uid,
    admin: false,
    titulacion: titulacion
})

 //dispatch LOGIN action 
 dispatch({type:'LOGIN' , payload:res.user})
 //Con una linea como la siguiente podría pasar multiples propiedades al contexto ej:Rol mediante el payload
//dispatch({type:'LOGIN' , payload:{...res.user, unapropiedadinventadaaunqueeselid:res.user.uid}})
 

//Solo actualizo estados si no ha cancelado el usuario pulsando otra cosa cuando estaba en proceso de cancelar
if(!isCancelled){
setIsPending(false);
 setError(null);
}
}catch (err){
    //Gestión de error al crear usuario
    if(!isCancelled){
    console.log(err.message);
    setError(err.message);
    setIsPending(false)
    }
}

}
//Usamos una cleanup function para limpiar cuando el usuario da a loguearse y se cambia de página
  //pulsando otra cosa antes de recibir la respuesta de Firebase, porque si no tira un error cuando llega
  //la respuesta y el componente que la generó ya no existe
  useEffect(()=> {
    return () => setIsCancelled(true)
}, [])
return {error, isPending, signup}

}