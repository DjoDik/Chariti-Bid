import { Container } from '@mui/material'
import React, { useEffect } from 'react'
import { getUserItemThunk } from '../Redux/slice/userItemSlice';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { useParams } from 'react-router-dom';
import OneUserItemCard from '../UI/OneUserItemCard';
import { CardGroup, Row } from 'reactstrap';

export default function UserItemsPage():JSX.Element {
    const dispatch = useAppDispatch();
const id = useParams()
const userId = Object.values(id)

    useEffect(() => {
      dispatch(getUserItemThunk(userId[0]));
    }, []);
    const allUserItems = useAppSelector((store) => store.userItem.userItems)
    console.log("===========Page",allUserItems)
  return (
    <CardGroup>
      <Row className="justify-content-center">
     {allUserItems.map((el) => <OneUserItemCard key={el.id} oneCard={el}/>)}
     </Row>
    </CardGroup>
  )
}
