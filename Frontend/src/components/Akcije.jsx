import { Row,Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Akcije({ odustani, akcija }) {
  return (
    <Row className="akcije">
        <Col>
            <Link 
            className="btn btn-danger"
            to={odustani}>Odustani</Link>
        </Col>
        <Col>
            <Button
                variant="primary"
                type="submit"
            >
                {akcija}
            </Button>
        </Col>
    </Row>
  );
}

Akcije.propTypes = {
    odustani: PropTypes.string.isRequired,
    akcija: PropTypes.string.isRequired,
};