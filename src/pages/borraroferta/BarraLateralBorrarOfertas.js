import { Link } from "react-router-dom"

import styles from './BorrarOferta.module.css'

export default function BarraLateralBorrarOfertas({ datosUser, administrador, uid }) {

    return(
      <>
      <h3>Panel de Administrador</h3>
      <p>A la izquierda de este mensaje puedes ver el listado de ofertas que fueron validadas en su momento. Puedes revisarlas y borrar las que consideres oportuno :&#41;</p>
      <p className={styles.btn}><Link to='/'>&lt; Volver</Link></p>
      </>
    )
  
}