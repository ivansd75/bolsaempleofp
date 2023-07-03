import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'


// estilos
import styles from './BorrarOferta.module.css'

// componentes
import BarraLateralBorrarOfertas from './BarraLateralBorrarOfertas'
import ListadoAntiguas from './ListadoAntiguas'

export default function BorrarOferta() {
  const { user } = useAuthContext()
  
   const { documents, error } = useCollection(
    'usuarios', ["uid", "==", user.uid]
  )

  const { documents:documentos2, error2 } = useCollection(
    'ofertas', ["createdAt", "!=", null], ['createdAt', 'desc']
    )

  //Obtener info del usuario asincronamente
  //con el uid consultar otro dato que nos interese de la otra colección (admin o titulacion)
  //se hace otra consulta para sacar los documentos que nos interesa y se pasan para hacer la lista

 //console.log(documents)


  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {error2 && <p>{error2}</p>}
        {(documents && documentos2) && <ListadoAntiguas  datosUser={documents} ofertas={documentos2} administrador={documents[0].admin} titulo={documents[0].titulacion} />}
      </div>
      
      <div className={styles.sidebar}>
        {error && <p>{error}</p>}
        {documents &&<BarraLateralBorrarOfertas datosUser={documents} administrador={documents[0].admin}  uid={user.uid} />}
      </div>
    </div>
  )
}