import { useState, useRef } from "react";
import { useLogin } from "../../hooks/useLogin";
import ReCAPTCHA from "react-google-recaptcha";

import styles from "./Login.module.css";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const { login, isPending, error } = useLogin();
  
  const captcha = useRef(null)
  const [captchaValido, setCaptchaValido] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault();
    login(email,password);
  }

  const onChange = () => {
    if(captcha.current.getValue()){
      console.log("El usuario no es un robot")
      setCaptchaValido(true);
    }
  }

  return <form onSubmit={handleSubmit} className={styles['login-form']}>
    <h2>Login:</h2>
    <p>Introduce las credenciales de usuario para acceder al sistema.</p>
    <label>
      <span>
        email:
      </span>
      <input required
      type='email' 
      onChange={(e)=>setEmail(e.target.value)}
      value={email}
      />
    </label>
    <label>
      <span>
        password:
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
    {!captchaValido && <p>Por favor acepta el captcha.<br/></p>}
    {!captchaValido && <button className={`${styles.btn} ${styles.disabled}`} disabled>Iniciar Sesión</button>}
    {captchaValido && <button className={styles.btn}>Iniciar Sesión</button>}
    </>
    )}

    {isPending && <button className="btn" disabled>Cargando..</button>}
    {error && <p>{error}</p>}
    </form>;
};

export default Login;