import { useDispatch } from "react-redux";
import classes from "./listselect.module.css";
import { Link } from "react-router-dom";
import { statusAction } from "../Store/redux";

const ListSelect = (props) => {
  const dispatch = useDispatch();

  const onSubmitHandler = (e, title, filter) => {
    dispatch(statusAction.changeFilter({ filter: filter, title: title }));
  };
  return (
    <Link to={props.id} onClick={(e) => {
      onSubmitHandler(e, props.filter.title, props.filter.filter);
    }}><div
      className={classes.listselect}
      style={{
        backgroundImage: `url(${props.image})`,
        backgroundPosition: props.position,
      }}
    >
      <h1>{props.children}</h1>
    </div>
    </Link>
  );
};

export default ListSelect;
