import React, { useEffect, useContext, useState } from "react";
import { Container, Row, Accordion, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import ChooseEventModal from "../modals/ChooseEventModal";
import NavigationLinks from "../NavigationLinks";
import RegistrationContext from "../../context/registration/registrationContext";
import axios from "axios";

import background from "../../img/diesel_down_black.jpg";

//

const AboutUs = () => {
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
                    <h2>How It Started</h2>
                </Row>
                <Row className="m-3 text-left">
                    <p>
                        I've always had an affinity for power, speed, and noise. I drove a 1998 Dodge Ram 3500 dually for 15 years and was endlessly fascinated by its power and output. I tuned my first diesel in 2007 and was blown away by the transformation in power and responsiveness. It was a thrill to see how much of a difference tuning could make. In 2011, I rebuilt my first gas engine and, after adding modifications and a tune, was less than impressed. It just didn't deliver the same thrill.
                    </p>
                    <p>
                        Over the years, I continued to add mods and tunes to a couple Ford F-350s and a Chevy Duramax, but my heart always took me back to my first love: Dodge. Eventually, I found an old 2000 Dodge Ram 2500 5.9L Cummins, and I knew I had to have it. My son and I started working on it together, and it quickly became more than just a project—it became an obsession.
                    </p>
                    <p>
                        School has never been my strong suit, but data and numbers always came easily to me. For 20 years, I owned a landscape construction company before unexpectedly finding a new path in computer programming. My career as a software developer allowed me to dive deep into data— reading, analyzing, and manipulating it every day. Between my passion for data, speed, power, and noise, the decision was simple: buy a dyno, where I could create more of all the things I loved.
                    </p>
                </Row>

                <NavigationLinks user={user} currentPage="about-us" />
            </Container>

        </div>
    );
};

export default AboutUs;
