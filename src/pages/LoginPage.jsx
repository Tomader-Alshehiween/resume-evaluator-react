import { useState } from 'react'
import { Link } from 'react-router-dom'

function LoginPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(e) {
        e.preventDefault()

        console.log({
            email,
            password,
        })
    }

    return (
        <main>
            <section>

                <form onSubmit={handleSubmit}>

                    <div>
                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit">
                        Login
                    </button>

                    <p>
                        Don&apos;t have an account?{' '}
                        <Link to="/register">
                            Register
                        </Link>
                    </p>

                </form>

            </section>
        </main>
    )
}

export default LoginPage