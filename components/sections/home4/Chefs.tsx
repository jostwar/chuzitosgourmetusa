import React from "react";

const ChefsSection = () => {
  const chefs = [
    {
      name: "David Liam",
      position: "Special Chef",
      img: "assets/images/team/team-10.jpg",
      socials: [
        { href: "#", icon: "fab fa-facebook-f" },
        { href: "#", icon: "fab fa-twitter" },
        { href: "#", icon: "fab fa-instagram" },
      ],
    },
    {
      name: "Olivia Ava",
      position: "Special Chef",
      img: "assets/images/team/team-11.jpg",
      socials: [
        { href: "#", icon: "fab fa-facebook-f" },
        { href: "#", icon: "fab fa-twitter" },
        { href: "#", icon: "fab fa-instagram" },
      ],
    },
    {
      name: "John Jonson",
      position: "Special Chef",
      img: "assets/images/team/team-12.jpg",
      socials: [
        { href: "#", icon: "fab fa-facebook-f" },
        { href: "#", icon: "fab fa-twitter" },
        { href: "#", icon: "fab fa-instagram" },
      ],
    },
    {
      name: "Alex Mika",
      position: "Special Chef",
      img: "assets/images/team/team-13.jpg",
      socials: [
        { href: "#", icon: "fab fa-facebook-f" },
        { href: "#", icon: "fab fa-twitter" },
        { href: "#", icon: "fab fa-instagram" },
      ],
    },
  ];

  return (
    <section className="chefs-section pt-120 pb-85">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {/* Section Title */}
            <div className="section-title text-center mb-55 wow fadeInDown">
              <span className="sub-title">Meet Our Chef</span>
              <h2>Our Special Chef</h2>
              <p>
                Savor gourmet perfection with Our Special Chef's creations, where passion and expertise unite for an extraordinary culinary.
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          {chefs.map((chef, index) => (
            <div key={index} className="col-xl-3 col-md-6 col-sm-12">
              {/* Chef Item */}
              <div className="team-item style-one mb-40 wow fadeInUp">
                <div className="member-image">
                  <img src={chef.img} alt={`Chef ${chef.name}`} />
                  <ul className="social-link">
                    {chef.socials.map((social, idx) => (
                      <li key={idx}>
                        <a href={social.href}>
                          <i className={social.icon}></i>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="member-info">
                  <h4 className="title">{chef.name}</h4>
                  <span className="position">{chef.position}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChefsSection;
