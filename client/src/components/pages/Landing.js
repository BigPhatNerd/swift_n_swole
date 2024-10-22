import React, { useEffect, useContext } from "react";
import { Container, Row } from "react-bootstrap";
import RegistrationContext from "../../context/registration/registrationContext";
import background from "../../img/diesel_down_black.jpg";
import NavigationLinks from "../NavigationLinks"; // Import the new component

const Landing = () => {
  const registrationContext = useContext(RegistrationContext);
  console.log("Landing");
  console.log({ registrationContext });
  const { loadUser, user } = registrationContext;

  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  }, []);

  const styles = {
    container: {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)),url(${background})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      width: "100vw",
      minHeight: "100vh",
    }
  };

  return (
    <div id="cover" style={styles.container}>
      <Container className="pt-3">
        <Row className="justify-content-center m-2">
          <h1>Welcome to</h1>
        </Row>
        <Row className="justify-content-center m-2">
          <h2>Diesel Down</h2>
        </Row>
        <Row className="justify-content-center m-2">
          <h3>Dynos & Performance Tuning</h3>
        </Row>

        <Row className="justify-content-center m-2">
          <p>
            Unlock your engine's potential. Our Dynocom 15,000 Series dynometer is designed to handle the power of
            diesel engines, providing accurate and reliable performance data. Whether you’re looking
            to increase horsepower, torque, throttle response or fuel efficiency, our dyno testing will provide the data to allow
            you to make informed decisions about your engine’s performance. Our performance
            tuning services can help you achieve your goals.
          </p>
        </Row>
        <Row className="justify-content-center m-2">
          <p>
            Any and all questions are welcomed at any time. <br />
            Call or text us a (901) 921-3757
          </p>
        </Row>

        {/* Use the new NavLinks component */}
        <NavigationLinks user={user} currentPage="landing" />

        {/* <Row className="justify-content-center m-4">
          <h2 style={{
            fontWeight: "bold",
            color: "#C70C18",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            fontStyle: "italic",
            fontSize: "2.5rem"
          }}>
            Fire it up and Diesel Down
          </h2>
        </Row> */}
      </Container>
    </div>
  );
};

export default Landing;
