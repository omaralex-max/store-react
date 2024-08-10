import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { carData } from '../assets/data/api';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../cartSlice';
import './cards.css';

function Cards() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedItems, setAddedItems] = useState(new Set()); 
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await carData();
        setData(response);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const addedItemIds = new Set(cart.map(item => item.id));
    setAddedItems(addedItemIds);
  }, [cart]);

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    setAddedItems(new Set(addedItems.add(product.id)));
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="container mt-5">
      <Row className="justify-content-center">
        {data.map(card => (
          <Col key={card.id} md={4} className='mb-3'>
            <Card className='cardbody' border="dark" text="dark" style={{ width: '100%', padding: '1rem' }}>
              <Card.Img className='imag' variant="top" src={card.image} />
              <hr />
              <Card.Body>
                <Card.Title className='cardititle' style={{ height: '100px' }}>{card.title}</Card.Title>
                <Card.Text className='cardprice'>$ {card.price}</Card.Text>
                <Link to={`/singlePageProduct/${card.id}`}>
                  <Button className='ml-2' variant="outline-dark">View</Button>
                </Link>
                <Button
                  variant="outline-dark"
                  onClick={() => handleAddToCart(card)}
                  className='ml-2'
                  disabled={addedItems.has(card.id)}
                >
                  {addedItems.has(card.id) ? 'Added to Cart' : 'Add to Cart'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Cards;
