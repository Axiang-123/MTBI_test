import { getBigFiveQuestionsByMode } from '../data/bigFiveQuestions';

export interface BigFiveResults {
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
}

export const calculateBigFive = (mode: 'quick' | 'casual' | 'professional', answers: Record<number, number>): BigFiveResults => {
  const questions = getBigFiveQuestionsByMode(mode);
  
  // 初始化得分
  const scores = {
    O: 0,
    C: 0,
    E: 0,
    A: 0,
    N: 0
  };
  
  // 计算每个维度的得分
  questions.forEach((question) => {
    const answer = answers[question.id];
    if (answer) {
      if (question.direction === 'positive') {
        // 正向题目，得分直接累加
        scores[question.dimension] += answer;
      } else {
        // 反向题目，得分需要反转（6 - 得分）
        scores[question.dimension] += (6 - answer);
      }
    }
  });
  
  // 计算每个维度的百分比得分
  const details = {
    O: calculatePercentage(scores.O, mode, 'O'),
    C: calculatePercentage(scores.C, mode, 'C'),
    E: calculatePercentage(scores.E, mode, 'E'),
    A: calculatePercentage(scores.A, mode, 'A'),
    N: calculatePercentage(scores.N, mode, 'N')
  };
  
  return {
    scores,
    details
  };
};

// 根据测试模式和维度计算百分比得分
function calculatePercentage(rawScore: number, mode: 'quick' | 'casual' | 'professional', _dimension: 'O' | 'C' | 'E' | 'A' | 'N') {
  // 每个模式下每个维度的题目数量
  const questionCounts = {
    quick: 8, // 每个维度8题
    casual: 15, // 每个维度15题
    professional: 25 // 每个维度25题
  };
  
  const count = questionCounts[mode];
  const maxScore = count * 5; // 每题最高5分
  
  // 计算百分比，确保在0-100之间
  return Math.max(0, Math.min(100, Math.round((rawScore / maxScore) * 100)));
}