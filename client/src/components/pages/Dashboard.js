import React, { useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import Spinner from '../Spinner';
import DashboardActions from '../dashboard/DashboardActions';
import TeamMembers from '../dashboard/TeamMembers';
import background from '../../img/runner_ties_shoes.jpg';
import NavigationLinks from "../NavigationLinks";
import RegistrationDescription from '../dashboard/RegistrationDescription';

import RegistrationContext from '../../context/registration/registrationContext';

const Dashboard = () => {
    const registrationContext = useContext(RegistrationContext)
    const {
        getCurrentProfile,
        profile,
        loading,
        user,
    } = registrationContext

    useEffect(() => {
        getCurrentProfile()
        //eslint-disable-next-line
    }, [])

    const styles = {
        container: {
            backgroundImage: `url(${background})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100vh'
        },

    };
    console.log('In Dashboard')
    console.log({ registrationContext })
    return !user.paid ? (
        !user.isAuthenticated || user.email === '' ? (
            <Redirect to="/" />
        ) : <Redirect to="/checkout" />
    ) : loading && profile === null ? (
        <Spinner />
    ) : (
        <div id='cover' style={styles.container}>
            <Container className='pt-3'>
                {profile && profile.teamName !== '' && <Row className="justify-content-center mt-5"><h1>Team: {profile?.teamName}</h1></Row>}
                <Row className="justify-content-center m-3">
                    <h3>Welcome {user?.name}</h3>
                </Row>
                {profile !== null ? (
                    <>
                        <RegistrationDescription event={user.eventId} />
                        <TeamMembers />
                        <DashboardActions />
                    </>
                ) : (
                    <>
                        <Row className="justify-content-center m-3">
                            <p>
                                You have not setup a team profile, please add some
                                info
                            </p>
                        </Row>

                        <NavigationLinks user={user} currentPage="dashboard" />
                    </>
                )}
            </Container>
        </div>
    )
}

export default Dashboard