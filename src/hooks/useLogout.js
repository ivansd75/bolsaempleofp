import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";


export const useLogout = () => {
 const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  
  const logout = async () => {
    setError(null);
    setIsPending(true);

    //Sign out usuario
    try {
      //Salimos
      await projectAuth.signOut();

      //dispatch LOGOUT action
      dispatch({ type: "LOGOUT" });

      //Solo actualizo estados si no ha cancelado el usuario pulsando otra cosa cuando estaba en proceso de cancelar
      if(!isCancelled){
        setIsPending(false);
        setError(null);
      }
      
      
    } catch (err) {
        if(!isCancelled){
      console.log(err.message);
      setError(err.message);
      setIsPending(false);
        }
    }
  };

  //Usamos una cleanup function para limpiar cuando el usuario da a loguearse y se cambia de página
  //pulsando otra cosa antes de recibir la respuesta de Firebase, porque si no tira un error cuando llega
  //la respuesta y el componente que la generó ya no existe
  useEffect(()=> {
        return () => setIsCancelled(true)
  }, [])

  return { error, isPending, logout };
};
