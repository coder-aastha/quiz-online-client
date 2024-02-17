import axios from "axios";

interface QuizQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctAnswer: string[];
  // Add other properties as needed
}

export const api = axios.create({
  baseURL: "http://localhost:9192/api/quizzes"
});

export const createQuestion = async (quizQuestion: QuizQuestion) => {
  try {
    const response = await api.post("/create-new-question", quizQuestion);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getAllQuestions = async () => {
  try {
    const response = await api.get("/all-questions")
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const fetchQuizForUser = async (number: number, subject: string) => {
  try {
    const response = await api.get(`/quiz/fetch-questions-for-user?numOfQuestions=${number}&subject=${subject}`)
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const getSubjects = async () => {
  try {
    const response = await api.get("/subjects")
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const updateQuestion = async (id: string, question: QuizQuestion) => {
  try {
    const response = await api.put(`/question/${id}/update`, question)
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getQuestionById = async (id: string) => {
  try {
    const response = await api.get(`/question/${id}`)
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const deleteQuestion = async (id: string) => {
  try {
    const response = await api.delete(`/question/${id}/delete`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
