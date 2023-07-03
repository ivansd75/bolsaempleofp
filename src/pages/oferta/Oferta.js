import { useState, useEffect, useRef } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import ReCAPTCHA from "react-google-recaptcha";

import styles from "./Oferta.module.css";

const Oferta = () => {
  const [nombreOferta, setNombreOferta] = useState('');
  const [titulacion, setTitulacion] = useState('');
  const [descripcionOferta, setDescripcionOferta] = useState('');
  const [direccionEmpresa, setDireccionEmpresa] = useState('');
  const [personaContacto, setPersonaContacto] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('')
  const [ofertaEnviada, setOfertaEnviada] =useState(false)
  const { addDocument, response } = useFirestore('ofertas')

  const captcha = useRef(null)
  const [captchaValido, setCaptchaValido] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let validada = false
    addDocument({ 
      nombreOferta, 
      titulacion,
      descripcionOferta,
      direccionEmpresa,
      personaContacto,
      email,
      telefono,
      validada
    })
  }

  const onChange = () => {
    if(captcha.current.getValue()){
      console.log("El usuario no es un robot")
      setCaptchaValido(true);
    }
  }

  // resetea los campos del formulario
  useEffect(() => {
    if (response.success) {
      setNombreOferta('')
      setTitulacion('ADMINISTRACIÓN Y FINANZAS')
      setDescripcionOferta('')
      setDireccionEmpresa('')
      setPersonaContacto('')
      setEmail('')
      setTelefono('')
      setOfertaEnviada(true)
    }
  }, [response.success])

  return <form onSubmit={handleSubmit} className={styles['login-form']}>
    <h2>Detalles oferta de empleo:</h2>
    <label>
      <span>
        Nombre de la oferta:
      </span>
      <input required
      type='text' 
      onChange={(e)=>setNombreOferta(e.target.value)}
      value={nombreOferta}
      />
    </label>
    <label>
      <span>
        Descripción oferta:
      </span>
      <textarea required
      rows='5'
      onChange={(e)=>setDescripcionOferta(e.target.value)}
      value={descripcionOferta}
      />
    </label>
    <label>
      <span>
        Requisitos titulación:
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
        Nombre y dirección de la Empresa ofertante:
      </span>
      <input required
      type='text' 
      onChange={(e)=>setDireccionEmpresa(e.target.value)}
      value={direccionEmpresa}
      />
    </label>
    <label>
      <span>
        Persona de contacto:
      </span>
      <input required
      type='text' 
      onChange={(e)=>setPersonaContacto(e.target.value)}
      value={personaContacto}
      />
    </label>
    <label>
      <span>
        Email de contacto:
      </span>
      <input required
      type='email' 
      onChange={(e)=>setEmail(e.target.value)}
      value={email}
      />
    </label>
    <label>
      <span>
        Teléfono de contacto:
      </span>
      <input required
      type='text' 
      onChange={(e)=>setTelefono(e.target.value)}
      value={telefono}
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
    {ofertaEnviada && <p>Gracias por enviar tu oferta, en breve será revisada por un administrador 
      y validada para hacerla llegar a los candidatos adecuados.</p> }
    </form>;
};

export default Oferta;