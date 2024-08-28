import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import DataTable, { TableColumn } from 'react-data-table-component';

type TaxPayer = {
  tid: string;
  firstName: string;
  lastName: string;
  address: string | null;
};

type TaxPayerListProps = {
  taxPayers: TaxPayer[];
};

const columns: TableColumn<TaxPayer>[] = [
  {
    name: 'TID',
    selector: row => row.tid,
    sortable: true,
  },
  {
    name: 'First Name',
    selector: row => row.firstName,
    sortable: true,
  },
  {
    name: 'Last Name',
    selector: row => row.lastName,
    sortable: true,
  },
  {
    name: 'Address',
    selector: row => row.address || 'N/A',
    sortable: true,
  },
];

const TaxPayerList: React.FC<TaxPayerListProps> = ({ taxPayers }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        TaxPayer Records
      </Typography>
      <DataTable
        columns={columns}
        data={taxPayers}
        pagination
        responsive
        highlightOnHover
        striped
      />
    </>
  );
};

export default TaxPayerList;
