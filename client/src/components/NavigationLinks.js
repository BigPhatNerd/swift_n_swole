import React from "react";
import { Link } from "react-router-dom";
import { Row } from "react-bootstrap";

const NavigationLinks = ({ user, currentPage }) => {
    return (
        <Row className="justify-content-center m-4">
            {/* Conditionally render the links based on the current page */}
            {currentPage !== "landing" && (
                <Link to="/" className="custom-link">
                    Home
                </Link>
            )}
            {currentPage !== "more-info" && (
                <Link to="/more-info" className="custom-link">
                    More Info
                </Link>
            )}
            {currentPage !== "how-it-works" && (
                <Link to="/how-it-works" className="custom-link">
                    How It Works
                </Link>
            )}
            {currentPage !== "book-dyno" && (
                <Link to="/book-dyno" className="custom-link">
                    Book a Dyno
                </Link>
            )}
            {currentPage !== "about-us" && (
                <Link to="/about-us" className="custom-link">
                    About Us
                </Link>
            )}

            {/* Conditionally render the dashboard or login link based on authentication */}
            {user && user.isAuthenticated ? (
                <Link to="/dashboard" className="custom-link">
                    Dashboard
                </Link>
            ) : (
                <Link to="/login" className="custom-link">
                    Login
                </Link>
            )}
        </Row>
    );
};

export default NavigationLinks;
