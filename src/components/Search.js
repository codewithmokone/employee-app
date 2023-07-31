import React, { useState } from 'react';

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
      // return (
      //   <>
      //   <tbody id='view-tag'>
      //   <View employees={employees} deleteEmployee={deleteEmployee} handleEditSubmit={handleEditSubmit} handleSearch={handleSearch}/>
      //   </tbody>
      //   </>
      // )
  }

  return (
    <div className='search-bar'>
      <input type="text" name='searchInput' id="searchInput" value={searchBar} onChange={(e) => setSearchBar(e.target.value)} placeholder='Search employee'/>
      <button className="btn-search" onClick={handleSearch}>Search</button>
      {clear && (
              <button className='btn-viewall' onClick={handleClear}>Clear</button>
            )}
    </div>
  );
};

export default Search;