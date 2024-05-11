import { Link } from "react-router-dom"

const Header = () => {

    return (
        <header className="Header">
            <h1>Books I Read</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="book">Book</Link></li>
                    <li><Link to='user'>Users</Link></li>
                    <li><Link to='search'>Search</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header