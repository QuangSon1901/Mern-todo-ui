import { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layout/AlertMessage';

function RegisterForm() {
    // Context
    const { registerUser } = useContext(AuthContext);

    // Router
    // const navigate = useNavigate();

    // Local state
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        comfirmPassword: '',
    });

    const [alert, setAlert] = useState(null);

    const onChangeRegisterForm = (e) => setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });

    const { username, password, comfirmPassword } = registerForm;

    const register = async (e) => {
        e.preventDefault();

        if (password !== comfirmPassword) {
            setAlert({ type: 'danger', message: 'Passwords do not match' });
            setTimeout(() => setAlert(null), 5000);
            return;
        }

        try {
            const registerData = await registerUser(registerForm);
            if (!registerData.success) {
                setAlert({ type: 'danger', message: registerData.message });
                setTimeout(() => setAlert(null), 5000);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <Form className="my-4" onSubmit={register}>
                <AlertMessage info={alert} />

                <Form.Group className="my-3">
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={onChangeRegisterForm}
                        placeholder="Username"
                        name="username"
                        required
                    />
                </Form.Group>
                <Form.Group className="my-3">
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={onChangeRegisterForm}
                        placeholder="Password"
                        name="password"
                        required
                    />
                </Form.Group>
                <Form.Group className="my-3">
                    <Form.Control
                        type="password"
                        value={comfirmPassword}
                        onChange={onChangeRegisterForm}
                        placeholder="Confirm Password"
                        name="comfirmPassword"
                        required
                    />
                </Form.Group>
                <Button variant="success" type="submit">
                    Register
                </Button>
            </Form>
            <p>
                Already have an account?
                <Link to="/login">
                    <Button variant="info" size="sm" className="m-2 mt-0 my-0">
                        Login
                    </Button>
                </Link>
            </p>
        </>
    );
}

export default RegisterForm;
