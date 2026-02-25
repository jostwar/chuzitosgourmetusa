const MENU_PDF_URL =
  "https://chuzitos.s3.us-west-2.amazonaws.com/Menu-chuzitos-Miami.pdf";

export const metadata = {
  title: "Menú PDF | Chuzitos Gourmet USA",
  description: "Menú en PDF - Chuzitos Gourmet Miami",
  robots: "noindex, nofollow",
};

export default function MenuPdfPage() {
  return (
    <div
      className="menupdf-page"
      style={{ minHeight: "80vh", display: "flex", flexDirection: "column" }}
    >
      {/* En móvil: abrir el PDF en el visor del navegador (legible); en iframe no se ve bien */}
      <div className="menupdf-mobile-cta">
        <p>En el celular es más fácil leer el menú abriendo el PDF en tu navegador.</p>
        <a
          href={MENU_PDF_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="theme-btn style-one"
        >
          Abrir menú PDF
        </a>
      </div>

      {/* En escritorio: iframe a pantalla completa */}
      <div className="menupdf-iframe-wrap">
        <iframe
          src={`${MENU_PDF_URL}#toolbar=1`}
          title="Menú Chuzitos Gourmet Miami - PDF"
          className="menupdf-iframe"
        />
      </div>
    </div>
  );
}
