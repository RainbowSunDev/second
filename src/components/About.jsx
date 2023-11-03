import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import Typewriter from "typewriter-effect";
import Social from "./Social";

const styles = {
  introTextContainer: {
    paddingRight: "20px",
    flexDirection: "column",
    whiteSpace: "pre-wrap",
    textAlign: "left",
    fontSize: "1.2em",
    fontWeight: 500,
    marginTop: "40px"
  },
  introImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column"
  },
  nameStyle: {
    fontSize: "3em",
  },
  countryStyle: {
    fontSize: "1.2em",
  },
  inlineChild: {
    display: "inline-block",
  },
  mainContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);
  const [dataTitle, setDataTitle] = useState(null);

  const parseIntro = (text) => <ReactMarkdown children={text} />;

  useEffect(() => {
    fetch(endpoints.about, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
      fetch(endpoints.home, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => setDataTitle(res))
        .catch((err) => err);
  }, []);

  return (
    <>
      <video autoPlay loop muted>
        <source src="./images/video2.mp4" type="video/mp4" />
      </video>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          {data ? (
            <Fade>
              <Row>
                <Col sm={12} md={12} lg={6} style={styles.introTextContainer}>
                  {/* {parseIntro(data.about)} */}
                  With over 8 years of professional software experience, I've built a diverse range of applications from small-scale to expansive enterprise software. 
                  <br></br>
                  <br></br>
                  Being proficient in both frontend and backend programming languages, I've deep-rooted expertise in HTML, CSS, JavaScript. This is further augmented by my hands-on experience with SPA frameworks like React and Angular.
                  <br></br>
                  <br></br>
                  Passionate about problem-solving, I've continuously sought challenges that refine my skills, ensuring that every solution I offer is both innovative and efficient.
                </Col>
                {/* <Col md={2} lg={0}></Col> */}
                <Col sm={12} md={10} lg={6} style={styles.introImageContainer}>
                  <img
                    src={data?.imageSource}
                    className="profile-pic"
                    alt="profile"
                  />
                  <Fade>
                    <div style={styles.mainContainer}>
                      <h1 style={styles.nameStyle}>{dataTitle?.name}</h1>
                      <h4 style={styles.countryStyle}>{dataTitle?.country}</h4>
                      <div style={{ flexDirection: "row" }}>
                        {/* <h2 style={styles.inlineChild}>I&apos;m&nbsp;</h2> */}
                        <Typewriter
                          options={{
                            loop: true,
                            autoStart: true,
                            strings: dataTitle?.roles,
                          }}
                        />
                      </div>
                      <Social />
                    </div>
                  </Fade>
                </Col>
              </Row>
            </Fade>
          ) : (
            <FallbackSpinner />
          )}
        </Container>
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
