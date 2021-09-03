import React, { useEffect } from 'react'
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart,removeFromCart } from '../actions/cartActions'
import Message from '../components/Message'
import { ORDER_RESET } from '../constants/orderConsts'


const CartScreen = ({ match, location, history }) => {
    
    const productId = match.params.id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    const { cartItems } = cart

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }

        if (productId) {
            dispatch(addToCart(productId,qty))
        }
    }, [dispatch, qty, productId,history,userInfo])
    
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
        dispatch({type:ORDER_RESET})
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                <br />
            
                {cartItems.length === 0
                    ? <Message> Your cart is empty <Link to='/'>Go Back</Link></Message>
                    : (
                        <ListGroup variant='flush'>
                            {cartItems.map((cartItem) => (
                                <ListGroup.Item key={cartItem.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image
                                                src={cartItem.image}
                                                alt={cartItem.name}
                                                fluid
                                                rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${cartItem.product}`}>
                                                {cartItem.name}
                                            </Link>
                                        </Col>
                                        <Col md={2}>
                                            ${cartItem.price}
                                        </Col>
                                        <Col md={2}>
                                            <Form.Control as='select'
                                                            value={cartItem.qty}
                                                            onChange={
                                                                (e) => dispatch(addToCart(
                                                                    cartItem.product,
                                                                    Number(e.target.value)))
                                                            }>
                                                                {[...Array(cartItem.countInStock).keys()].map(x => (
                                                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                                )
                                                                    
                                                                )}
                                                    </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <Button
                                                type='button'
                                                variant='light'
                                                onClick={() =>
                                                    removeFromCartHandler(cartItem.product)
                                                }
                                            >
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                    ))}
                        </ListGroup>
                    )
                }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price,0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                type='button'
                                className="btn-block btn-with-full-width"
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
