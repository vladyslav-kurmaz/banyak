import { FC } from "react"

import intaIcon from '../../image/social/instagram.svg';
import linkIdIcon from '../../image/social/linkedin.svg';

import './Footer.scss';

const Footer: FC = () => {
  return (
    <footer className="footer">


        <ul className="footer__list">
          <li className="footer__list-item">
            <a href="#">Політика конфіденційності</a>
          </li>
          <li className="footer__list-item">
            <span>banyak.hub@gmail.com</span>
            <span>© 2023 BANYAK</span>
          </li>
          <li className="footer__list-item">
            <span>Ми у соціальних мережах:</span>
            <a href="#">
              <img src={linkIdIcon} alt="LinkId" />
            </a>
            <a href="#">
              <img src={intaIcon} alt="Insta" />
            </a>
          </li>
        </ul>

    
      
    </footer>
  )
}

export default Footer;