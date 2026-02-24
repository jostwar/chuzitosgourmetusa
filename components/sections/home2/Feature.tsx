export default function FeaturesSection() {
  

  const features = [
    {
      icon: 'flaticon-credit-card',
      title: 'Security Payment',
      description: 'We Ensure Secure Payment',
    },
    {
      icon: 'flaticon-free-shipping',
      title: 'DoorDash',
      description: '',
    },
    {
      icon: 'flaticon-free-shipping',
      title: 'Uber Eats',
      description: '',
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Visítanos',
      description: 'Doral - Kendall - Wynwood',
    },
  ];

  return (
    <section className="features-section gray-bg pt-50 pb-50">
      <div className="container">
        <div className="row">
          {features.map((feature, index) => (
            <div
              className="col-xl-3 col-md-6 col-sm-12"
              key={index}
            >
              <div className="iconic-info-box style-three mb-0 wow fadeInUp" data-wow-delay={`${index * 0.2}s`}>
                <div className="icon">
                  <i className={feature.icon}></i>
                </div>
                <div className="content">
                  <h4 className="title">{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
