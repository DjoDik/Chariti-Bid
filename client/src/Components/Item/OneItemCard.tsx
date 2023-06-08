import React from 'react'
import {Button, Card, CardBody, CardSubtitle, CardText, CardTitle} from 'reactstrap'
import { ItemType } from '../types/itemType'

type PropsType= {
  oneCard: ItemType
}

export default function OneItemCard({oneCard}: PropsType): JSX.Element {
  return (
    <Card
  style={{
    width: '18rem'
  }}
>
  <img
    alt="Sample"
    src={oneCard.}
  />
  <CardBody>
    <CardTitle tag="h5">
      Card title
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
    <Button>
      Button
    </Button>
  </CardBody>
</Card>
  )
}
