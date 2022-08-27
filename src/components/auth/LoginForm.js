import { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layout/AlertMessage';

function LoginForm() {
    // Context
    const { loginUser } = useContext(AuthContext);

    // Router
    // const navigate = useNavigate();

    // Local state
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    });

    const [alert, setAlert] = useState(null);

    const onChangeLoginForm = (e) => setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

    const { username, password } = loginForm;

    const login = async (e) => {
        e.preventDefault();

        try {
            const loginData = await loginUser(loginForm);
            if (loginData.success) {
                // navigate('/dashboard');
            } else {
                setAlert({ type: 'danger', message: loginData.message });
                setTimeout(() => setAlert(null), 5000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Form className="my-4" onSubmit={login}>
                <AlertMessage info={alert} />

                <Form.Group className="my-3">
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={onChangeLoginForm}
                        placeholder="Username"
                        name="username"
                        required
                    />
                </Form.Group>
                <Form.Group className="my-3">
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={onChangeLoginForm}
                        placeholder="Password"
                        name="password"
                        required
                    />
                </Form.Group>
                <Button variant="success" type="submit">
                    Login
                </Button>
            </Form>
            <p>
                Don't have an account?
                <Link to="/register">
                    <Button variant="info" size="sm" className="m-2 mt-0 my-0">
                        Register
                    </Button>
                </Link>
            </p>
        </>
    );
}

export default LoginForm;
