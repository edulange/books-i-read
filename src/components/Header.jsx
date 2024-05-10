import { Link } from "react-router-dom"

const Header = () => {

    return (
        <header className="Header">
            <h1>BookRedux</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="book">Book</Link></li>
                    <li><Link to='user'>Users</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header