import './Footer.css';
import logo from '../../assets/img/logo.svg'

function Footer() {
    return (
        <footer>
        <div className="container footer_container">
            <img src={logo} alt=""/>
            <span>© 2026 Bolos do Jacquin. A excelência da patisserie francesa.</span>
            <nav>
                <a href="https://www.instagram.com" target='_blank'>Instagram</a>
                <a href="https://www.facebook.com" target='_blank'>Facebook</a>
            </nav>
        </div>
    </footer>
    )
}

export default Footer;