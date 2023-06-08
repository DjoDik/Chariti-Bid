import React, { useEffect } from 'react';
import { Container, List } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { getItemThunk } from '../Redux/slice/itemSlice';
export default function SideBarCategory(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getItemThunk());
  }, []);
  const allCategory = useAppSelector((store) => store.item.allProduct);

  return (
    <Container>
      {allCategory.map((category) => (
        <List key={category.id}>
          <li> {category.name}</li>
        </List>
      ))}
    </Container>
  );
}
