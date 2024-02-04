import classes from './loadingpage.module.css'

const LoadingPage = ({children})=> {
    return (
        <div className={`${classes.confirmcartContainer} ${classes.spinner}`}>
          {children}
        </div>
      );
}

export default LoadingPage