import React, { useEffect, useState } from 'react';
import { getQuestionById } from '../utils/QuizService';
import { Link, useParams } from 'react-router-dom';
import { updateQuestion } from '../utils/QuizService';

export const UpdateQuestion = () => {
  const [question, setQuestion] = useState('');
  const [choices, setChoices] = useState(['']);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>(['']);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const questionToUpdate = await getQuestionById(id);
      if (questionToUpdate) {
        setQuestion(questionToUpdate.question || ''); // Null check added
        setChoices(questionToUpdate.choices || ['']); // Null check added
        setCorrectAnswers(questionToUpdate.correctAnswers || ['']); // Null check added
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);
  };

  const handleChoiceChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const updateChoices = [...choices];
    updateChoices[index] = e.target.value;
    setChoices(updateChoices);
  };

  const handleCorrectAnswerChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedCorrectAnswers = [...correctAnswers];
    updatedCorrectAnswers[index] = e.target.value;
    setCorrectAnswers(updatedCorrectAnswers);
  };

  const handleQuestionUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedQuestion = {
        question: question || '', // Null check added
        choices,
        correctAnswers: (correctAnswers || ['']).map(answer => answer.trim()),
      };
      await updateQuestion(id, updatedQuestion);
      // Todo: navigate back to all question page
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="container">
      <h4 className="mt-5" style={{ color: 'GrayText' }}>
        Update Quiz Question
      </h4>
      <div className="col-md-8">
        <form onSubmit={handleQuestionUpdate}>
          <div className="form-group">
            <label className="text-info">Question:</label>
            <textarea
              className="form-control"
              rows={4}
              value={question}
              onChange={handleQuestionChange}
            />
          </div>
          <div className="form-group">
            <label className="text-info">Choices:</label>
            {choices.map((choice, index) => (
              <input
                key={index}
                className="form-control mb-4"
                type="text"
                value={choice}
                onChange={(e) => handleChoiceChange(index, e)}
              />
            ))}
          </div>

          <div className="form-group">
            <label className="text-info">Correct Answer(s):</label>
            {correctAnswers.map((answer, index) => (
              <input
                key={index}
                className="form-control mb-4"
                type="text"
                value={answer}
                onChange={(e) => handleCorrectAnswerChange(index, e)}
              />
            ))}
          </div>

          <div className="btn-group">
            <button type="submit" className="btn btn-sm btn-outline-warning">
              Update Question
            </button>
            <Link to={"/all-quizzes"} className='btn btn-outline-primary ml-2'>
              Back to all questions
          </Link>
          </div>
        </form>
      </div>
    </section>
  );
};
