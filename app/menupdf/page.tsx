const MENU_PDF_URL = "https://chuzitos.s3.us-west-2.amazonaws.com/Menu-chuzitos-Miami.pdf";

export const metadata = {
  title: "Menú PDF | Chuzitos Gourmet USA",
  description: "Menú en PDF - Chuzitos Gourmet Miami",
  robots: "noindex, nofollow",
};

export default function MenuPdfPage() {
  return (
    <div className="menupdf-page" style={{ minHeight: "80vh", display: "flex", flexDirection: "column" }}>
      <iframe
        src={`${MENU_PDF_URL}#toolbar=1`}
        title="Menú Chuzitos Gourmet Miami - PDF"
        style={{
          width: "100%",
          minHeight: "calc(100vh - 120px)",
          border: "none",
          marginTop: "1rem",
        }}
      />
    </div>
  );
}
