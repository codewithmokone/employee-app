import React from 'react'

export const View = ({ employees, deleteEmployee, handleEditSubmit}) => {
    
    return (
        <>
        {employees.map((employee) => (
                <tr>
                    <td>{employee.name}</td>
                    <td>{employee.surname}</td>
                    <td>{employee.idnumber}</td>
                    <td>{employee.email}</td>
                    <td>{employee.position}</td>
                    <td>{employee.contact}</td>
                    <td>{employee.file}</td>
                    <td> <button className='edit-btn'  onClick={()=>handleEditSubmit(employee)}>EDIT</button></td>
                    <td><button className='delete-btn' onClick={()=>deleteEmployee(employee.index)}>DELETE</button></td>           
                </tr>    
            ))
        }
        </>
    )
}

export default View;