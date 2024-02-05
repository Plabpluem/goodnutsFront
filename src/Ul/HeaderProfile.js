import { Link } from 'react-router-dom'
import classes from './headerprofile.module.css'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { getProductId } from '../Util/Auth'

const HeaderProfile = () => {
    const productId = getProductId()
    const status = useSelector(state => state.status)
  
    return (
        <div className={classes.headerContainer}>
            <Link to={`/profile/${productId}`} className={status.statusProfile?`${classes.active}`:''}>ข้อมูลส่วนตัว</Link>
            <Link to='/profile/orderlist' className={status.statusList?`${classes.active}`:''}>รายการสั่งซื้อ</Link>
        </div>
    )
}

export default HeaderProfile