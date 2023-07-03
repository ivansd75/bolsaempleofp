import { useState, useRef } from "react";
import { useSignup } from "../../hooks/useSignup";
import ReCAPTCHA from "react-google-recaptcha";

import styles from "./Signup.module.css";

const Signup = () => {

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [titulacion, setTitulacion] = useState('');
  const {signup, error, isPending} = useSignup()

  const captcha = useRef(null)
  const [captchaValido, setCaptchaValido] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email,password, displayName, titulacion);
  }

  const onChange = () => {
    if(captcha.current.getValue()){
      console.log("El usuario no es un robot")
      setCaptchaValido(true);
    }
  }

  return <form onSubmit={handleSubmit} className={styles['signup-form']}>
    <h2>Datos nuevo estudiante:</h2>
    <label>
      <span>
        Nombre y apellidos:
      </span>
      <input required
      type='text' 
      onChange={(e)=>setDisplayName(e.target.value)}
      value={displayName}
      />
    </label>
    <label>
      <span>
        Estudios:
      </span>
      <select value={titulacion} onChange={(e)=>setTitulacion(e.target.value)}>
        <option value='ADMINISTRACIÓN Y FINANZAS'>ADMINISTRACIÓN Y FINANZAS</option>
        <option value='CUIDADOS AUXILIARES DE ENFERMERÍA'>CUIDADOS AUXILIARES DE ENFERMERÍA</option>
        <option value='FARMACIA Y PARAFARMACIA'>FARMACIA Y PARAFARMACIA</option>
        <option value='GESTIÓN ADMINISTRATIVA'>GESTIÓN ADMINISTRATIVA</option>
        <option value='ILUSTRACIÓN'>ILUSTRACIÓN</option>
        <option value='INFORMÁTICA Y COMUNICACIONES'>INFORMÁTICA Y COMUNICACIONES</option>
        <option value='INSTALACIONES DE TELECOMUNICACIONES'>INSTALACIONES DE TELECOMUNICACIONES</option>
        <option value='JOYERÍA ARTÍSTICA'>JOYERÍA ARTÍSTICA</option>
        <option value='MANTENIMIENTO DE VEHÍCULOS'>MANTENIMIENTO DE VEHÍCULOS</option>
        <option value='MANTENIMIENTO ELECTROMECÁNICO'>MANTENIMIENTO ELECTROMECÁNICO</option>
      </select>
    </label>
    <label>
      <span>
        Email:
      </span>
      <input required
      type='email' 
      onChange={(e)=>setEmail(e.target.value)}
      value={email}
      />
    </label>
    <label>
      <span>
        Contraseña:
      </span>
      <input required
      type='password' 
      onChange={(e)=>setPassword(e.target.value)}
      value={password}
      />
    </label>
    
    {!isPending && (
    <>
    <div className="recaptcha">
    <ReCAPTCHA
    ref={captcha}
    sitekey={process.env.REACT_APP_SITE_KEY}
    onChange={onChange}
    />
    </div>
    {!captchaValido && <p>Por favor acepta el captcha.</p>}
    {!captchaValido && <button className={`${styles.btn} ${styles.disabled}`} disabled>Crear Usuario</button>}
    {captchaValido && <button className={styles.btn}>Crear Usuario</button>}
    </>
    )}
    {isPending && <button className="btn" disabled>Cargando..</button>}
    {error && <p>{error}</p>}
    </form>;
    
};

export default Signup;