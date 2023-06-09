import React, { useEffect } from 'react';
import { Button, Container, List } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { getItemThunk } from '../Redux/slice/itemSlice';
import { SortItemThunk, selectSelectedCategory } from '../Redux/slice/sortSlice';
import '/public/style.css';

export default function SideBarCategory(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getItemThunk());
  }, []);

  const allCategory = useAppSelector((store) => store.item.allProduct);
  const selectedCategory = useAppSelector(selectSelectedCategory);
  const handleCategoryClick = (categoryName: string) => {
    dispatch(SortItemThunk(categoryName));
  };

 

  return (
    <Container>
      <div className='box'>
        {allCategory.map((category) => (
          <List key={category.id}>
            <li
              onClick={() => handleCategoryClick(category.name)}
              style={{ fontSize: '25px', cursor: 'pointer' }}
            >
              {category.name}
            </li>          
          </List>
        ))}
      </div>
    </Container>
  );
}
