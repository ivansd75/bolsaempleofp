import { useFirestore } from '../../hooks/useFirestore'
import { Link } from "react-router-dom";
// estilos
import styles from './Home.module.css'

export default function TransactionList({ ofertas, administrador, titulo, datosUser }) {
  const { deleteDocument, validarDocument } = useFirestore('ofertas')
  
  if (administrador===false){
  //Render para el caso de los estudiantes
  return (
    <>
    
    <h2>Listado de ofertas para tus estudios</h2>
    <ul className={styles.transactions}>
      {ofertas.map((oferta) => (
        <div key={oferta.id}>
        {(oferta.validada && oferta.titulacion===titulo) && (
        <li key={oferta.id}>
          <p className={styles.name}>{oferta.nombreOferta}</p>
          <p className={styles.mas}><Link to={`/detalleoferta/${oferta.id}`}>Ver detalle de la oferta &gt;</Link></p>
        </li>
        )}
        </div>
      ))}
    </ul>
    </>
  )
}else //caso Administrador
return (
  <>
  <h2>Listado de ofertas pendientes de validar</h2>
  <ul className={styles.transactions}>
    {ofertas.map((oferta) => (
      <div key={oferta.id}>
      {(!oferta.validada) && (
      <li key={oferta.id}>
        <p className={styles.name}>{oferta.nombreOferta}</p>
        <p className={styles.mas}><Link to={`/detalleoferta/${oferta.id}`}>Ver detalle de la oferta &gt;</Link></p>
        <button className={styles.botonBorrar} onClick={() => deleteDocument(oferta.id)}>Borrar</button>
        <button className={styles.botonValidar} onClick={() => validarDocument(oferta.id)}>Validar</button>
      </li>
      )}
      </div>
    ))}
  </ul>
  </>
)


}