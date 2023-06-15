import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react'; // Добавляем useState
import { getUserItemThunk } from '../Redux/slice/userItemSlice';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { useParams } from 'react-router-dom';
import OneUserItemCard from '../UI/OneUserItemCard';
import { CardGroup, Row } from 'reactstrap';
import PhotoUploadForm from './MultirInput'; // Импортируем компонент PhotoUploadForm

export default function UserItemsPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const id = useParams();
  const userId = Object.values(id);
  const [itemAdded, setItemAdded] = useState(false); // Добавляем состояние itemAdded

  useEffect(() => {
    dispatch(getUserItemThunk(userId[0]));
    setItemAdded(false);
  }, [itemAdded]);
  const allUserItems = useAppSelector((store) => store.userItem.userItems);

  return (
    <CardGroup>
      <Row className="justify-content-center">
        {allUserItems.map((el) => (
          <OneUserItemCard key={el.id} oneCard={el} />
        ))}
      </Row>
    </CardGroup>
  );
}
