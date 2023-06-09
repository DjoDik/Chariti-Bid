import React from 'react';
import { Button, Card, CardBody, CardTitle, Row } from 'reactstrap';
import { ItemType } from '../types/itemType';
import { deleteUserItem, deleteThunk } from '../Redux/slice/userItemSlice';
import { useAppDispatch } from '../Redux/hooks';

type PropsType = {
  oneCard: ItemType;
};

export default function OneUserItemCard({ oneCard }: PropsType): JSX.Element {
  const dispatch = useAppDispatch();

  const deleteHandler = (id: string) => {
    dispatch(deleteThunk(id)); // Dispatch the delete action using deleteThunk
  };

  return (
    <Card
      style={{
        width: '13rem',
        margin: '10px',
      }}
    >
      <img alt="Sample" src="asdasd" />
      <CardBody>
        <CardTitle tag="h5">{oneCard.title}</CardTitle>
        <Row>
          <Button color="danger" onClick={() => deleteHandler(oneCard.id)}>Удалить</Button>
          <Button color="primary">Редактировать</Button>
        </Row>
      </CardBody>
    </Card>
  );
}
