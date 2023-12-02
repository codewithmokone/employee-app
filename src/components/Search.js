import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

const Search = ({ onSearch }) => {
  const [clear, setClear] = useState(false);
  const [searchBar, setSearchBar] = useState('');

  const handleSearch = () => {
    let searchInputValue = document.getElementById('searchInput').value

    if (searchInputValue.trim() !== '') {
      onSearch(searchInputValue);
      setClear(true);
      
    }
  };

  const handleClear = () => {
    setClear(false);
    setSearchBar('');
  }

  return (
    <Box 
    sx={{width:450}}
    className='search-bar'>
      <input type="text" name='searchInput' id="searchInput" value={searchBar} onChange={(e) => setSearchBar(e.target.value)} placeholder=' Search employee'/>
      <Button variant='contained' sx={{color:'white', width: 30, height:30, marginLeft:1}}  onClick={handleSearch}><SearchIcon/></Button>
      {clear && (
              <button className='btn-viewall' onClick={handleClear}>Clear</button>
            )}
    </Box>
  );
};

export default Search;