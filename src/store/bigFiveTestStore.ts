import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BigFiveTestState {
  // 测试状态
  testMode: 'quick' | 'casual' | 'professional' | null;
  currentQuestionIndex: number;
  answers: Record<number, number>; // 题目ID -> 答案分数
  isCompleted: boolean;
  results: {
    scores: {
      O: number; // 开放性
      C: number; // 责任心
      E: number; // 外向性
      A: number; // 宜人性
      N: number; // 神经质
    };
    details: {
      O: number;
      C: number;
      E: number;
      A: number;
      N: number;
    };
  } | null;
  
  // 操作
  setTestMode: (mode: 'quick' | 'casual' | 'professional') => void;
  setAnswer: (questionId: number, score: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  resetTest: () => void;
  setResults: (results: {
    scores: {
      O: number;
      C: number;
      E: number;
      A: number;
      N: number;
    };
    details: {
      O: number;
      C: number;
      E: number;
      A: number;
      N: number;
    };
  }) => void;
  completeTest: () => void;
}

export const useBigFiveTestStore = create<BigFiveTestState>()(
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
      name: 'big-five-test-storage',
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