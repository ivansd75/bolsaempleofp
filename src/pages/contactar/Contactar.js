import { useState, useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import styles from "./Contactar.module.css";
import emailjs from '@emailjs/browser';

const Contactar = () => {
  
  const captcha = useRef(null)
  const [captchaValido, setCaptchaValido] = useState(null);

  const [values, setValues] = useState({
    nombre: '',
    asunto: '',
    email: '',
    telefono:'',
    mensaje: ''
  });
  
  const [status, setStatus] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.send('service_e30fa9h', 'template_e9u433u', values, process.env.REACT_APP_EMAILJS)
      .then(response => {
        console.log('SUCCESS!', response);
        setValues({
          nombre: '',
          asunto: '',
          email: '',
          telefono:'',
          mensaje: ''
        });
        setStatus('SUCCESS');
      }, error => {
        console.log('FAILED...', error);
      });
  }

  useEffect(() => {
    if(status === 'SUCCESS') {
      setTimeout(() => {
        setStatus('');
      }, 3000);
    }
  }, [status]);

  const handleChange = (e) => {
    setValues(values => ({
      ...values,
      [e.target.name]: e.target.value
    }))
  }

  const renderAlert = () => (
      <p>Tu mensaje se ha enviado correctamente.</p>
  )
  
  const onChange = () => {
    if(captcha.current.getValue()){
      console.log("El usuario no es un robot")
      setCaptchaValido(true);
    }
  }


  return <form onSubmit={handleSubmit} className={styles['login-form']}>
    <h2>Para ponerte en contacto con nosotros utiliza el siguiente formulario:</h2>
    <p>Te responderemos a la mayor brevedad posible.</p>
    <label>
      <span>
        Nombre:
      </span>
      <input required
      type='text' 
      onChange={handleChange}
      value={values.nombre}
      name='nombre'
      />
    </label>
    
    <label>
      <span>
        Asunto:
      </span>
      <select value={values.asunto} onChange={handleChange} name='asunto'>
        <option value='PROBLEMA TÉCNICO'>PROBLEMA TÉCNICO</option>
        <option value='RETIRAR OFERTA'>RETIRAR OFERTA</option>
        <option value='DARSE DE BAJA'>DARSE DE BAJA</option>
        <option value='OTRO'>OTRO</option>
      </select>
    </label>
    
    <label>
      <span>
        Email de contacto:
      </span>
      <input required
      type='email' 
      onChange={handleChange}
      value={values.email}
      name='email'
      />
    </label>

    <label>
      <span>
        Teléfono de contacto:
      </span>
      <input required
      type='text' 
      onChange={handleChange}
      value={values.telefono}
      name='telefono'
      />
    </label>

    <label>
      <span>
        Mensaje:
      </span>
      <textarea required
      rows='5'
      onChange={handleChange}
      value={values.mensaje}
      name='mensaje'
      />
    </label>

    <div className="recaptcha">
    <ReCAPTCHA
    ref={captcha}
    sitekey={process.env.REACT_APP_SITE_KEY}
    onChange={onChange}
    />
    </div>
    {!captchaValido && <p>Por favor acepta el captcha.<br/></p>}
    {!captchaValido && <button className={`${styles.btn} ${styles.disabled}`} disabled>Enviar</button>}
    {captchaValido && <button className={styles.btn}>Enviar</button>}

    {status && renderAlert()} 
    </form>;
};

export default Contactar;