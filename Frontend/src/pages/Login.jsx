import { Button, Container, Form } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';

export default function Login() {
    const { login } = useAuth();

    function handleSubmit(e) {
        e.preventDefault();

        const podaci = new FormData(e.target);
        login({
            email: podaci.get('email'),
            password: podaci.get('lozinka'),
        });
    }

    return (
        <Container>
            <p>user: admin</p>
            <p>pw: admin</p>

            <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3' controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type='text'
                        name='email'
                        placeholder='admin'
                        maxLength={255}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' name='lozinka' required />
                </Form.Group>
                <Button variant='primary' className='gumb' type='submit'>
                    Submit
                </Button>
            </Form>
        </Container>
    )

}