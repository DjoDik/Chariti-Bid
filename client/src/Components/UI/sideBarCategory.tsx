import React, { useEffect } from 'react';
import { Button, Container, List } from 'reactstrap';
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
  console.log(allCategory);
  

  const handleCategoryClick = (categoryName: string) => {
    dispatch(SortItemThunk(categoryName));
  };
  

  return (
    <Container>
      <TransitionGroup>
        {allCategory.map((category) => (
          <CSSTransition
          key={category.id}
          classNames={{
            enter: 'slide-enter',
            enterActive: 'slide-enter-active',
            exit: 'slide-exit',
            exitActive: 'slide-exit-active',
          }}
          timeout={1500}
          
          >
            <List key={category.id}>
              <li
                onClick={() => handleCategoryClick(category.name)}
                style={{ fontSize: '25px', cursor: 'pointer' }}
              >
                {category.name}
              </li>
            </List>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Container>
  );
}
