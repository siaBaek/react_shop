/* eslint-disable */
import React, { useState, useContext, lazy, Suspense } from "react";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import "./App.css";
import Data from "./data.js";
// import Detail from './Detail.js';
let Detail = lazy(() => {
  return import("./Detail.js");
}); // 컴포넌트 필요한 순간에 import해줌
import axios from "axios";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import Cart from "./Cart.js";

export let 재고context = React.createContext();

function App() {
  let [shoes, shoes변경] = useState(Data);
  let [재고, 재고변경] = useState([10, 11, 12]);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            ShoeShop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/detail">
                Detail
              </Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Switch>
        {" "}
        {/* 한번에 하나의 <Route>만 보여주고 싶다면 사용 */}
        <Route exact path="/">
          {/* Switch로 인해 exact 쓰지않고 해결 가능해짐 */}
          <div className="jum background">
            <h1>20% Season Off</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for
              calling extra attention to featured content or information.
            </p>
            <p>
              <Button variantx="primary">Learn More</Button>{" "}
            </p>
          </div>

          <div className="container">
            <재고context.Provider value={재고}>
              <div className="row">
                {shoes.map((a, i) => {
                  return <Card shoes={shoes[i]} i={i} />;
                })}
              </div>
            </재고context.Provider>

            <button
              className="btn btn-primary"
              onClick={() => {
                axios
                  .get("https://codingapple1.github.io/shop/data2.json")
                  // .then(res=>console.log(res))
                  .then((result) => {
                    shoes변경([...shoes, ...result.data]);
                  });
              }}
            >
              더보기
            </button>
          </div>
        </Route>
        <Route path="/detail/:id">
          <재고context.Provider value={재고}>
            <Suspense fallback={<div>로딩중이에요</div>}>
              <Detail shoes={shoes} 재고={재고} 재고변경={재고변경} />
            </Suspense>
          </재고context.Provider>
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        {/* <Route path="/어쩌구" component={Modal} ></Route> */}
        <Route path="/:id">
          <div>아무거나</div>
        </Route>
      </Switch>
    </div>
  );
}

function Card(props) {
  let 재고 = useContext(재고context);
  let history = useHistory();

  return (
    <div
      className="col-md-4"
      onClick={() => {
        history.push("/detail/" + props.shoes.id);
      }}
    >
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"
        }
        width="100%"
      />
      <h4>{props.shoes.title}</h4>
      <p>
        {props.shoes.content} & {props.shoes.price}
      </p>
      {/* <Test></Test> */}
    </div>
  );
}

function Test() {
  let 재고 = useContext(재고context);
  return <p>{재고}</p>;
}

export default App;
