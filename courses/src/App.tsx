const App = () => {
  /**
   * Helper function for exhaustive type checking
   */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
  }

  const courseName = "Half Stack application development"
  // new types
  interface CoursePartBase {
    name: string
    exerciseCount: number
    type: string
  }

  interface CoursePartWithDescription extends CoursePartBase {
    description: string
  }

  interface CourseNormalPart extends CoursePartWithDescription {
    type: "normal"
  }

  interface CourseProjectPart extends CoursePartBase {
    type: "groupProject"
    groupProjectCount: number
  }

  interface CourseSubmissionPart extends CoursePartWithDescription {
    type: "submission"
    exerciseSubmissionLink: string
  }

  interface CourseSpecialPart extends CoursePartWithDescription {
    type: "special"
    requirements: Array<string>
  }

  type CoursePart =
    | CourseNormalPart
    | CourseProjectPart
    | CourseSubmissionPart
    | CourseSpecialPart

  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the easy course part",
      type: "normal",
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the hard course part",
      type: "normal",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special",
    },
  ]

  interface HeaderProps {
    name: string
  }

  const Header = ({ name }: HeaderProps) => {
    return <h1>{name}</h1>
  }

  interface PartProps {
    part: CoursePart
  }

  const Part = ({ part }: PartProps) => {
    switch (part.type) {
      case "normal":
        return (
          <p>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>{" "}
            <br />
            <em>{part.description}</em>
          </p>
        )
      case "groupProject":
        return (
          <p>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>{" "}
            <br />
            project exercises {part.groupProjectCount}
          </p>
        )
      case "submission":
        return (
          <p>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>{" "}
            <br />
            <em>{part.description}</em> <br />
            submit to {part.exerciseSubmissionLink}
          </p>
        )
      case "special":
        return (
          <p>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>{" "}
            <br />
            <em>{part.description}</em> <br />
            required skills: {part.requirements.join(", ")}
          </p>
        )
      default:
        return assertNever(part)
    }
  }

  interface ContentProps {
    courseParts: Array<CoursePart>
  }

  const Content = ({ courseParts }: ContentProps) => {
    return (
      <div>
        {courseParts.map((part) => (
          <Part part={part} key={part.name} />
        ))}
      </div>
    )
  }

  interface TotalProps {
    courseParts: Array<CoursePart>
  }

  const Total = ({ courseParts }: TotalProps) => {
    return (
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    )
  }

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  )
}

export default App
