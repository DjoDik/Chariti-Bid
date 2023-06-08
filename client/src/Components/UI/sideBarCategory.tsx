import React from 'react';
import { Button, Container, List } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
export default function sideBarCategory(): JSX.Element {

  const dispatch = useAppDispatch();
  const allCategory = useAppSelector((store) => store);

  return (
    <Container>
      {allCategory.map((category) => (
        <List>
          <li>{category.name}</li>
        </List>
      ))}
    </Container>
  );
}
