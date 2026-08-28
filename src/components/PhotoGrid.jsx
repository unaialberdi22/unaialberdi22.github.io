import { Image } from "antd";

// Masonry con CSS columns: cada foto conserva su proporción natural y se
// "auto-ordena" para rellenar columnas sin huecos, sin librería aparte.
// Image.PreviewGroup de antd da el zoom y la navegación a pantalla completa
// entre todas las fotos de la galería.
export default function PhotoGrid({ fotos }) {
  const base = import.meta.env.BASE_URL;

  return (
    <Image.PreviewGroup>
      <div className="masonry">
        {fotos.map((foto) => (
          <div className="masonry__item" key={foto}>
            <Image
              src={`${base}photos/${foto}`}
              alt=""
              loading="lazy"
              rootClassName="masonry__image"
            />
          </div>
        ))}
      </div>
    </Image.PreviewGroup>
  );
}
