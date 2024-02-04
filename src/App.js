import "./App.css";
import Promotion from "./component/promotion/Promotion";
import Select from "./component/selectList/Select";
import SlideHeader from "./component/slideHeader/sliderHeader";

function App() {
  console.log(process.env.REACT_APP_GOODNUT_API)
  return (
    <>
      <SlideHeader />
      <Promotion />
      <Select />
    </>
  );
}

export default App;
