import React from 'react'
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap'
import { ItemType } from '../types/itemType'
type PropType = {
    itemTop:ItemType
}
export default function TopCard({itemTop}:PropType):JSX.Element {
const {Items} = itemTop

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
    {Items[0].title}
    </CardTitle>
    <CardSubtitle
      className="mb-2 text-muted"
      tag="h6"
    >
      {Items[0].body}
    </CardSubtitle>
    <CardText>
    {Items[0].city}
    </CardText>
    <Button color='danger'>
     Bid:{Items[0].price}
    </Button>
  </CardBody>
</Card>
  )
}
