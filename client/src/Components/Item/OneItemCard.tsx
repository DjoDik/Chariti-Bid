import React from 'react'
import {Button, Card, CardBody, CardSubtitle, CardText, CardTitle} from 'reactstrap'
import { ItemType } from '../types/itemType'

type PropsType= {
  oneCard: ItemType
}

export default function OneItemCard({oneCard}: PropsType): JSX.Element {
  const {Items} = oneCard
 
  return (
    <Card
  style={{
    width: '13rem',
    margin: '10px'
  }}
>
  <img
    alt="Sample"
    src='asdasd'/>
  <CardBody>
    <CardTitle tag="h5">
     {oneCard.title}
    </CardTitle>
    <Button>
      Смотреть
    </Button>
  </CardBody>
</Card>
  )
}
