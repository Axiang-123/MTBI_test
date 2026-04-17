import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBigFiveTestStore } from '../store/bigFiveTestStore';
import { calculateBigFive } from '../utils/calculateBigFive';
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

const BigFiveResultPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    testMode,
    answers,
    results,
    setResults,
    completeTest,
    resetTest
  } = useBigFiveTestStore();

  if (!testMode || Object.keys(answers).length === 0) {
    navigate('/big-five');
    return null;
  }

  useEffect(() => {
    if (!results) {
      const bigFiveResult = calculateBigFive(testMode, answers);
      setResults(bigFiveResult);
      completeTest();
    }
  }, [testMode, answers, results, setResults, completeTest]);

  if (!results) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">正在分析您的结果...</p>
        </div>
      </div>
    );
  }

  const chartData = {
    labels: ['开放性 (O)', '责任心 (C)', '外向性 (E)', '宜人性 (A)', '神经质 (N)'],
    datasets: [
      {
        label: '您的得分',
        data: [
          results.details.O,
          results.details.C,
          results.details.E,
          results.details.A,
          results.details.N
        ],
        backgroundColor: 'rgba(74, 222, 128, 0.2)',
        borderColor: 'rgba(74, 222, 128, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(74, 222, 128, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(74, 222, 128, 1)'
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

  const getDimensionDescription = (dimension: string, score: number) => {
    switch (dimension) {
      case 'O':
        if (score > 70) return '您具有高度的开放性，喜欢尝试新事物，富有创造力和想象力。';
        if (score < 30) return '您相对保守，喜欢传统和熟悉的事物，注重实际。';
        return '您的开放性处于中等水平，既能够适应变化，又保持一定的传统价值观。';
      case 'C':
        if (score > 70) return '您具有高度的责任心，做事有条理，注重细节和目标实现。';
        if (score < 30) return '您相对随性，喜欢灵活和自发的生活方式。';
        return '您的责任心处于中等水平，能够在结构和灵活性之间取得平衡。';
      case 'E':
        if (score > 70) return '您是一个外向的人，喜欢社交活动，充满活力和热情。';
        if (score < 30) return '您是一个内向的人，喜欢独处和安静的环境。';
        return '您的外向性处于中等水平，能够在社交和独处之间取得平衡。';
      case 'A':
        if (score > 70) return '您具有高度的宜人性，善于理解和关心他人，倾向于合作。';
        if (score < 30) return '您相对竞争和直接，更注重个人目标。';
        return '您的宜人性处于中等水平，能够在考虑他人和关注自我之间取得平衡。';
      case 'N':
        if (score > 70) return '您的情绪较为敏感，容易感到焦虑和压力。';
        if (score < 30) return '您的情绪较为稳定，能够应对压力和挑战。';
        return '您的情绪稳定性处于中等水平，能够在不同情况下保持相对平衡的情绪状态。';
      default:
        return '';
    }
  };

  const handleRetakeTest = () => {
    resetTest();
    navigate('/big-five');
  };

  const handleShare = async () => {
    const shareData = {
      title: '我的大五人格测试结果',
      text: `我刚刚完成了大五人格测试，结果显示我的开放性: ${results.details.O}%, 责任心: ${results.details.C}%, 外向性: ${results.details.E}%, 宜人性: ${results.details.A}%, 神经质: ${results.details.N}%。快来了解你的性格特征吧！`,
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
          <div className="bg-green-600 text-white p-6 sm:p-8">
            <h1 className="text-2xl sm:text-4xl font-extrabold mb-2">您的大五人格测试结果</h1>
            <p className="text-lg sm:text-xl opacity-90">基于五个核心性格维度的分析</p>
          </div>

          <div className="p-6 sm:p-8">
            <section className="mb-8" aria-labelledby="chart-heading">
              <h3 id="chart-heading" className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">维度得分</h3>
              <div className="h-64 sm:h-80">
                <Radar data={chartData} options={chartOptions} />
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8" aria-labelledby="dimensions-heading">
              <div>
                <h3 id="dimensions-heading" className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">开放性 (O)</h3>
                <div className="flex items-center mb-4">
                  <span className="text-lg font-bold text-green-600 mr-2">{results.details.O}%</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${results.details.O}%` }}></div>
                  </div>
                </div>
                <p className="text-gray-700">{getDimensionDescription('O', results.details.O)}</p>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">责任心 (C)</h3>
                <div className="flex items-center mb-4">
                  <span className="text-lg font-bold text-green-600 mr-2">{results.details.C}%</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${results.details.C}%` }}></div>
                  </div>
                </div>
                <p className="text-gray-700">{getDimensionDescription('C', results.details.C)}</p>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">外向性 (E)</h3>
                <div className="flex items-center mb-4">
                  <span className="text-lg font-bold text-green-600 mr-2">{results.details.E}%</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${results.details.E}%` }}></div>
                  </div>
                </div>
                <p className="text-gray-700">{getDimensionDescription('E', results.details.E)}</p>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">宜人性 (A)</h3>
                <div className="flex items-center mb-4">
                  <span className="text-lg font-bold text-green-600 mr-2">{results.details.A}%</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${results.details.A}%` }}></div>
                  </div>
                </div>
                <p className="text-gray-700">{getDimensionDescription('A', results.details.A)}</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">神经质 (N)</h3>
                <div className="flex items-center mb-4">
                  <span className="text-lg font-bold text-green-600 mr-2">{results.details.N}%</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${results.details.N}%` }}></div>
                  </div>
                </div>
                <p className="text-gray-700">{getDimensionDescription('N', results.details.N)}</p>
              </div>
            </section>

            <section className="mb-8" aria-labelledby="insights-heading">
              <h3 id="insights-heading" className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">性格洞察</h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  您的性格特征是独特的组合，每个维度都反映了您在不同情境下的行为倾向。这些维度没有好坏之分，而是帮助您更好地了解自己，从而在生活和工作中发挥优势。
                </p>
                <p className="text-gray-700">
                  例如，高开放性的人可能在创意领域表现出色，而高责任心的人可能在需要组织和计划的工作中脱颖而出。了解自己的性格特征可以帮助您做出更适合自己的职业和生活选择。
                </p>
              </div>
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
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/big-five')}
                className="px-6 py-3 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                aria-label="返回测试首页"
              >
                返回首页
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BigFiveResultPage;