// // lib/imageAnalysis.ts
// import * as tf from '@tensorflow/tfjs';
// import * as cocoSsd from '@tensorflow-models/coco-ssd';
// import '@tensorflow/tfjs-backend-webgl'; // 显式导入 WebGL 后端

// export const analyzeImage = async (imageDataUrl: string) => {
//   try {
//     // 等待 TensorFlow.js 初始化并设置后端
    // await tf.setBackend('webgl');
    // await tf.ready(); // 确保后端准备就绪
    
//     const model = await cocoSsd.load();
//     // 后续代码保持不变...
//   } catch (error) {
//     console.error('Image analysis error:', error);
//     throw new Error('图像分析失败，请重试');
//   }
// };


// 图像分析逻辑（使用 COCO-SSD 模型检测人物）
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs-backend-webgl'; // 显式导入 WebGL 后端

export const analyzeImage = async (imageDataUrl: string) => {
  try {
    await tf.setBackend('webgl');
    await tf.ready(); // 确保后端准备就绪
    const model = await cocoSsd.load();
    const img = new Image();
    img.src = imageDataUrl;
    
    // 等待图像加载完成
    await new Promise(resolve => (img.onload = resolve));
    
    // 检测图像中的物体
    const predictions = await model.detect(img);
    
    // 检查是否检测到人物
    const hasPerson = predictions.some(prediction => prediction.class === 'person');
    
    return { hasPerson, predictions };
  } catch (error) {
    console.error('Image analysis error:', error);
    throw new Error('图像分析失败，请重试');
  }
};