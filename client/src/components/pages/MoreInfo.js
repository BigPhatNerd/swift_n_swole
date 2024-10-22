import React, { useEffect, useContext, useState } from "react";
import { Container, Row, Accordion, Card, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import ChooseEventModal from "../modals/ChooseEventModal";
import RegistrationContext from "../../context/registration/registrationContext";
import axios from "axios";
import NavigationLinks from "../NavigationLinks";

import background from "../../img/diesel_down_black.jpg";

//

const MoreInfo = () => {
    const registrationContext = useContext(RegistrationContext);
    console.log("More Info");
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
            width: "100vw",
            height: "100vh",
        },
    };

    return (
        <div id="cover" style={styles.container}>
            <Container className="pt-3">
                <Row className="justify-content-center m-4">
                    <h2>More Info: Dyno and Performance Tuning</h2>
                </Row>

                {/* About the Dynocom 15,000 Series */}
                <Row className="m-3 text-left">
                    <h3>About Our Dynocom 15,000 Series Dyno:</h3>
                    <p>
                        Our Dynocom 15,000 Series dynamometer is a state-of-the-art system designed to handle high-performance testing for both diesel and high-horsepower drag vehicles. Key features include:
                    </p>
                    <ul>
                        <li><strong>Speed & Power Capacity:</strong> Supports speeds over 240 MPH and 2400+ HP.</li>
                        <li><strong>Robust Design:</strong> Built to withstand axle weights up to 14,000 lbs with a track width range of 30" to 102".</li>
                        <li><strong>Rugged Build:</strong> Center-mounted eddy brake, capable of handling an additional 850+ HP and over 3000 ft-lbs of torque, making it ideal for high-torque diesel engines.</li>
                        <li><strong>Superior Traction & Stability:</strong> Features X Factor Knurling for maximum traction and a revolutionary hybrid-pyramid frame design for better braking and smoother operation.</li>
                        <li><strong>Real-Time Data:</strong> Monitor torque and horsepower in real-time, allowing instant feedback for tuning adjustments.</li>
                    </ul>
                    <p>
                        The 15,000 Series offers significant advantages over cradle roll dynamometers, including reduced tire deformation, better real-world simulation, and improved repeatability, providing a superior testing environment.
                    </p>
                </Row>

                {/* About Performance Tuning */}
                <Row className="m-3 text-left">
                    <h3>Taking the Data to Tune Your Vehicle:</h3>
                    <p>
                        Performance tuning involves analyzing the real-time data captured during dyno testing to optimize your engine's performance. Here’s how we use this data:
                    </p>
                    <ul>
                        <li>
                            <strong>Fuel & Timing Adjustments:</strong> By observing changes in torque and horsepower at varying speeds, we can fine-tune your vehicle’s fuel and ignition maps to maximize efficiency and power output.
                        </li>
                        <li>
                            <strong>Enhanced Engine Response:</strong> Our testing allows precise adjustments to ensure smoother acceleration, better throttle response, and optimal power delivery.
                        </li>
                        <li>
                            <strong>Customized Tuning Solutions:</strong> Each vehicle is different, and we use the data to create a custom tuning solution that meets your specific performance goals, whether it's for street performance, drag racing, or heavy-duty applications.
                        </li>
                    </ul>
                    <p>
                        The combination of cutting-edge technology and expert tuning ensures your diesel or high-performance vehicle runs at its best, providing power, reliability, and improved drivability.
                    </p>
                </Row>

                <NavigationLinks user={user} currentPage="more-info" />
                {/* <Row className="justify-content-center m-4">
                    <h2 style={{
                        fontWeight: "bold",
                        color: "#FF4500",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                        fontStyle: "italic",
                        fontSize: "2.5rem"
                    }}>
                        Fire it up and Diesel Down
                    </h2>
                </Row> */}

                <br />

            </Container>
        </div>
    );
};

export default MoreInfo;
