import React, { useEffect } from 'react';
import { Button, Container, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { getItemThunk } from '../Redux/slice/itemSlice';
import { SortItemThunk } from '../Redux/slice/sortSlice';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default function SideBarCategory(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getItemThunk());
  }, []);

  const allCategory = useAppSelector((store) => store.item.allProduct);

  const handleCategoryClick = (categoryName: string) => {
    dispatch(SortItemThunk(categoryName));
  };

  return (
    <Container style={{ width: '800px' }}>
      <Grid container spacing={2}>
        <Grid item container spacing={2}>
          {allCategory.map((category) => (
            <Grid item key={category.id} xs={3} sm={3} md={3} lg={3}>
              <Card
                onClick={() => handleCategoryClick(category.name)}
                style={{
                  cursor: 'pointer',
                  margin: '10px',
                  width: '140px',
                  height: '100px',
                  marginTop: '20px',
                  transition: 'box-shadow 0.3s',
                  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
                sx={{
                  ':hover': {
                    animation: 'blink 1s infinite',
                    animationTimingFunction: 'linear',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  // height="100%"
                  src={category.img}
                  alt={category.name}
                  style={{ width: '150px', height: '90px', marginTop: '5px' }}
                />

                <CardContent style={{ textAlign: 'center' }}>
                  <Typography
                    variant="h6"
                    component="div"
                    style={{ fontWeight: 'bold', marginBottom: '8px' }}
                  >
                    {category.name}
                  </Typography>
                  <Typography variant="body2" component="div" style={{ fontSize: '10px' }}>
                    name
                  </Typography>
                </CardContent>
              </Card>
              <Typography
                variant="body2"
                component="div"
                style={{ textAlign: 'center', marginTop: '4px' }}
              >
                {/* {category.name} */}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}
