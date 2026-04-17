import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TestState {
  // 测试状态
  testMode: 'quick' | 'casual' | 'professional' | null;
  currentQuestionIndex: number;
  answers: Record<number, number>; // 题目ID -> 答案分数
  isCompleted: boolean;
  results: {
    type: string;
    scores: {
      E: number;
      I: number;
      S: number;
      N: number;
      T: number;
      F: number;
      J: number;
      P: number;
    };
    details: {
      E: number;
      I: number;
      S: number;
      N: number;
      T: number;
      F: number;
      J: number;
      P: number;
    };
  } | null;
  
  // 操作
  setTestMode: (mode: 'quick' | 'casual' | 'professional') => void;
  setAnswer: (questionId: number, score: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  resetTest: () => void;
  setResults: (results: {
    type: string;
    scores: {
      E: number;
      I: number;
      S: number;
      N: number;
      T: number;
      F: number;
      J: number;
      P: number;
    };
    details: {
      E: number;
      I: number;
      S: number;
      N: number;
      T: number;
      F: number;
      J: number;
      P: number;
    };
  }) => void;
  completeTest: () => void;
}

export const useTestStore = create<TestState>()(
  persist(
    (set) => ({
      // 初始状态
      testMode: null,
      currentQuestionIndex: 0,
      answers: {},
      isCompleted: false,
      results: null,
      
      // 操作
      setTestMode: (mode) => set({ 
        testMode: mode, 
        currentQuestionIndex: 0, 
        answers: {}, 
        isCompleted: false, 
        results: null 
      }),
      
      setAnswer: (questionId, score) => set((state) => ({
        answers: {
          ...state.answers,
          [questionId]: score
        }
      })),
      
      nextQuestion: () => set((state) => ({
        currentQuestionIndex: state.currentQuestionIndex + 1
      })),
      
      prevQuestion: () => set((state) => ({
        currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1)
      })),
      
      resetTest: () => set({
        testMode: null,
        currentQuestionIndex: 0,
        answers: {},
        isCompleted: false,
        results: null
      }),
      
      setResults: (results) => set({ results }),
      
      completeTest: () => set({ isCompleted: true })
    }),
    {
      name: 'mbti-test-storage',
      partialize: (state) => ({
        testMode: state.testMode,
        currentQuestionIndex: state.currentQuestionIndex,
        answers: state.answers,
        isCompleted: state.isCompleted,
        results: state.results
      })
    }
  )
);