import React from 'react';
import { Button, Card, CardBody, CardTitle } from 'reactstrap';
import { ItemType } from '../types/itemType';

type PropsType = {
  oneCard: ItemType;
};

export default function OneItemCard({ oneCard }: PropsType): JSX.Element {
  
  return (
    <Card
      style={{
        width: '13rem',
        margin: '10px',
      }}
    >
      <img alt="Sample" src={oneCard?.FotoGaleries[0]?.img} style={{margin: '10px'}}/>
      <CardBody>
        <CardTitle tag="h5">{oneCard.title}</CardTitle>
        <Button>Смотреть</Button>
      </CardBody>
    </Card>
  );
}
