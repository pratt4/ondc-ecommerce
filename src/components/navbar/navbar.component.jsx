import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import './navbar.styles.scss'

export default function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">ONDC </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <NavDropdown title="Categories" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Category 1</NavDropdown.Item>
              <NavDropdown.Item href="#action3">Category 2</NavDropdown.Item>
              <NavDropdown.Item href="#action3">Category 3</NavDropdown.Item>
              <NavDropdown.Item href="#action3">Category 4</NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.3">More Categories...</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4"></NavDropdown.Item>
             
            </NavDropdown>
            
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
          </Form>
            <Button variant="outline-success">Search</Button>
          </Nav>
          <div className='a'>

            <Nav.Link href="#action2" style={{ marginRight: '15px' }}>Sign In </Nav.Link>
            <Nav.Link href="#action2">Cart</Nav.Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
