import Link from "next/link";

interface BreadcrumbProps {
  breadcrumbTitle: string;
  /** Si es "footer", usa la misma imagen y transparencia que el footer */
  bannerBg?: "default" | "footer";
}

export default function Breadcrumb({ breadcrumbTitle, bannerBg = "default" }: BreadcrumbProps) {
  const wrapperClass =
    bannerBg === "footer"
      ? "page-bg-wrapper page-banner-footer-bg p-r z-1 bg_cover pt-100 pb-110"
      : "page-bg-wrapper p-r z-1 bg_cover pt-100 pb-110";

  return (
    <section className="page-banner">
      <div
        className={wrapperClass}
        style={bannerBg === "default" ? { backgroundImage: "url(/assets/images/bg/page-bg.jpg)" } : undefined}
      >
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="row">
            <div className="col-lg-12">
              <div className="page-banner-content text-center">
                <h1 className="page-title">{breadcrumbTitle}</h1>
                <ul className="breadcrumb-link">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li className="active">{breadcrumbTitle}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
