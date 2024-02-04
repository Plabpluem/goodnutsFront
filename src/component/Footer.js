import classes from "./footer.module.css";
import ig from "../img/social/icons8-instagram.svg";
import facebook from "../img/social/icons8-facebook.svg";
import line from "../img/social/icons8-line.svg";

const Footer = () => {
  return (
    <footer>
      <div className={classes.brand}>
        <div className={classes.detail}>
          <h3>GOODNUTS</h3>
          <p>
            ถั่วอบพรีเมียมปรุงรสเจ้าแรก!อัลมอนด์ มะม่วงหิมพานต์ แมคคาเดเมีย
            วอลนัท พีแคน พิสตาชิโอ
          </p>
          <div className={classes.social}>
            <a href="https://www.instagram.com/goodnutsbkk/" target="_blank" rel="noopener noreferrer">
              <img src={ig} alt="instagram-new" />
            </a>
            <a href="https://www.facebook.com/Goodnutsbkk" target="_blank" rel="noopener noreferrer">
              <img src={facebook} alt="facebook-new" />
            </a>
            <a href="line://ti/p/@goodnuts" target="_blank" rel="noopener noreferrer">
              <img src={line} alt="line-new" />
            </a>
          </div>
          <span>COPYRIGHT 2023 by All Real Good Co.,LTD</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
