/* eslint-disable react/prop-types */
import { Button, Card, TextField} from "@mui/material"
import { useState } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import courseState  from "../recoil/atom/courseAtom.js"
import axios from "axios"

// import { useParams } from "react-router-dom"

function UpdateCourse({courseId}){

    const setCourse = useSetRecoilState(courseState)
    const course = useRecoilValue(courseState)
    const [title , setTitle] = useState(course.title)
    const [description, setDescription] = useState(course.description)
    const [image, setImage] = useState(course.imageLink)

    return <Card
    variant="outlined"
    style={{
        width : "400px",
        padding : "20px"
    }}
    >
        <TextField
        variant="outlined"
        fullWidth = {true}
        onChange={(e)=>{
            setTitle(e.target.value)
        }}
        label = "Title"
        value={title}
        >
        </TextField>
        
        <br /> <br />            
        
        <TextField
        variant="outlined"
        fullWidth = {true}
        onChange={(e)=>{
            setDescription(e.target.value)
        }}
        label = "Description"
        value = {description}
        >
        </TextField>
        
        <br /><br />

        <TextField
        variant="outlined"
        fullWidth = {true}
        onChange={(e)=>{
            setImage(e.target.value)
        }}
        label = "Image Link"
        value = {image}
        >
        </TextField>

        <br /><br />
        
        <Button
        variant="contained"
        size = "large"
        onClick={async()=>{
            
                const {data} = await axios.put('http://localhost:3000/admin/course/' + courseId,{
                    title,
                    description,
                    price: 100,
                    image,
                    published: true
                },{
                    headers: {
                        "Content-Type" : "application/json",
                        "Authorization" : "Bearer "+localStorage.getItem('token')
                    }
                })

                if (data.success){
                    setCourse({
                        title : title,
                        description : description,
                        imageLink : image
                    })
                }
        }}
        >Update</Button>
    </Card>

}

export default UpdateCourse
