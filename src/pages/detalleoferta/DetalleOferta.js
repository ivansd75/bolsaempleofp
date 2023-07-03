import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import { useParams, Link } from 'react-router-dom';
import { projectFirestore } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';

import styles from './DetalleOferta.module.css'

const DetalleOferta = () => {
const { user } = useAuthContext()
const { id } = useParams();
const [ofer, setOfer] = useState(null)
const [isPending, setIsPending] = useState(false)
const [error, setError] = useState(null)

const [userAdmin, setUserAdmin] = useState(false)
const [isPending2, setIsPending2] = useState(false)
const [error2, setError2] = useState(null)

let idUsuario = user.uid
useEffect(()=>{
    setIsPending2(true);
    const unsub = projectFirestore.collection('usuarios').doc(idUsuario).onSnapshot((doc)=>{
      //Compruebo que el id que coge de la url existe en la base de datos
      if (doc.exists){
        setIsPending2(false);
        setUserAdmin(doc.data().admin)
    
      }else{
        setIsPending2(false);
        setError2('No encuentro el usuario');
      }})
    
      //cleanup function para limpiar el listener que vigila los cambios en la bd y que si no se hace
      //estaria escuchando permanentemente aunque nos vayamos de la pagina de la receta concreta
      return () => unsub();
    }, [idUsuario]);

useEffect(()=>{
setIsPending(true);
const unsub = projectFirestore.collection('ofertas').doc(id).onSnapshot((doc)=>{
  //Compruebo que el id que coge de la url existe en la base de datos
  if (doc.exists){
    setIsPending(false);
    setOfer(doc.data())

  }else{
    setIsPending(false);
    setError('No encuentro la oferta');
  }})

  //cleanup function para limpiar el listener que vigila los cambios en la bd y que si no se hace
  //estaria escuchando permanentemente aunque nos vayamos de la pagina de la receta concreta
  return () => unsub();
}, [id]);
let history = useHistory();

const handleClickValidar = () => {
    projectFirestore.collection('ofertas').doc(id).update({
    validada: true
  })
}

const handleClickBorrar = () => {
    projectFirestore.collection('ofertas').doc(id).delete()
    history.goBack()
}


    return(
        <div className={styles.contenedor}>
        {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {ofer && (
        <>
        <h1>Información detallada de la oferta</h1>
        <h2>Nombre: {ofer.nombreOferta}</h2>
        {ofer.validada ? <h3>Validez: Oferta validada</h3> : <h3>Validez: Pendiente de validar</h3>}
          <p><strong>Descripción:</strong> <br/> {ofer.descripcionOferta}</p>
          <p><strong>Razón empresa: </strong>{ofer.direccionEmpresa}</p>
          <p><strong>Persona de contacto: </strong>{ofer.personaContacto}</p>
          <p><strong>Email de contacto: </strong>{ofer.email}</p>
          <p><strong>Tfno. de contacto: </strong>{ofer.telefono}</p>
        
        {!ofer.validada && <p className={styles.btn}><Link to='/'>&lt; Volver</Link></p>}
        {(ofer.validada && !userAdmin) && <p className={styles.btn}><Link to='/'>&lt; Volver</Link></p>}
        {(ofer.validada && userAdmin) && <p className={styles.btn}><Link to='/borrarofertas'>&lt; Volver</Link></p>}
        
        {error2 && <p className="error2">{error}</p>}
        {(!isPending2 && userAdmin && !ofer.validada) && <button className="btn" onClick={handleClickValidar}>Validar</button> }
        {(!isPending2 && userAdmin && ofer.validada) && <button className="btn" onClick={handleClickBorrar}>Borrar</button> }
        </>
      )}
        </div>
    );
}

export default DetalleOferta;