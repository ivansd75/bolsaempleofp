import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import Login from '../assets/Login.svg'
import Signup from '../assets/Signup.svg'
import Contactar from '../assets/Contactar.svg'
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
  
  const {logout} = useLogout();

  //con algo asi puedo acceder a una propiedad concreta del contexto
  const { user } = useAuthContext();
  //console.log('El estado es: ',user.uid)

    return <nav className={styles.navbar}>
      <ul>
      <li className={styles.title}>
      <Link to='/'>BolsaFP</Link> 
      </li>
      {!user && (
      <>
      <p className={styles.btno}><Link to='/oferta'>Subir oferta</Link></p>
      <li><Link to='/contactar'><img className={styles.icono} src={Contactar} alt="Contactar"/></Link></li>
      <li><Link to='/signup'><img className={styles.icono} src={Signup} alt="Login"/></Link></li>
      <li><Link to='/login'><img className={styles.icono} src={Login} alt="Login"/></Link></li>
      </>
      )
      }
      {/*{(user===null) && <li><button className="btn" onClick={logout} disabled>Logout</button></li>} */}
      {user && (
      <>
      <li>Hola, {user.displayName}</li>
      {user.uid!=="P8jgoKpyqgU98HrShggqrp1jWf02" &&
      <li><Link to='/contactar'><img className={styles.icono} src={Contactar} alt="Contactar"/></Link></li>
      }
      <li><button className={styles.btn} onClick={logout}>Cerrar Sesión</button></li>
      </>
      )
      }
     
      </ul>
    </nav>
  }

  export default Navbar;