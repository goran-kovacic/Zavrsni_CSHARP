import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function InputCheckbox({ atribut, vrijednost }) {
  return (
    <Form.Group controlId={atribut}>
      <Form.Check 
          className='labelaAtributa'
          label={atribut}
          name={atribut}
          defaultChecked={vrijednost}
      />
    </Form.Group>
  );
}

InputCheckbox.propTypes = {
    atribut: PropTypes.string.isRequired,
    vrijednost: PropTypes.bool,
};