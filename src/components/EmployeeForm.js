import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import View from '../components/View';
import Search from './Search';
import { Box, Button, Paper } from "@mui/material";

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
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  console.log(employees);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    setSelectedFile(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      // Set the image preview for display
      setImagePreview(reader.result);
      // Set the image data (URL or base64) to the state
      setImage(reader.result); // Assuming image is stored as URL or base64
    };

    if (file) {
      reader.readAsDataURL(file); // Read file as data URL
    }
  };

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
    setSelectedFile('')
    setImagePreview('')
  };

  /* edit button section */
  const UpdateEmployee = () => {

    const editedEmployee = {
      name,
      surname,
      idnumber,
      position,
      contact,
      email,
      image: image || employees.find(emp => emp.idnumber === idnumber)?.image
    };
    //setImage(employee.image);

    // setEmployees(employees.map(employee => {
    //   return employee.idnumber === idnumber ? editedEmployee : employee
    // }))

    setEmployees(prevEmployees =>
      prevEmployees.map(employee => {
        if (employee.idnumber === idnumber) {
          return editedEmployee;
        }
        return employee;
      })
    );

    setName('');
    setSurname('');
    setIdNumber('');
    setPosition('');
    setContact('');
    setEmail('');
    setImage('');
    setSelectedFile('')
    setImagePreview('')
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
    const searchData = JSON.parse(localStorage.getItem('employees' || '[]'));

    setSearchQuery(
      searchData.filter(index => index.name.toLowerCase() === name.toLowerCase())
    )
    setIsSearching(true);
  };


  /* delete button section */
  const deleteEmployee = (idnumber) => {
    const filteredEmployees = employees.filter(
      employee => employee.idnumber !== idnumber
    )
    setEmployees(filteredEmployees);
  };


  /* saving to local storage */
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  return (
    <Box
      sx={{ borderWidth: 2, height:"content" }}
      className='wrapper'>
      <h1>Employee Details</h1>
      <p>Please enter employee details below:</p>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignContent: 'center',
          margin: 'auto'
        }}
      >
        <Paper 
        elevation={5} 
        sx={{
          height: 580,
          }}
        >
          <Box
            sx={{
              width: 450,
              heighht:300,
              display: 'flex',
              justifyContent: 'center',
              borderRadius: 5
            }}
          >
            <form autoComplete="off" className='form-group' onSubmit={handleAddEmployeeSubmit}>
              <label>Name:</label>
              <input
                type="text"
                className='form-control'
                onChange={(e) => setName(e.target.value)}
                id="first-name"
                value={name}
                required
              />
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

              <label htmlFor="file">Upload Image:</label>
              <img src={imagePreview} alt="Preview" style={{ maxWidth: '50px', Height:'50px' }} />
              <input
                type="file"
                className='form-control form-image'
                onChange={handleImageChange}
                id="file"
                accept="image/*"
                required
              />
              <br></br>
              <Box
                sx={{
                  width: 350,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Button variant="contained" type="submit" className='btn-submit'>ADD</Button>
                <Button variant="contained" type="submit" className='btn-update' onClick={UpdateEmployee}>UPDATE</Button>
              </Box>
            </form>
          </Box>
        </Paper>

        <Paper sx={{ marginLeft: 10, height:580 }}>
          <Box
            sx={{ width: 650, height:560, marginLeft: 20, display: 'flex', justifyContent: 'center', alignContent: 'center' }}
            className='view-container'>
            {employees.length > 0 && <>
              <Box 
                sx={{
                  height:"100%",
                  display:'flex',
                  flexDirection:'column',
                  justifyContent:'center',
                  alignItems:'center',
                  marginTop:-8,
                }}
                className='table-responsive'>
                <div className="first">
                  <Search onSearch={handleSearch} className="search" />
                </div>
                <div className="second">
                  <div id="view-tag">
                    {searchQuery.length ?
                      <View employees={searchQuery} deleteEmployee={deleteEmployee} handleEditSubmit={handleEditSubmit} handleSearch={handleSearch} />
                      :
                      <View employees={employees} deleteEmployee={deleteEmployee} handleEditSubmit={handleEditSubmit} handleSearch={handleSearch} />
                    }
                  </div>
                </div>
                <Button variant="contained" className='btn-remove-all' onClick={() => setEmployees([])}> Remove All </Button>
              </Box>
            </>}
            {employees.length < 1 && <div className='employeeList'> No employees on the database </div>}
          </Box>
        </Paper>

      </Box>
    </Box >
  );
}

export default EmployeeForm;