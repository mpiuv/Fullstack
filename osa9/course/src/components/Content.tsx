import Part from "./Part"
import CoursePart from "../types"
interface ContentProps {
    courseParts: CoursePart[];
  }
  
  const Content = (props: ContentProps): JSX.Element => {
     
    return      <div>{props.courseParts.map(part => <Part part={part} key={part.toString()}/>) as unknown as JSX.Element[]}</div>;
  };
  
  export default Content;