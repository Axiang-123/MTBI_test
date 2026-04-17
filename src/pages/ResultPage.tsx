import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTestStore } from '../store/testStore';
import { calculateMBTI } from '../utils/calculateMBTI';
import { mbtiTypes } from '../data/mbtiTypes';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    testMode,
    answers,
    results,
    setResults,
    completeTest,
    resetTest
  } = useTestStore();

  if (!testMode || Object.keys(answers).length === 0) {
    navigate('/');
    return null;
  }

  useEffect(() => {
    if (!results) {
      const mbtiResult = calculateMBTI(testMode, answers);
      setResults(mbtiResult);
      completeTest();
    }
  }, [testMode, answers, results, setResults, completeTest]);

  if (!results) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">正在分析您的结果...</p>
        </div>
      </div>
    );
  }

  const mbtiType = mbtiTypes[results.type];

  if (!mbtiType) {
    return null;
  }

  const chartData = {
    labels: ['外向 (E)', '内向 (I)', '感觉 (S)', '直觉 (N)', '思考 (T)', '情感 (F)', '判断 (J)', '知觉 (P)'],
    datasets: [
      {
        label: '您的得分',
        data: [
          results.details.E,
          results.details.I,
          results.details.S,
          results.details.N,
          results.details.T,
          results.details.F,
          results.details.J,
          results.details.P
        ],
        backgroundColor: 'rgba(54, 162, 235, .2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
      }
    ]
  };

  const chartOptions = {
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20
        }
      }
    }
  };

  const handleRetakeTest = () => {
    resetTest();
    navigate('/');
  };

  const handleShare = async () => {
    const shareData = {
      title: `我的MBTI性格类型是${results.type} - ${mbtiType.name}`,
      text: `我刚刚完成了MBTI性格测试，结果是${results.type} - ${mbtiType.name}。快来了解你的性格类型吧！`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled or failed');
      }
    } else {
      const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`;
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 card-hover"
        >
          <div className="bg-blue-600 text-white p-6 sm:p-8">
            <h1 className="text-2xl sm:text-4xl font-extrabold mb-2">您的MBTI性格类型</h1>
            <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold">{results.type}</h2>
                <p className="text-lg sm:text-xl opacity-90">{mbtiType.name}</p>
              </div>
              <div className="bg-white text-blue-600 rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center text-xl sm:text-2xl font-bold">
                {results.type}
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <section className="mb-8" aria-labelledby="description-heading">
              <h3 id="description-heading" className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">性格描述</h3>
              <p className="text-gray-700 leading-relaxed">{mbtiType.description}</p>
            </section>

            <section className="mb-8" aria-labelledby="chart-heading">
              <h3 id="chart-heading" className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">维度得分</h3>
              <div className="h-64 sm:h-80">
                <Radar data={chartData} options={chartOptions} />
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8" aria-labelledby="traits-heading">
              <div>
                <h3 id="traits-heading" className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">核心优势</h3>
                <ul className="space-y-2">
                  {mbtiType.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
                      <span className="text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 id="traits-heading" className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">潜在盲点</h3>
                <ul className="space-y-2">
                  {mbtiType.blindSpots.map((blindSpot, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-amber-500 mr-2 flex-shrink-0">!</span>
                      <span className="text-gray-700">{blindSpot}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="mb-8" aria-labelledby="career-heading">
              <h3 id="career-heading" className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">适合的职业方向</h3>
              <div className="flex flex-wrap gap-2">
                {mbtiType.careerPaths.map((career, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {career}
                  </span>
                ))}
              </div>
            </section>

            <section className="mb-8" aria-labelledby="celebrities-heading">
              <h3 id="celebrities-heading" className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">名人案例</h3>
              <p className="text-gray-700">与您性格类型相同的成功人士：</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {mbtiType.celebrities.map((celebrity, index) => (
                  <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    {celebrity}
                  </span>
                ))}
              </div>
            </section>

            <section className="mb-8" aria-labelledby="tips-heading">
              <h3 id="tips-heading" className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">性格发展建议</h3>
              <ul className="space-y-2">
                {mbtiType.developmentTips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2 flex-shrink-0">💡</span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="flex flex-wrap justify-center gap-4" role="group" aria-label="操作按钮">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="px-6 py-3 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                aria-label="分享测试结果"
              >
                分享结果
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRetakeTest}
                className="px-6 py-3 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-label="重新进行测试"
              >
                重新测试
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultPage;