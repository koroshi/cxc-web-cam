"use client";
import { useRouter } from "next/navigation";
import { useCamera } from "./hooks/useCamera";
import { analyzeImage } from "./lib/imageAnalysis";
import LoadingSpinner from "./components/LoadingSpinner";

import { useState, useEffect } from "react";
import { useImageContext } from "./context/ImageContext";

export default function Home() {
  const {
    videoRef,
    canvasRef,
    isCameraActive,
    error,
    capturedImage,
    countdown,
    startCountdown,
    resetCamera,
  } = useCamera();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const { setImageDataUrl } = useImageContext();

  // 分析捕获的图像并导航到结果页
  const handleImageAnalysis = async () => {
    if (!capturedImage) return;

    try {
      setIsLoading(true);
      const { hasPerson } = await analyzeImage(capturedImage);

      // 调试日志
      console.log("pathname 类型:", typeof "/result"); // 应输出 'string'
      console.log("capturedImage 类型:", typeof capturedImage); // 应输出 'string'

      if (hasPerson) {
        // 导航到结果页，携带图像数据
        // router.push({
        //   pathname: '/result',
        //   query: { image: capturedImage },
        // });

        // TODO:
        // const { imageId } = await uploadImage(capturedImage);
        // router.push(`/result?id=${imageId}`);
        setImageDataUrl(capturedImage);
        router.push("/result");
        // router.push("result.html");
        // router.push('/result?image=' + encodeURIComponent(capturedImage));
      } else {
        setAnalysisError("未检测到人物，请确保您的面部清晰可见");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setAnalysisError(err.message);
      } else {
        setAnalysisError("分析图像时出错");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 当捕获到图像时自动分析
  useEffect(() => {
    if (capturedImage) {
      handleImageAnalysis();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [capturedImage]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">自拍检测</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {analysisError && <p className="text-red-500 mb-4">{analysisError}</p>}

      <div className="camera-container">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <canvas ref={canvasRef} className="hidden" />

        {/* 倒计时覆盖层 */}
        {countdown > 0 && <div className="countdown-overlay">{countdown}</div>}
      </div>

      {/* 拍摄按钮 */}
      <button
        onClick={startCountdown}
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
        disabled={!isCameraActive || countdown > 0 || isLoading}
      >
        {isCameraActive ? "开始自拍" : "加载摄像头..."}
      </button>

      {/* 重拍按钮 */}
      {capturedImage && (
        <button
          onClick={resetCamera}
          className="mt-4 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all"
        >
          重拍
        </button>
      )}

      {isLoading && <LoadingSpinner />}
    </div>
  );
}
