import { Link } from "react-router-dom";

const Header = ({ gu }) => {
    return (
        <header className="Header">
            <div className="inner">
                <h1>
                    <div className="logo">
                        <Link to='/'>부산맛집</Link>
                    </div>
                </h1>

                <nav className="gnb">
                    <ul>
                        {
                            gu.map(it => {
                                return (
                                    <li key={it}><Link to={`/${it}`}>{it}</Link></li>
                                )
                            })
                        }
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;