import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { updateQuantity, removeItem } from "../cartSlice";
import "./cartPage.css";

function CartPage() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleQuantityChange = (id, amount) => {
    dispatch(updateQuantity({ id, amount }));
  };

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  ).toFixed(2); // Format to two decimal places

  if (cart.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <Row className="justify-content-center">
        {cart.map((item) => (
          <Col key={item.id} md={4} className="mb-4">
            <Card
              border="dark"
              text="dark"
              style={{ width: "100%", padding: "1rem" }}
            >
              <Card.Img className="imag" variant="top" src={item.image} />
              <hr />
              <Card.Body>
                <Card.Title style={{ height: "60px" }}>{item.title}</Card.Title>
                <Card.Text>
                  $ {(item.price * item.quantity).toFixed(2)}
                </Card.Text>
                <Card.Text>Quantity: {item.quantity}</Card.Text>
                <Button
                  variant="outline-dark"
                  onClick={() => handleQuantityChange(item.id, 1)}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
                <Button
                  variant="outline-dark"
                  onClick={() => handleQuantityChange(item.id, -1)}
                  className="ml-2"
                >
                  <FontAwesomeIcon icon={faMinus} />
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => handleRemove(item.id)}
                  className="trash"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="container mt-5 text-center">
        <h4>Total Amount: $ {totalAmount}</h4>
      </div>
    </div>
  );
}

export default CartPage;
