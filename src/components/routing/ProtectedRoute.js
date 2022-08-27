import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { Spinner } from 'react-bootstrap';
import NavbarMenu from '../layout/NavbarMenu';

function ProtectedRoute({ element, ...rest }) {
    const {
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext);

    if (authLoading)
        return (
            <div className="spinner-container">
                <Spinner animation="border" variant="info" />
            </div>
        );
    return isAuthenticated ? (
        <>
            <NavbarMenu /> <Outlet />
        </>
    ) : (
        <Navigate to={'/login'} />
    );
}

export default ProtectedRoute;
