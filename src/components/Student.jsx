const Student = (props) => {
    return <div>
        <h2>{props.name.first} {props.name.last}</h2>
        <p><b>{props.major}</b></p>
        <p>{props.name.first} is taking {props.numCredits} credits and {props.fromWisconsin ? "is from Wisconsin": "is NOT from Wisconsin"} </p>
        <p>They have {props.interests.length} interests including...</p>
        <ul>
            {props.interests.map((interest, index) => (
                <li key={index}> 
                    {interest}
                </li>
            ))}
        </ul>
        
    </div>
}

export default Student;