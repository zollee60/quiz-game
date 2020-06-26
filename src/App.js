import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import { QuizBank } from './features/QuizBank/QuizBank';
import { QuestionForm } from './features/QuestionForm/QuestionForm';
import { GameContainer } from './features/GameContainer/GameContainer';
import {NavBar} from "./features/NavBar/NavBar";

function App() {
  return (
      <BrowserRouter>
          <div className="App">
              <Route path="/" exact render={() => <GameContainer />}/>
              <Route path="/questionManager" render={() =>
                <div>
                    <NavBar />
                    <QuizBank />
                    <QuestionForm />
                </div>
              }/>

          </div>
      </BrowserRouter>
  );
}

export default App;
