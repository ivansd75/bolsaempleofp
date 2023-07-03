import { useFirestore } from '../../hooks/useFirestore'
import { Link } from "react-router-dom";
// styles
import styles from './BorrarOferta.module.css'

export default function ListadoAntiguas({ ofertas, administrador, titulo, datosUser }) {
  const { deleteDocument } = useFirestore('ofertas')
  
  if (administrador===false){
  //Render para el caso de los estudiantes
  return (
    <h2>No estás autorizado a ver ésta página</h2>
  )
}else //caso Administrador
return (
  <>
  <h2>Listado de ofertas previamente validadas</h2>
  <ul className={styles.transactions}>
    {ofertas.map((oferta) => (
      <div key={oferta.id}>
      {(oferta.validada) && (
      <li key={oferta.id}>
        <p className={styles.name}>{oferta.nombreOferta}</p>
        
        <p className={styles.mas}><Link to={`/detalleoferta/${oferta.id}`}>Ver detalle de la oferta &gt;</Link></p>
        <button className={styles.botonBorrar} onClick={() => deleteDocument(oferta.id)}>Borrar</button>
      </li>
      )}
      </div>
    ))}
  </ul>
  </>
)


}