import React, { useEffect } from 'react';
import { Col, Row, Container, Button } from 'react-bootstrap';
import facade from '../apiFacade';
import UserInfo from './UserInfo';
import AddBook from './AddBook';
import { useHistory } from 'react-router-dom';
import AllBooks from './AllBooks';

function DashBoard(props) {
  const history = useHistory();

  useEffect(() => {
    const user = facade.getUser();
    if (user) {
      history.push('/dashboard');
    } else {
      history.push('/');
    }
  }, []);

  const logout = () => {
    facade.logout();
    props.setLoggedIn(false);
    history.push('/');
  };

  return (
    <Container>
      <Button variant="primary" onClick={() => logout()}>
        Logout
      </Button>
      <Row>
        <Col>
          <UserInfo />
        </Col>
        <Col>
          <AddBook />
        </Col>
        <Col>
          <AllBooks />
        </Col>
      </Row>
    </Container>
  );
}
export default DashBoard;
