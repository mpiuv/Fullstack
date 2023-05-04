import CoursePart from '../types'

interface PartProps {
    part: CoursePart;
  }

const Part = (props: PartProps): JSX.Element => {
    switch (props.part.kind){ 
      case 'background': 
        return <div><p><h2>{props.part.name}</h2></p>
        <p><i>{props.part.description}</i></p>
        <p>{props.part.backgroundMaterial}</p>
        </div>
        
      case 'basic':
        return <div><p><h2>{props.part.name}</h2></p>
        <p> project exercises {props.part.exerciseCount}</p></div>;
        
      case 'group':
        return <div><p><h2>{props.part.name}</h2></p>
                <p> project exercises {props.part.exerciseCount}</p>
                <p> group project count {props.part.groupProjectCount}</p>
              </div>
        
      case 'special':
        return <div><p><h2>{props.part.name}</h2></p>
                <p> project exercises {props.part.exerciseCount}</p>
                <p>{props.part.requirements}</p>
              </div>
   }
}
export default Part