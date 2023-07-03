import { Link } from "react-router-dom"

import styles from './Home.module.css'

export default function BarraLateral({ datosUser, administrador, uid }) {
  

  if (administrador){
    return(
      <>
      <h3>Panel de Administrador</h3>
      <p>Si no hay elementos listados a la izquierda de este mensaje, significa que no tienes ofertas pendientes de validar. Buen trabajo :&#41;</p>
      <p className={styles.btn}><Link to={'/borrarofertas'}>Borrar Ofertas antiguas &gt;</Link></p>
      </>
    )
  }else return (
    <>
      <h3>Bienvenid@</h3>
      <p>A la izquierda puedes ver el listado de ofertas de empleo disponibles para tu titulación. Si no hay elementos listados, de momento no hay ofertas disponibles. Regresa de vez en cuando, se renuevan e incluyen nuevas ofertas todos los días.</p>
    </>
  )
}