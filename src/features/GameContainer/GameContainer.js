import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectGameState } from '../QuizBank/quizBankSlice';
import { StartScreen } from './StartScreen/StartScreen';
import { QuizScreen } from './QuizScreen/QuizScreen';
import { FinishScreen } from './FinishScreen/FinishScreen';

export function GameContainer(){
    const gameState = useSelector(selectGameState);
    switch (gameState){
        case 'init':
            return <StartScreen />
        case 'game':
            return <QuizScreen />
        case 'finish':
            return <FinishScreen />
    }
}