import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTestStore } from '../store/testStore';

interface TestMode {
  id: string;
  name: string;
  description: string;
  duration: string;
  questions: number;
  color: string;
  hoverColor: string;
}

const testModes: TestMode[] = [
  {
    id: 'quick',
    name: '快速模式',
    description: '5-8分钟内完成，适合快速了解自己的性格类型',
    duration: '5-8分钟',
    questions: 40,
    color: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-600'
  },
  {
    id: 'casual',
    name: '休闲模式',
    description: '15-20分钟内完成，提供更全面的性格分析',
    duration: '15-20分钟',
    questions: 72,
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-600'
  },
  {
    id: 'professional',
    name: '专业模式',
    description: '35-45分钟内完成，深入分析性格特征',
    duration: '35-45分钟',
    questions: 200,
    color: 'bg-purple-500',
    hoverColor: 'hover:bg-purple-600'
  }
];

const TestModeSelection: React.FC = () => {
  const navigate = useNavigate();
  const resetTest = useTestStore((state) => state.resetTest);

  const handleModeSelect = (modeId: string) => {
    resetTest();
    navigate(`/test/${modeId}`);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">MBTI 性格测试</h1>
        <p className="text-xl text-gray-600 mb-12">选择适合您的测试模式，探索您的性格类型</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testModes.map((mode) => (
            <motion.div
              key={mode.id}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 cursor-pointer transition-shadow hover:shadow-xl card-hover"
              onClick={() => handleModeSelect(mode.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleModeSelect(mode.id);
                }
              }}
              aria-label={`选择${mode.name}，${mode.description}，预计完成时间${mode.duration}，共${mode.questions}题`}
            >
              <div className={`${mode.color} h-2`}></div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{mode.name}</h2>
                <p className="text-gray-600 mb-4">{mode.description}</p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">预计时间</span>
                    <span className="font-medium text-gray-900">{mode.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">题目数量</span>
                    <span className="font-medium text-gray-900">{mode.questions} 题</span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleModeSelect(mode.id);
                  }}
                  className={`w-full py-3 px-4 rounded-lg font-medium text-white ${mode.color} ${mode.hoverColor} transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  aria-label={`开始${mode.name}`}
                >
                  开始测试
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/big-five')}
            className="px-6 py-3 rounded-lg font-medium bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            aria-label="尝试大五人格测试"
          >
            尝试大五人格测试
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default TestModeSelection;