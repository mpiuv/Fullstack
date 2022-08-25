const Header = (props) => { return (
  <div>
     <h1>
       {props.course}
    </h1>
  </div>)
    }

const Part= (props) =>{return (
  <div>
    <p>{props.part} {props.exercises}</p>
  </div>
)

}

const Content= (props) => {      
  return (
    <div>
      {props.parts.map(part =><Part key={part.id} part={part.name} exercises={part.exercises}/>)}
    </div>)
}
const Total= (props) => {
  const result = props.parts.map(part => part.exercises)
  const sum = result.reduce((partialSum, a) => partialSum + a, 0)

  return(<div>
  <p>Number of exercises {sum}</p>
</div>)}

const Courses = (props) =>{
  return (props.courses.map(course => <Course key={course.id} course={course}/>))
}

const Course = (props) =>{
  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} /> 
    </div>
  )
  }
  
  

export default Courses
