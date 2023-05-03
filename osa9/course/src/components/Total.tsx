interface TotalProps {
    courseParts: { exerciseCount: number, name: string }[];
  }
 
  const Total = (props: TotalProps): JSX.Element => {
    return      <p>
    Number of exercises{" "}
    {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>;
  };
  
  export default Total;