import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './Redux/hooks';
import { getItemThunk } from './Redux/slice/itemSlice';

export default function MainPage(): JSX.Element {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getItemThunk());
  }, []);

  const item = useAppSelector((store) => store.item);
  
  return (
    <>
    
    </>
  )
}
