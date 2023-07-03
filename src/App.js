import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/home/Home";
import Oferta from "./pages/oferta/Oferta";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Navbar from "./components/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";
import DetalleOferta from "./pages/detalleoferta/DetalleOferta";
import BorrarOferta from "./pages/borraroferta/BorrarOferta";
import Contactar from "./pages/contactar/Contactar";
import CookieConsent from "react-cookie-consent";

function App() {
  const { authIsReady, user } = useAuthContext();
  return (
    <div className="App">
      {authIsReady && (
      <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          {!user && <Redirect to="/login" />}
          {user && <Home />}
        </Route>
        <Route path='/oferta'>
          <Oferta />
        </Route>
        <Route path='/login'>
        {user && <Redirect to="/" />}
        {!user && <Login />}
        </Route>
        <Route exact path='/signup'>
        {user && <Redirect to="/" />}
        {!user && <Signup />}
        </Route>
        <Route path='/borrarofertas'>
        {!user && <Redirect to="/" />}
        {user && <BorrarOferta />}
        </Route>
        <Route path='/contactar'>
          <Contactar />
        </Route>
        <Route path='/detalleoferta/:id'>
        {!user && <Redirect to="/" />}
        {user && <DetalleOferta />}
        </Route>

      </Switch>
      </BrowserRouter>
      )}
      <CookieConsent buttonText="Aceptar">Usamos Cookies para mejorar su experiencia de navegación en esta web. </CookieConsent>
    </div>
  );
}

export default App
