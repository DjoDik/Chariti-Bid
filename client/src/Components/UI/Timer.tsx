import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Props = {
  id: number,
  bidCheck: boolean,
  setBidCheck: React.Dispatch<React.SetStateAction<boolean>> 
};

const Timer = ({ id, bidCheck, setBidCheck }: Props): JSX.Element => {
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(59);
  const [seconds, setSeconds] = useState(59);
 
  
  useEffect(() => {
    axios
      .get<number>(`/api/timer/${id}`)
      .then((response) => {
        const savedTime = response.data;
        if (typeof savedTime !== 'string') {
          setBidCheck(true)
          const currentTime = new Date().getTime() / 1000; // текущее время в секундах
          const elapsedTime = currentTime - savedTime;

          const timer = 7200;
          const newHourse = Math.floor((timer - elapsedTime) / 3600);
          const newMinute = Math.floor((timer - elapsedTime) / 60 - 60 * newHourse);
          const newSeconds = Math.floor((timer - elapsedTime) % 60);

          setHours(newHourse);
          setMinutes(newMinute);
          setSeconds(newSeconds);
        }
      })
      .catch((error) => {
        console.log('Ошибка при получении сохраненного времени:', error);
      });
  }, []);

  useEffect(() => {
    if (bidCheck) {
      const interval = setInterval(() => {
        // уменьшаем секунды
        setSeconds((prevSeconds) => prevSeconds - 1);

        // Проверяем, если секунды достигли 0, уменьшаем минуты и сбрасываем секунды
        if (seconds === 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        }

        // Проверяем, если минуты достигли 0, уменьшаем часы и сбрасываем минуты
        if (minutes === 0 && seconds === 0) {
          setHours((prevHours) => prevHours - 1);
          setMinutes(59);
          setSeconds(59);
        }
      }, 1000);

      // Проверяем, если все значения равны нулю, останавливаем таймер
      if (hours === 0 && minutes === 0 && seconds === 0) {
        clearInterval(interval);
      }
      // Очистка интервала при размонтировании компонента
      return () => {
        clearInterval(interval);
      };
    }
  }, [seconds, minutes, hours, bidCheck]);

  return (
    <div>
      <div>
        {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:
        {String(seconds).padStart(2, '0')}
      </div>
    </div>
  );
};

export default Timer;
