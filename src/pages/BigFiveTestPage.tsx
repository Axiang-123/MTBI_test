import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useBigFiveTestStore } from '../store/bigFiveTestStore';
import { getBigFiveQuestionsByMode } from '../data/bigFiveQuestions';

const answerLabels = ['非常不同意', '不同意', '中立', '同意', '非常同意'];

const BigFiveTestPage: React.FC = () => {
  const { mode } = useParams<{ mode: 'quick' | 'casual' | 'professional' }>();
  const navigate = useNavigate();

  const {
    testMode,
    currentQuestionIndex,
    answers,
    setTestMode,
    setAnswer,
    nextQuestion,
    resetTest
  } = useBigFiveTestStore();

  if (!mode || !['quick', 'casual', 'professional'].includes(mode)) {
    navigate('/big-five');
    return null;
  }

  useEffect(() => {
    if (testMode !== mode) {
      setTestMode(mode);
    }
  }, [mode, testMode, setTestMode]);

  const questions = getBigFiveQuestionsByMode(mode);
  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion.id];

  if (!currentQuestion) {
    return null;
  }

  const handleAnswerChange = (score: number) => {
    setAnswer(currentQuestion.id, score);
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        nextQuestion();
      }, 300);
    } else {
      setTimeout(() => {
        navigate('/big-five/result');
      }, 300);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, score: number) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      const direction = e.key === 'ArrowUp' ? -1 : 1;
      const newScore = Math.max(1, Math.min(5, score + direction));
      if (newScore !== score) {
        handleAnswerChange(newScore);
      }
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      const prevQuestion = questions[prevIndex];
      if (!answers[prevQuestion.id]) {
        useBigFiveTestStore.getState().setAnswer(prevQuestion.id, 0);
      }
      useBigFiveTestStore.getState().prevQuestion();
    }
  };

  const handleExit = () => {
    resetTest();
    navigate('/big-five');
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              问题 {currentQuestionIndex + 1} / {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="bg-green-600 h-2.5 rounded-full"
              role="progressbar"
              aria-valuenow={currentQuestionIndex + 1}
              aria-valuemin={1}
              aria-valuemax={questions.length}
              aria-label={`测试进度${currentQuestionIndex + 1}of ${questions.length}`}
            ></motion.div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8 card-hover"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
              {currentQuestion.text}
            </h2>

            <div
              className="space-y-3"
              role="radiogroup"
              aria-label="请选择您的答案"
            >
              {[1, 2, 3, 4, 5].map((score) => (
                <motion.button
                  key={score}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswerChange(score)}
                  onKeyDown={(e) => handleKeyDown(e, score)}
                  className={`w-full text-left py-3 px-4 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${currentAnswer === score
                    ? 'border-green-500 bg-green-50 text-green-700 shadow-md'
                    : 'border-gray-200 hover:bg-gray-50 hover:border-green-300'}`}
                  role="radio"
                  aria-checked={currentAnswer === score}
                  aria-label={answerLabels[score - 1]}
                  tabIndex={currentAnswer === score || (!currentAnswer && score === 3) ? 0 : -1}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${currentAnswer === score ? 'text-green-700' : 'text-gray-700'}`}>
                      {answerLabels[score - 1]}
                    </span>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${currentAnswer === score
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200'}`}>
                      {currentAnswer === score && <span>✓</span>}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            <p className="text-center text-sm text-gray-500 mt-4">
              选择答案后将自动跳转到下一题
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-4">
          <button
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className={`px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${currentQuestionIndex === 0
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            aria-label="上一题"
          >
            上一题
          </button>
          <button
            onClick={handleExit}
            className="px-6 py-3 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            aria-label="退出测试"
          >
            退出测试
          </button>
        </div>
      </div>
    </div>
  );
};

export default BigFiveTestPage;