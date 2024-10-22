import React, { useEffect, useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Row, Button, Form, Col } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import NavigationLinks from "../NavigationLinks";
import 'react-phone-input-2/lib/style.css';
import RegistrationContext from '../../context/registration/registrationContext';

import background from "../../img/diesel_down_black.jpg";
export const options = [
    {
        name: 'Dyno Run',
        descr: "3 Runs at dyno",
        price: 600,
        id: 100
    },
    {
        name: "Dyno Reel",
        descr: "Short video of dyno experience",
        price: 0,
        id: 101
    },
    {
        name: "Custom Tune",
        descr: "Single tune based off dyno results",
        price: 100,
        id: 102
    },
    {
        name: "Post Tune Dyno Run",
        descr: "Second dyno run after tune to see the improvements",
        price: 300,
        id: 103
    },
];

const BookDyno = ({ history }) => {
    const registrationContext = useContext(RegistrationContext);
    const { getCurrentProfile, profile, loading, addTeamMembers, user } = registrationContext;

    const [formData, setFormData] = useState({
        customerFirstName: '',
        customerLastName: '',
        customerCelPhone: '',
        customerAddress: '',
        customerCity: '',
        customerState: '',
        customerZip: '',
        customerEmail: '',
        customerDOB: '',
        customerVehicleVIN: '',
        customerVehicleInfoAndUpgrades: '',
        customerVehiclePics: [],
        customerDesiredMusic: ''
    });

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhone = e => {
        setFormData({ ...formData, customerCelPhone: e });
    };

    const handleFileChange = e => {
        setFormData({ ...formData, customerVehiclePics: Array.from(e.target.files) });
    };

    const handleOptionChange = (e, option) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            setSelectedOptions([...selectedOptions, option]);
            setTotalPrice(totalPrice + option.price);
        } else {
            setSelectedOptions(selectedOptions.filter(o => o.id !== option.id));
            setTotalPrice(totalPrice - option.price);
        }
    };

    const onSubmit = e => {
        e.preventDefault();
        addTeamMembers(formData, history);
    };

    useEffect(() => {
        getCurrentProfile();
        //eslint-disable-next-line
    }, []);

    const styles = {
        container: {
            width: '100vw',
            height: '100vh',
            backgroundImage: `linear-gradient(rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)), url(${background})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            padding: '20px',
        },
        italicText: {
            fontStyle: 'italic',
            fontFamily: 'Georgia, serif',
            textAlign: 'center',
            marginBottom: '20px',
        },
        serviceOptions: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
        serviceOptionItem: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '8px',
        },
        serviceLabel: {
            marginLeft: '8px',
        }
    };

    return loading && profile === null ? (
        <Redirect to='/dashboard' />
    ) : (
        <div id='book-dyno' style={styles.container}>
            <Container className='pt-3'>
                <Row className="justify-content-center m-2">
                    <h1>Book Your Dyno Session</h1>
                </Row>
                <Row className="justify-content-center">
                    <p style={styles.italicText}>
                        If you prefer, you can always just call or text. We can handle this bullshit later. <br />(901) 921-3757
                    </p>
                </Row>
                <Form onSubmit={e => onSubmit(e)}>
                    <Form.Group controlId="formBasicFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control onChange={e => onChange(e)} value={formData.customerFirstName} name="customerFirstName" type="text" placeholder="Enter First Name" />
                    </Form.Group>

                    <Form.Group controlId="formBasicLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control onChange={e => onChange(e)} value={formData.customerLastName} name="customerLastName" type="text" placeholder="Enter Last Name" />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control onChange={e => onChange(e)} value={formData.customerEmail} name="customerLastName" type="text" placeholder="Enter Last Name" />
                    </Form.Group>

                    <Form.Group controlId="formBasicCellPhone">
                        <Form.Label>Cell Phone</Form.Label>
                        <PhoneInput country='us' onChange={e => handlePhone(e)} value={formData.customerCelPhone} name="customerCelPhone" />
                    </Form.Group>

                    <Form.Group controlId="formBasicAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control onChange={e => onChange(e)} value={formData.customerAddress} name="customerAddress" type="text" placeholder="Enter Address" />
                    </Form.Group>

                    <Form.Group controlId="formBasicCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control onChange={e => onChange(e)} value={formData.customerCity} name="customerCity" type="text" placeholder="Enter City" />
                    </Form.Group>

                    <Form.Group controlId="formBasicState">
                        <Form.Label>State</Form.Label>
                        <Form.Control as='select' onChange={e => onChange(e)} value={formData.customerState} name="customerState">
                            <option value="">Select State</option>
                            {/* Add state options here */}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formBasicZip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control onChange={e => onChange(e)} value={formData.customerZip} name="customerZip" type="text" placeholder="Enter Zip Code" />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control onChange={e => onChange(e)} value={formData.customerEmail} name="customerEmail" type="email" placeholder="Enter Email" />
                    </Form.Group>

                    <Form.Group controlId="formBasicDOB">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control onChange={e => onChange(e)} value={formData.customerDOB} name="customerDOB" type="date" />
                    </Form.Group>

                    <Form.Group controlId="formBasicVehicleVIN">
                        <Form.Label>Vehicle VIN</Form.Label>
                        <Form.Control onChange={e => onChange(e)} value={formData.customerVehicleVIN} name="customerVehicleVIN" type="text" placeholder="Enter Vehicle VIN" />
                    </Form.Group>

                    <Form.Group controlId="formBasicVehicleInfo">
                        <Form.Label>Vehicle Info & Upgrades</Form.Label>
                        <Form.Control as="textarea" rows={4} onChange={e => onChange(e)} value={formData.customerVehicleInfoAndUpgrades} name="customerVehicleInfoAndUpgrades" placeholder="Enter details about vehicle upgrades and modifications" />
                    </Form.Group>

                    <Form.Group controlId="formBasicVehiclePics">
                        <Form.Label>Upload Vehicle Pics/Media</Form.Label>
                        <Form.Control onChange={e => handleFileChange(e)} name="customerVehiclePics" type="file" multiple />
                    </Form.Group>

                    <Form.Group controlId="formBasicDesiredMusic">
                        <Form.Label>Desired Music</Form.Label>
                        <Form.Control onChange={e => onChange(e)} value={formData.customerDesiredMusic} name="customerDesiredMusic" type="text" placeholder="Enter desired background music for your video" />
                    </Form.Group>

                    {/* Radio Buttons for Options */}
                    <Form.Group controlId="formOptions">
                        <Form.Label>Select Services:</Form.Label>
                        <div style={styles.serviceOptions}>
                            {options.map(option => (
                                <div key={option.id} style={styles.serviceOptionItem}>
                                    <Form.Check
                                        type="checkbox"
                                        label=""
                                        checked={selectedOptions.some(o => o.id === option.id)}
                                        onChange={(e) => handleOptionChange(e, option)}
                                    />
                                    <span style={styles.serviceLabel}>
                                        {`${option.name} - $${option.price}`}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Form.Group>

                    {/* Display Total Price */}
                    <Row className="justify-content-center mb-3">
                        <h5>Total Price: ${totalPrice}</h5>
                    </Row>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <NavigationLinks user={user} currentPage="book-dyno" />
            </Container>
        </div >
    );
};

export default BookDyno;