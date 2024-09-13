/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import React from 'react'

import { Container } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, Typography } from '@mui/material';
import { matBlack } from '../../constants/color';

const Table = ({ rows, columns, heading, row, rowHeight = 52 }) => {
  return (
    <Container
      sx={{
        height: '100vh',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          borderRadius: '1rem',
          height: '100%',
          width: '100%',
          overflow: 'hidden',
          margin: 'auto',
          padding: '1rem 4rem',
          boxShadow: 'none',
        }}
      >
        <Typography
          textAlign={'center'}
          variant='h4'
          sx={{
            margin: '2rem',
            textTransform: 'uppercase',
          }}
        >
          {heading}
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={rowHeight}
          style={{
            height: '80%',
          }}
          sx={{
            border: 'none',
            '.table-header': {
              bgcolor: matBlack,
              color: 'white',
            },
          }}
        />
      </Paper>
    </Container>
  );
};

export default Table;
