/* eslint-disable */
import React from "react";
import { Meta } from "../components/Meta";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Marquee from "react-fast-marquee";

export const AboutUs = () => {
  const teamMembers = [
    {
      name: "Aime Patrick",
      image: "https://photos.google.com/photo/AF1QipNiI33eOdRoks7ddEFU9Rp4XoV3sIUBxS5RCXCG",
      position: "Full Stack Developer",
      linkedIn: "www.linkedin.com/in/aime-patrick-393ba5226",
      github: "https://github.com/Aime-Patrick",
    },
    {
      name: "Mr David",
      image: "https://res.cloudinary.com/dlhivvi0h/image/upload/v1723652835/david/david-profile.jpg",
      position: "Full Stack Developer",
      linkedIn:"https://www.linkedin.com/in/programmerdatch/",
      github: `https://github.com/ProgrammerDATCH`,
    },
    {
      name: "Saddock Kabandana",
      image:
        "https://res.cloudinary.com/djrmfg6k9/image/upload/v1723551875/SaddockAime1_bqtq7b.jpg",
      position: "Full Stack Developer",
      linkedIn: "https://github.com/SaddockAime",
      github: "https://github.com/SaddockAime",
    },
    {
      name: "Ishimwe Jean Baptiste",
      image: "https://i.ibb.co/ZNq8hhb/hb.jpg",
      position: "Full Stack Developer",
      linkedIn: "https://www.linkedin.com/in/hbapte",
      github: "https://github.com/hbapte",
    },
    {
      name: "Ndahimana Bonheur",
      image: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1723665699/white_passport_ku69ot.jpg",
      position: "Junior Software Developer",
      linkedIn: "https://www.linkedin.com/in/ndahimana154/",
      github: "https://github.com/ndahimana154",
    },
  ];

  return (
    <>
      <Meta title="About us - E-commerceNinjas" />
      <div className="about">
        <div className="about__container">
          <h1>About Us</h1>
          <section className="welcome">
            <h2>
              Welcome to E-commerceNinjas – Your One-Stop Online Store for
              Everything You Love!
            </h2>
            <div className="paragraph">
              <p>
                At <b>E-commerceNinjas</b>, we're passionate about bringing you
                the best products at unbeatable prices. Our mission is to make
                shopping easy, enjoyable, and accessible for everyone. Whether
                you're looking for the latest fashion trends, cutting-edge
                electronics, or everyday essentials, we've got you covered.
              </p>
            </div>
          </section>
          <section className="mission">
            <h2>Our Mission</h2>
            <div className="paragraph">
              <p>
                Our mission is to provide an excellent shopping experience for
                our customers. By offering a wide range of products at
                affordable prices, we strive to make shopping more convenient
                and enjoyable. We believe in the power of technology to improve
                lives and connect with people around the world.
              </p>
            </div>
          </section>
          <section className="team">
            <h2>Meet the Team</h2>
            <div className="team__members">
              {teamMembers.map((member, index) => (
                  <div key={index} className="team__member">
                    <img src={member.image} alt={member.name} />
                    <div className="team__member__desc">
                      <h3>{member.name}</h3>
                      <p>{member.position}</p>
                      <div className="team__member__desc__icon">
                        {member.linkedIn && (
                          <a href={member.linkedIn} target="_blank">
                            <FaLinkedin />
                          </a>
                        )}
                        {member.github && (
                          <a href={member.github} target="_blank">
                            <FaGithub />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </section>
          <section className="get-in-touch">
            <div className="in-touch">
              <button>Get In Touch</button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
