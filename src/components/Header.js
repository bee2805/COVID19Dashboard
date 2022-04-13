const Header = () => {
    return(
        
        <div className="Nav">
            <div className="Logo"></div>
            <ul>
                <a href="/"><div className="NavItem"><li>Home</li></div></a>
                <a href="/Comparative"><div className="NavItem"><li>Comparative Data</li></div></a>
                <a href="/Timeline"><div className="NavItem"><li>Timeline Data</li></div></a>
            </ul>
        </div>

    );
}

export default Header;