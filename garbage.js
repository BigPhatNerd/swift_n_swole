import React, { useEffect, useContext, useState, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import RegistrationContext from "../../context/registration/registrationContext";
import VendingContext from "../../context/vending/vendingContext";
import { priceCentsToDollars } from "../../utils/helpers";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";

// ...[other parts of your component]

return (
  <>
    <Container>
      <Row className="justify-content-center">
        <Col xs={12}>
          <h2>Admin Dashboard</h2>
          <h4>Max qty is 100 and inventory cannot be reduced</h4>
        </Col>
      </Row>
      <Row>
        {products.map((product, index) => (
          <Col md={6} key={product._id}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                {product.lastUpdatedBy && product.lastUpdatedBy.email ? (
                  <Card.Subtitle className="mb-2 text-muted">
                    Last updated by: {product.lastUpdatedBy.email}
                  </Card.Subtitle>
                ) : null}
                <InputGroup className="mb-3">
                  <InputGroup.Text>Price ($):</InputGroup.Text>
                  <FormControl
                    type="number"
                    step="0.01"
                    ref={(input) => (productRefs.current[index] = input)}
                    defaultValue={priceCentsToDollars(product.priceCents)}
                    onChange={(e) =>
                      handleChange(
                        product._id,
                        "priceCents",
                        parseFloat(e.target.value) * 100,
                        productRefs.current[index]
                      )
                    }
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Quantity:</InputGroup.Text>
                  <FormControl
                    type="number"
                    step="1"
                    min={product.quantity}
                    max="100"
                    defaultValue={product.quantity}
                    ref={(input) => (quantityRefs.current[index] = input)}
                    onChange={(e) =>
                      handleChange(
                        product._id,
                        "quantity",
                        parseInt(e.target.value, 10)
                      )
                    }
                    onKeyDown={(e) => e.preventDefault()}
                    onPaste={(e) => e.preventDefault()}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </InputGroup>
                {updates[product._id] && (
                  <>
                    <Button
                      variant="primary"
                      onClick={() => handleUpdate(product._id)}
                    >
                      Update
                    </Button>{" "}
                    <Button
                      variant="secondary"
                      onClick={() => handleReset(index, product)}
                    >
                      Reset
                    </Button>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} md={6} className="text-center">
          <Button variant="danger" onClick={handleLogoutClick} className="mb-3">
            Logout
          </Button>
          <p>
            Return to the <Link to="/">vending machine</Link>.
          </p>
        </Col>
      </Row>
    </Container>
  </>
);
