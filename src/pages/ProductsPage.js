import React from 'react';
import { Grid, Container, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';
import HeaderComponent from '../components/header'; 
import SiderComponent from '../components/sider'; 
import ProductTable from '../components/productTable';

const Header = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const Sider = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRight: `1px solid ${theme.palette.divider}`,
}));

const Main = styled(Paper)(({ theme }) => ({
  marginTop: "70px",
  marginLeft : '83px'
}));

const ProductsPage = () => {
  return (
    <Container maxWidth={false} disableGutters>
        <HeaderComponent/>
      <Grid container >
        <Grid item xs={2}>
          <SiderComponent/>
        </Grid>
        <Grid item xs={22}>
          <Main>
            <ProductTable/>
          </Main>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductsPage;
