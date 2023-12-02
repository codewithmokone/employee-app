import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react'
import BackspaceIcon from '@mui/icons-material/Backspace';
import { Delete } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';

export const View = ({ employees, deleteEmployee, handleEditSubmit }) => {

    return (
        <>
            {employees.map((employee, index) => (
                <>
                    <Card sx={{ display: 'flex', marginTop:2, display: 'flex', justifyContent:'center', alignContent:'center'}}>
                        <CardMedia
                            component="img"
                            sx={{ width: 60, height:70 }}
                            image={employee.image}
                            alt="Emplyee Image."
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column',  }}>
                            <CardContent
                                sx={{
                                    flex: '1 0 auto',
                                    width: 550,
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}
                            >
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent:'center', alignItems:'center' }}>
                                    <Typography sx={{fontSize:16}} component="div" variant="h7">
                                        {employee.name} {employee.surname}
                                    </Typography>
                                    <Typography sx={{fontSize:14, marginLeft:2}} component="div" variant="h7">
                                        {employee.position}
                                    </Typography>
                                    <Typography sx={{fontSize:14, marginLeft:2}} variant="subtitle1" color="text.secondary" component="div">
                                        {employee.email}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        width:80,
                                        display:'flex',
                                        flexDirection:'row',
                                        justifyContent:'space-between',
                                        marginLeft:3
                                    }}
                                >
                                    <span className='edit-btn' onClick={() => handleEditSubmit(employee)}><EditIcon/></span>
                                    <span className='delete-btn' onClick={() => deleteEmployee(employee.idnumber)}><Delete/></span>
                                </Box>
                            </CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>

                            </Box>
                        </Box>

                    </Card>
                </>
            ))
            }
        </>
    )
}

export default View;