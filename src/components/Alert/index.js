import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function BasicAlerts( message, status) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2} style={{ width: '90%'}}>
      <Alert severity={status} style={{ display: 'flex'}}>{message}</Alert>
    </Stack>
  );
}