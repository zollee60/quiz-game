import { configureStore } from '@reduxjs/toolkit';
import quizBankReducer from '../features/QuizBank/quizBankSlice';
import userReducer from '../features/userSlice';

export default configureStore({
  reducer: {
    quizBank: quizBankReducer,
    user: userReducer
  },
});
