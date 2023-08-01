import React from 'react'

export const View = ({ employees, deleteEmployee, handleEditSubmit }) => {

    return (
        <>
            {employees.map((employee, index) => (
                <>
                    <div className="employee-card" key={index}>
                        <div className="employee-image">
                            <img src={employee.image} alt="" className="profile-image" />
                        </div>
                        <div className="details">
                            <h5>{employee.name} {employee.surname}</h5>
                            <p>{employee.idnumber}</p>
                            <p>{employee.email}</p>
                            <p>{employee.position}</p>
                            <p>{employee.contact}</p>
                            <div className='card-btn'>
                                <button className='edit-btn' onClick={() => handleEditSubmit(employee)}>EDIT</button>
                                <button className='delete-btn' onClick={() => deleteEmployee(employee.idnumber)}>DELETE</button>
                            </div>
                        </div>
                    </div>
                </>
            ))
            }
        </>
    )
}

export default View;