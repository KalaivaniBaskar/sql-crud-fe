import React, { useEffect, useState } from 'react'
import axios from "axios"
import {Box, Typography, Table, TableHead, TableBody, TableCell, 
    TableRow, Button, styled, IconButton, Stack,TablePagination ,
    TableContainer, Paper } from '@mui/material';
import DataTable from './DataTable';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {  toast } from 'react-toastify';
import { useCTX } from '../ContextAPI';
import { useNavigate } from 'react-router-dom';

export const BoxComponent = styled(Box)`
 width:80%;
 box-sizing: border-box;
 margin-inline: auto;
 & > h5 {
     margin-bottom: 20px;
 }
 & > div > table > thead {
     background-color : #00072D;
 }
 & > div > table > thead >tr > th {
     color: #fff;
     font-weight: 600;
     font-size: 16px;
 }
 & > div > table > tbody >tr > td {
     font-size: 14px;
 }
 ` 
export const ButtonComp = styled(Button)`
   background-color : #00072D;
`
const Home = () => {
    const [data, setData] = useState([]);
    const { setStudent, toastOptions, BASE_URL} = useCTX();
    const navigate = useNavigate()

    const [pg, setpg] = useState(0); 
    const [rpg, setrpg] = useState(5); 
  
    function handleChangePage(event, newpage) { 
        setpg(newpage); 
    } 
  
    function handleChangeRowsPerPage(event) { 
        setrpg(parseInt(event.target.value, 10)); 
        setpg(0); 
    } 

    const getData = async() => {
        const response = await axios.get(`${BASE_URL}/api/student/all`)
        // console.log(response)
        if(response.status === 200){
            setData(response.data.data)
        }
    }

    const editEmployee = (student) => {
        setStudent({...student})
        navigate('/edit')
    }
     
    const removeEntry = async (id) => {
        // for delete req in axios, req body must be given in data key obj
        let isOK = window.confirm(`Are you sure you want to delete record ID: ${id}`)
        if(isOK) {
        try {
            const response = await axios.delete(`${BASE_URL}/api/student/remove/${id}`) 
            //console.log(response.status); 
            if(response.status === 200){
                toast.success("Student removed", toastOptions)
             }
             setTimeout(() => 
             window.location.reload(), 2000)
        } catch (error) {
            toast.error('Error occured')
        }
       
       }
    }

    useEffect( () => {
        getData();
    }, [])

  return ( 
    <BoxComponent>
         <Stack direction={'row'} 
        sx={{justifyContent: 'space-between'}}
        my={2}>
        <Typography variant='h5'> STUDENTS  </Typography> 
        <ButtonComp variant='contained' size='medium' color='info' onClick={() => navigate('/add')}>
             + ADD</ButtonComp>   
        </Stack>
        <Box sx={{overflow : 'auto'}} maxHeight={'80dvh'} component={Paper}>
        <TableContainer > 
            <Table>
                <TableHead>
                    <TableRow className='heading'>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Course</TableCell>
                        <TableCell>Score</TableCell>
                        <TableCell>Task</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Edit</TableCell>
                        <TableCell>Remove</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.slice(pg * rpg, pg * rpg + rpg).map( (el) => (
                           <TableRow key={el.student_id}
                           sx={{ "&:last-child td, &:last-child th": { border: 0 } }} >
                            <TableCell>{el.student_id}</TableCell>
                            <TableCell>{el.student_name}</TableCell>
                            <TableCell>{el.student_course}</TableCell>
                            <TableCell >{el.student_score}</TableCell>
                            <TableCell>{el.student_task}</TableCell>
                            <TableCell>{el.student_email}</TableCell  >
                            <TableCell>
                                <IconButton color='primary' 
                                onClick={ () => editEmployee(el)}>
                                    <ModeEditIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell>
                                <IconButton color='black' 
                                onClick={ () => removeEntry(el.student_id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>  
                         ) ) 
                    }
                </TableBody>
            </Table>
            </TableContainer>
        </Box>
        <TablePagination 
                rowsPerPageOptions={[5, 10, 25]} 
                component={Paper}
                className='table-page'
                count={data.length} 
                rowsPerPage={rpg} 
                page={pg} 
                onPageChange={handleChangePage} 
                onRowsPerPageChange={handleChangeRowsPerPage} 
            /> 
    </BoxComponent>
  )
}

export default Home