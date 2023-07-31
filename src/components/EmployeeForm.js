import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import View from '../components/View';
import Search from './Search';

// getting the values of local storage
const getDatafromLS = () => {

  const data = localStorage.getItem('employees');

  // converting data
  if (data) {
    return JSON.parse(data);
  }
  else {
    return []
  }
}


const EmployeeForm = () => {

  const [employees, setEmployees] = useState(getDatafromLS());
  
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [idnumber, setIdNumber] = useState('');
  const [position, setPosition] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');


  /* submit button section */
  const handleAddEmployeeSubmit = (event) => {
    event.preventDefault();

    let index = {
      name,
      surname,
      idnumber,
      position,
      contact,
      email,
      image
    };

    setEmployees([...employees, index]);
    setName('');
    setSurname('');
    setIdNumber('');
    setPosition('');
    setContact('');
    setEmail('');
    setImage('');
  };

  /* edit button section */
  const UpdateEmployee = () => {

    let employee = {
      name,
      surname,
      idnumber,
      position,
      contact,
      email,
      image
    };

    setEmployees([...employees, employee]);
    setName(employee.name);
    setSurname(employee.surname);
    setIdNumber(employee.idnumber);
    setPosition(employee.position);
    setContact(employee.contact);
    setEmail(employee.email);
    //setImage(employee.image);
  }


  /* Edit button section */
  function handleEditSubmit(employee) {
    setName(employee.name)
    setSurname(employee.surname)
    setIdNumber(employee.idnumber)
    setPosition(employee.position)
    setContact(employee.contact)
    setEmail(employee.email)
    //setImage(employee.image)
  };


  /* search button section */
  const [searchQuery, setSearchQuery] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (name) => {
    const searchData = JSON.parse(localStorage.getItem('employees'));

    setSearchQuery (
      searchData.filter(index => {
        return index.name === name
      })
    )
    setIsSearching(true);
  };


  /* delete button section */
  const deleteEmployee = (idnumber) => {
    const filteredEmployees = employees.filter((element, index) => {
      return element.idnumber !== idnumber
    })
    setEmployees(filteredEmployees);
  };


  /* saving to local storage */
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  return (
    <div className='wrapper'>
      <h1>Employee Details</h1>
      <p>Please enter employee details below:</p>
      <div className='main'>

        <div className='form-container'>
          <form autoComplete="off" className='form-group' onSubmit={handleAddEmployeeSubmit}>
            <label>Name:</label>
            <input type="text" className='form-control' onChange={(e) => setName(e.target.value)} id="first-name" value={name} required />
            <br></br>
            <label>Surname:</label>
            <input type="text" className='form-control' onChange={(e) => setSurname(e.target.value)} id="surname" value={surname} required />
            <br></br>
            <label>ID Number:</label>
            <input type="number" className='form-control' onChange={(e) => setIdNumber(e.target.value)} id="id-number" value={idnumber} required />
            <br></br>
            <label>Position:</label>
            <input type="text" className='form-control' onChange={(e) => setPosition(e.target.value)} id="position" value={position} required />
            <br></br>
            <label>Contact:</label>
            <input type="text" className='form-control' onChange={(e) => setContact(e.target.value)} id="contact" value={contact} required />
            <br></br>
            <label>Email:</label>
            <input type="email" className='form-control' onChange={(e) => setEmail(e.target.value)} id="email" value={email} required />
            <br></br>
            <label>Upload Image:</label>
            <input type="file" className='form-control' onChange={(e) => setImage(e.target.value)} id="file" value={image} required />
            <br></br>
            <button type="submit" className='btn-submit'>ADD</button>
            <button type="submit" className='btn-update' onClick={UpdateEmployee}>UPDATE</button>
          </form>
        </div>

        <div className='view-container'>
          {employees.length > 0 && <>
            <div className='table-responsive'>

              <Search onSearch={handleSearch} />

              <table className='table'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>ID #</th>
                    <th>Email</th>
                    <th>Position</th>
                    <th>Contact</th>
                    <th>Image</th>
                    <th>Modify</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody id="view-tag">
                  {searchQuery.length ?
                    <View employees={searchQuery} deleteEmployee={deleteEmployee} handleEditSubmit={handleEditSubmit} handleSearch={handleSearch} />
                    :
                    <View employees={employees} deleteEmployee={deleteEmployee} handleEditSubmit={handleEditSubmit} handleSearch={handleSearch} />
                  }
                </tbody>
              </table>
            </div>
            <button className='btn-remove-all' onClick={() => setEmployees([])}> Remove All </button>
          </>}

          {employees.length < 1 && <div className='employeeList'> No employees on the database </div>}
        </div>

      </div>
    </div>
  );
}

export default EmployeeForm;