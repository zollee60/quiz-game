import { createSlice } from '@reduxjs/toolkit';

const saveToLocalStorage = (state) => {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('questionsState', serializedState);
}

const loadFromLocalStorage = () => {
    const storageData = localStorage.getItem('questionsState')
    if(storageData !== null){
        try{
            return JSON.parse(storageData);
        } catch (e){
            return [];
        }
    }
    return [];
}


export const quizBankSlice = createSlice({
    name: 'quizBank',
    initialState: {
        questions: loadFromLocalStorage(),
        questionPool: [],
        activeQuestionIndex: -1,
        activeQuestion: {},
        gameState: "init",
        answered: false
    },
    reducers: {
        //typeof action.payload: Question
        addQuestion: (state, action) => {
            const newQuestionsArray = [...state.questions, action.payload];
            saveToLocalStorage(newQuestionsArray);
            return{
                ...state,
                questions: newQuestionsArray
            }
        },

        //typeof action.payload: id
        removeQuestion: (state, action) => {
            const delId = action.payload;
            let newQuestionsArray = [...state.questions];
            newQuestionsArray = newQuestionsArray.filter((question) => question.id !== delId);
            newQuestionsArray = newQuestionsArray.map((question, index) => {
                return{
                    ...question,
                    id: index+1
                }
            });
            saveToLocalStorage(newQuestionsArray);
            return {
                ...state,
                questions: newQuestionsArray
            }
        },

        questionPoolInit: state => {state.questionPool = Array.from({length: state.questions.length}, (x, i) => i)},

        //typeof action.payload: id
        questionPoolRemove: (state, action) => {
            let questionArray = state.questionPool;
            return {
                ...state,
                questionPool: questionArray.filter((index) => index !== action.payload)
            }
        },

        setRandomQuestion: (state, action) => {
            const index = state.questionPool[action.payload];
            const question = state.questions[index];
            return {
                ...state,
                activeQuestion: question,
                activeQuestionIndex: index
            }
        },

        setGameState: (state, action) => {
            const gameState = action.payload;
            return {
                ...state,
                gameState: gameState
            }
        },

        startGame: state => {state.gameState = "game"},
        startInit: state => {state.gameState = "init"},

        setAnswered: (state, action) => {

            return {
                ...state,
                answered: action.payload
            }
        }
    },
});

export const {addQuestion,
              removeQuestion,
              questionPoolInit,
              questionPoolRemove,
              setRandomQuestion,
              setGameState,
              setAnswered} = quizBankSlice.actions;

export const selectQuestions = state => state.quizBank.questions;
export const selectQuestionPool = state => state.quizBank.questionPool;
export const selectQuestionPoolLength = state => state.quizBank.questionPool.length;
export const selectNumOfQuestions = state => state.quizBank.questions.length;
export const selectGameState = state => state.quizBank.gameState;
export const selectActiveIndex = state => state.quizBank.activeQuestionIndex;
export const selectActiveQuestion = state => state.quizBank.questions[state.quizBank.activeQuestionIndex];
export const selectActiveCorrectIndex = state => state.quizBank.questions[state.quizBank.activeQuestionIndex].correctIndex;
export const selectAnswered = state => state.quizBank.answered;

export default quizBankSlice.reducer;