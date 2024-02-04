import { Link } from 'react-router-dom'
import classes from './navbar.module.css'
const NavbarFilter = (props) => {
    const onChangeData = (e,title,filterData) => {
        e.preventDefault()
        props.changeFilterNavbar(filterData)
        props.changeTitle(title)
    }
    return (
        <nav className={classes.navContainer}>
            <div className={classes.headerFilter}>
                <h1>สินค้า</h1>
                <ul>
                    <li><Link onClick={(e)=> {onChangeData(e,'สินค้าทั้งหมด',["Mixednuts","CaramelMixnut","CaramelCoffee",'Macadamia',"Pistachio",'Walnuts','Peacan','CaramelMixnut','CaramelMacadamia',"CaramelCoffee","Cookiesingapore","Cerealcookies","Apricotdried","Cranberrydried"])}}>สินค้าทั้งหมด</Link></li>
                    <li><Link onClick={(e)=>{onChangeData(e,'Mixed Nuts',[ "Mixednuts","CaramelMixnut","CaramelCoffee"])}}>Mixed Nuts / ถั่วรวม</Link></li>
                    <li><Link onClick={(e)=>{onChangeData(e,'Macadamia',[ 'Macadamia','CaramelMacadamia'])}}>Macadamia / แมคคาเดเมีย</Link></li>
                    <li><Link onClick={(e)=>{onChangeData(e,'Pistachios',[ "Pistachio"])}}>Pistachios</Link></li>
                    <li><Link onClick={(e)=>{onChangeData(e,'Walnuts',[ "Walnuts",])}}>Walnuts</Link></li>
                    <li><Link onClick={(e)=>{onChangeData(e,'Peacans',[ "Peacan",])}}>Peacans</Link></li>
                    <li><Link onClick={(e)=>{onChangeData(e,'Sweet treats & Cookies',[ 'CaramelMixnut','CaramelMacadamia',"CaramelCoffee","Cookiesingapore","Cerealcookies",])}}>Sweet treats & Cookies</Link></li>
                    <li><Link onClick={(e)=>{onChangeData(e,'Dried Fruits',[ "Apricotdried","Cranberrydried",])}}>Dried Fruits</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default NavbarFilter