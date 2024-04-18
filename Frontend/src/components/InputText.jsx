import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function InputText({ atribut, vrijednost }) {
  return (
    <Form.Group>
        <Form.Label className='labelaAtributa'>{atribut}</Form.Label>
        <Form.Control
            name={atribut}
            defaultValue={vrijednost}
        />
    </Form.Group>
  );
}

InputText.propTypes = {
    atribut: PropTypes.string.isRequired,
    vrijednost: PropTypes.any,
};