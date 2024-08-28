import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

type SearchBarProps = {
  onSearch: (tid: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
      <TextField
        label="Search by TID"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" sx={{ ml: 2, height: 56 }}>
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
