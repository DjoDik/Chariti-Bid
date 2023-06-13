import React from 'react';
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import { ItemType } from '../types/itemType';
type PropType = {
  itemTop: ItemType;
};
export default function TopCard({ itemTop }: PropType): JSX.Element {
  
  
  return (
    <Card
      style={{
        width: '10rem',
      }}
    >
      <img alt="Sample" src="https://picsum.photos/300/200" />
      <CardBody>
        <CardTitle tag="h5"></CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6"></CardSubtitle>
        <CardText>
          {itemTop.title}
        </CardText>
        <Button onClick={() => console.log(itemTop)}>Bid:{itemTop.price}</Button>
      </CardBody>
    </Card>
  );
}
