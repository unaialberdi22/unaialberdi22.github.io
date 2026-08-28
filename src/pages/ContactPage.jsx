export default function ContactPage() {
  return (
    <div className="static-page">
      <h1>Contacto</h1>
      <p className="static-page__lead">
        [¿Tienes un proyecto en mente o quieres saber más? Escríbeme.]
      </p>

      <div className="static-page__body">
        <ul className="contact-list">
          <li>
            <span className="contact-list__label">Email</span>
            <a href="mailto:tu-email@ejemplo.com">tu-email@ejemplo.com</a>
          </li>
          <li>
            <span className="contact-list__label">Instagram</span>
            <a
              href="https://instagram.com/tu-usuario"
              target="_blank"
              rel="noreferrer"
            >
              @tu-usuario
            </a>
          </li>
          <li>
            <span className="contact-list__label">Ubicación</span>
            <span>[Ciudad, País]</span>
          </li>
        </ul>

        <p>
          [Aquí puedes añadir más adelante un formulario de contacto, o
          simplemente dejar estos enlaces directos. Recuerda sustituir el
          email y el usuario de Instagram por los tuyos.]
        </p>
      </div>
    </div>
  );
}
