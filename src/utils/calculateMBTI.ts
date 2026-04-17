import { getQuestionsByMode } from '../data/questions';

interface MBTIScores {
  E: number;
  I: number;
  S: number;
  N: number;
  T: number;
  F: number;
  J: number;
  P: number;
}

interface MBTIResult {
  type: string;
  scores: MBTIScores;
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
}

export const calculateMBTI = (mode: 'quick' | 'casual' | 'professional', answers: Record<number, number>): MBTIResult => {
  const questions = getQuestionsByMode(mode);
  
  // 初始化得分
  const scores: MBTIScores = {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0
  };
  
  // 计算得分
  questions.forEach((question) => {
    const answer = answers[question.id];
    if (answer) {
      switch (question.direction) {
        case 'E':
          scores.E += answer;
          scores.I += 6 - answer;
          break;
        case 'I':
          scores.I += answer;
          scores.E += 6 - answer;
          break;
        case 'S':
          scores.S += answer;
          scores.N += 6 - answer;
          break;
        case 'N':
          scores.N += answer;
          scores.S += 6 - answer;
          break;
        case 'T':
          scores.T += answer;
          scores.F += 6 - answer;
          break;
        case 'F':
          scores.F += answer;
          scores.T += 6 - answer;
          break;
        case 'J':
          scores.J += answer;
          scores.P += 6 - answer;
          break;
        case 'P':
          scores.P += answer;
          scores.J += 6 - answer;
          break;
      }
    }
  });
  
  // 确定最终类型
  const type = (
    (scores.E > scores.I ? 'E' : 'I') +
    (scores.S > scores.N ? 'S' : 'N') +
    (scores.T > scores.F ? 'T' : 'F') +
    (scores.J > scores.P ? 'J' : 'P')
  );
  
  // 计算各维度的百分比
  const details = {
    E: Math.round((scores.E / (scores.E + scores.I)) * 100),
    I: Math.round((scores.I / (scores.E + scores.I)) * 100),
    S: Math.round((scores.S / (scores.S + scores.N)) * 100),
    N: Math.round((scores.N / (scores.S + scores.N)) * 100),
    T: Math.round((scores.T / (scores.T + scores.F)) * 100),
    F: Math.round((scores.F / (scores.T + scores.F)) * 100),
    J: Math.round((scores.J / (scores.J + scores.P)) * 100),
    P: Math.round((scores.P / (scores.J + scores.P)) * 100)
  };
  
  return {
    type,
    scores,
    details
  };
};