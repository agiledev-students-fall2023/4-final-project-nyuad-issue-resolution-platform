import { useParams, Link } from 'react-router-dom';

const UnauthorizedPage = () => {
    const params = useParams();
    const attemptedUrl = params['*'] || 'unknown';

    return (
        <div className="unauthorized-page">
            <h1 className="attention-message">Authentication required!</h1>
            <p>
                This server could not verify that you are authorized to access the URL
                &quot;{attemptedUrl}&quot;. You either supplied the wrong credentials (e.g., bad
                password), or you do not have permission to access the URL.
            </p>
            <Link to="/" className="login-link">Go to Login Page</Link>
        </div>
    );
};

export default UnauthorizedPage;
