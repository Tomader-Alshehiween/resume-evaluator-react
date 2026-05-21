import { Link } from 'react-router-dom'

function Header() {
    return (
        <header>
            <div className="header-content">
                <h1>Resume Evaluator</h1>

                <nav>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </nav>
            </div>
        </header>
    )
}

export default Header