// src/components/Sider.js
import React from 'react';
import { Grid, IconButton, Box } from '@mui/material';
import { styled } from '@mui/system';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import CasesIcon from '@mui/icons-material/Assignment';
import AlignIcon from '@mui/icons-material/AlignVerticalCenter';
import HandsIcon from '@mui/icons-material/Handyman';
import CallIcon from '@mui/icons-material/Phone';
import SettingsIcon from '@mui/icons-material/Settings';

const SiderContainer = styled(Grid)({
  backgroundColor: '#ffffff',
  padding: '20px 10px 10px 10px',
  height: '100vh',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  display: 'flex',
  position: 'fixed',
  left: 0,
  width: '80px', 
  overflowY: 'auto', 
  marginTop : '58px',
});

const IconButtonStyled = styled(IconButton)({
  fontSize: 24,
  color: '#002B55BD',
  transition: 'color 0.3s',
  '&:hover': {
    color: '#1890ff',
  },
  marginBottom: 10,
});

const Sider = () => {
  return (
    <SiderContainer container direction="column" alignItems="center">
      <Grid item xs={12}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <IconButtonStyled>
            <DashboardIcon />
          </IconButtonStyled>
          <IconButtonStyled>
            <EditIcon />
          </IconButtonStyled>
          <IconButtonStyled>
            <PersonIcon />
          </IconButtonStyled>
          <IconButtonStyled>
            <SearchIcon />
          </IconButtonStyled>
          <IconButtonStyled>
            <CasesIcon />
          </IconButtonStyled>
          <IconButtonStyled>
            <AlignIcon />
          </IconButtonStyled>
          <IconButtonStyled>
            <HandsIcon />
          </IconButtonStyled>
          <IconButtonStyled>
            <CallIcon />
          </IconButtonStyled>
          <IconButtonStyled>
            <SettingsIcon />
          </IconButtonStyled>
        </Box>
      </Grid>
    </SiderContainer>
  );
};

export default Sider;
