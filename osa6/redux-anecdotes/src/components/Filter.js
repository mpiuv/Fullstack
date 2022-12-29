import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const filter_ = event.target.value;
    dispatch(setFilter(filter_));
  }
  const style = {
    marginBottom: 10
  }
  
  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}
  
export default Filter