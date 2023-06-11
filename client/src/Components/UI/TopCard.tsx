import React from 'react'
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap'
import { ItemType } from '../types/itemType'
type PropType = {
    itemTop:ItemType
}
export default function TopCard({itemTop}:PropType):JSX.Element {
const item = itemTop.Items.map((el) => el.price)
  return (
    <Card
  style={{
    width: '10rem'
  }}
>
  <img
    alt="Sample"
    src="https://picsum.photos/300/200"
  />
  <CardBody>
    <CardTitle tag="h5">
     
    </CardTitle>
    <CardSubtitle
      className="mb-2 text-muted"
      tag="h6"
    >
      Card subtitle
    </CardSubtitle>
    <CardText>
      Some quick example text to build on the card title and make up the bulk of the card‘s content.
    </CardText>
    <Button onClick={() => console.log(item)}>
     Bid:{itemTop.price}
    </Button>
  </CardBody>
</Card>
  )
}
