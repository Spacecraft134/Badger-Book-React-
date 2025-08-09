import { useState, useEffect} from "react";
import { Button, Container, Form, Row, Col, Pagination } from "react-bootstrap";
import Student from "./Student";


const Classroom = () => {
    const [student, setStudent] = useState([])
    const [names, setNames] = useState("")
    const [majors, setMajors] = useState("")
    const [interests, setInterests] = useState("")
    const [filterStudentData, setFilterStudentData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [pages, setPages] = useState(1)

    useEffect(() => {
        fetch('https://cs571api.cs.wisc.edu/rest/s25/hw4/students', {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
        .then(res => res.json())
        .then(data => {
            setStudent(data)
            setFilterStudentData(data)
            setPages(Math.ceil(data.length/24))
            console.log(data)
        })
    },[])

   useEffect(() => {
        const handleSearch = () => {
            const filteredStudents = student.filter(student => {
                const name = `${student.name.first} ${student.name.last}`.toLowerCase()
                const major = student.major.toLowerCase();
                const studentInterest = student.interests.map((interest) => interest.toLowerCase())

                const nameTrimmed = names.trim().toLowerCase()
                const majorTrimmed = majors.trim().toLowerCase()
                const interestsTrimmed = interests.trim().toLowerCase()

                const doesNameMatch = nameTrimmed ? name.includes(nameTrimmed) : true
                const doesMajorMatch = majorTrimmed ? major.includes(majorTrimmed) : true
                const doesInterestMatch = interestsTrimmed ? studentInterest.some(interest => interest.includes(interestsTrimmed)) : true

                return (doesNameMatch && doesMajorMatch && doesInterestMatch)
            })
            setFilterStudentData(filteredStudents);
            setPages(Math.ceil(filteredStudents.length/24))
            setCurrentPage(1)
        }
        handleSearch()
    }, [names, majors, interests, student])

    const resetFunctionality = () => {
        setNames("")
        setMajors("")
        setInterests("")
        setFilterStudentData(student)
        setPages(Math.ceil(student.length/24))
        setCurrentPage(1)
    }

    const studentToDisplay = filterStudentData.slice((currentPage - 1) * 24, currentPage * 24)

    return <div>
        <h1>Badger Book</h1>
        <p>Search for students below!</p>
        <hr />
        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control id="searchName"  value = {names }onChange={(e) => setNames(e.target.value)}/>
            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control id="searchMajor" value = {majors} onChange={(e) => setMajors(e.target.value)}/>
            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control id="searchInterest" value={interests} onChange={(e) => setInterests(e.target.value)}/>
            <br />
            <Button variant="neutral" onClick={resetFunctionality}>Reset Search</Button>
        </Form>
        {
            student.length  === 0 ? <p>The data is still loading</p>
            : studentToDisplay.length  > 0 ? <p>There are {studentToDisplay.length} student(s) matching your search.</p> 
            : <p>No Students Match</p>
        }
        <Container fluid>
            <Row>
                {studentToDisplay.map(r => {
                    return <Col key={r.id} xs={12} sm={12} md={6} lg ={4} xl={3}>
                        <Student {...r}></Student>
                    </Col>
                })}
            </Row>
        </Container>

        {pages >= 1 && (
            <Pagination>
                 <Pagination.Item disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                    Previous
                </Pagination.Item>

                {[...Array(pages)].map((_, index) => (
                    <Pagination.Item key={index + 1} active={currentPage === index + 1} onClick={() => setCurrentPage(index + 1)}>
                        {index + 1}
                    </Pagination.Item>
                    ))}

                    <Pagination.Item disabled={currentPage >= pages} onClick={() => setCurrentPage(currentPage + 1)}>
                        Next
                    </Pagination.Item>
            </Pagination>
        )}
        

        
    </div>

}

export default Classroom;