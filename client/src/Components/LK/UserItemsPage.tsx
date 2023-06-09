import { Container } from '@mui/material'
import React, { useEffect } from 'react'
import { getUserItemThunk } from '../Redux/slice/userItemSlice';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { useParams } from 'react-router-dom';

export default function UserItemsPage():JSX.Element {
    const dispatch = useAppDispatch();
const id = useParams()
    useEffect(() => {
      dispatch(getUserItemThunk(id));
    }, []);
    const allUserItems = useAppSelector((store) => store.userItem.userItems)
    console.log(allUserItems)
  return (
    <Container>

    </Container>
  )
}
