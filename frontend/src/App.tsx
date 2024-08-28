import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import TaxPayerForm from './components/TaxPayerForm';
import TaxPayerList from './components/TaxPayerList';
import SearchBar from './components/SearchBar';
import { backend } from 'declarations/backend';

type TaxPayer = {
  tid: string;
  firstName: string;
  lastName: string;
  address: string | null;
};

const App: React.FC = () => {
  const [taxPayers, setTaxPayers] = useState<TaxPayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<TaxPayer[]>([]);

  useEffect(() => {
    fetchTaxPayers();
  }, []);

  const fetchTaxPayers = async () => {
    try {
      const result = await backend.getTaxPayers();
      setTaxPayers(result);
      setSearchResults(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tax payers:', error);
      setLoading(false);
    }
  };

  const handleAddTaxPayer = async (newTaxPayer: TaxPayer) => {
    setLoading(true);
    try {
      const result = await backend.createTaxPayer(
        newTaxPayer.tid,
        newTaxPayer.firstName,
        newTaxPayer.lastName,
        newTaxPayer.address
      );
      if ('ok' in result) {
        await fetchTaxPayers();
      } else {
        console.error('Error adding tax payer:', result.err);
      }
    } catch (error) {
      console.error('Error adding tax payer:', error);
    }
    setLoading(false);
  };

  const handleSearch = async (tid: string) => {
    setLoading(true);
    try {
      const result = await backend.searchTaxPayer(tid);
      if (result) {
        setSearchResults([result]);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching for tax payer:', error);
      setSearchResults([]);
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          TaxPayer Management System
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Box sx={{ width: '45%' }}>
            <TaxPayerForm onAddTaxPayer={handleAddTaxPayer} />
          </Box>
          <Box sx={{ width: '45%' }}>
            <SearchBar onSearch={handleSearch} />
          </Box>
        </Box>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <TaxPayerList taxPayers={searchResults.length > 0 ? searchResults : taxPayers} />
        )}
      </Box>
    </Container>
  );
};

export default App;
