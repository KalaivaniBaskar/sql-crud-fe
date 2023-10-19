import React, { useState } from 'react'
import {Box, Typography, Button, Stack, Grid, IconButton, TextField, Paper }  from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BoxComponent, ButtonComp } from './Home';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useCTX } from '../ContextAPI';

const EditStudent = () => {
    const navigate = useNavigate();
    const { student, toastOptions, BASE_URL} = useCTX();
    const [editStudent, setEditStudent] =  useState({...student});

    const updateStudent = async() => {
        const response = await axios.put(`${BASE_URL}/api/student/edit`, 
        {...editStudent} );
        //console.log(response, response.status);
        return response.status;
    }
    const handleSubmit = async(e) => {
        e.preventDefault(); 
        try {
            const status = await updateStudent();
            //console.log(status);
            if(status === 200){
                toast.success("Student Updated!", toastOptions)
            }
            setTimeout(() => 
            navigate('/'), 2000)
        } 
        catch (error) {
            toast.error('Error occured')
        }
    }

  return (
    <BoxComponent>
    <Stack direction={'row'} 
        sx={{justifyContent: 'space-between'}}
        my={2}>
        <Typography variant='h5'> EDIT STUDENT DETAILS </Typography> 
        <ButtonComp variant='contained' 
        size='medium' 
        onClick={() => navigate('/')}>
            Home </ButtonComp>   
    </Stack>
        <Grid container my={3} columnSpacing={1} rowSpacing={2} 
        justifyContent={'center'} >
            <Grid item xs={12} sm={6} md={6} lg={6} xl={4} component={Paper} padding={2}>
            <Box  p={1} >
            <form onSubmit={handleSubmit} >
            <TextField label = "ID" variant="outlined" 
                fullWidth sx={{m: 1, bgcolor: 'white' }} 
                value={student.student_id}
                type="number" 
                name ="student_id"
                readOnly>
                </TextField>

                <TextField label = "Student Name" variant="outlined" 
                fullWidth 
                sx={{ m: 1, bgcolor: 'white' }} 
                placeholder='Enter Name of Student'
                onChange={(e) => setEditStudent({...editStudent, [e.target.name] : e.target.value})}
                type="text" 
                defaultValue={student.student_name}
                name= "student_name"
                required>
                </TextField>

                <TextField label = "Course" variant="outlined" 
                fullWidth sx={{m: 1, bgcolor: 'white' }} 
                placeholder='Course name'
                onChange={(e) => setEditStudent({...editStudent, [e.target.name] : e.target.value})}
                type="text" 
                defaultValue={student.student_course}
                name = "student_course"
                required>
                </TextField>

                <TextField label = "Score" variant="outlined" 
                fullWidth sx={{m: 1, bgcolor: 'white' }} 
                placeholder='Enter Score'
                onChange={(e) => setEditStudent({...editStudent, [e.target.name] : e.target.value})}
                type="number" 
                defaultValue={student.student_score}
                name ="student_score"
                required>
                </TextField>

                <TextField label = "Email" variant="outlined" 
                fullWidth sx={{m: 1, bgcolor: 'white' }} 
                placeholder='Enter Email of Employee'
                onChange={(e) => setEditStudent({...editStudent, [e.target.name] : e.target.value})}
                type="email" 
                defaultValue={student.student_email}
                name ="student_email"
                required>
                </TextField>
               
                <TextField label = "Task" variant="outlined" 
                fullWidth sx={{m: 1, bgcolor: 'white' }} 
                placeholder='Enter Task status'
                onChange={(e) => setEditStudent({...editStudent, [e.target.name] : e.target.value})}
                type="text" 
                defaultValue={student.student_task}
                name ="student_task"
                required>
                </TextField>
                    
                    <ButtonComp type='submit' variant='contained' size='medium' sx={{m: 1 }} >
                    SAVE
                    </ButtonComp>
            </form>
            </Box>
            </Grid>
        </Grid>
</BoxComponent>
  )
}

export default EditStudent