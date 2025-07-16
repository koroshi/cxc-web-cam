"use client";
import { useState, useRef, useEffect } from "react";

export const useCamera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);

  // 初始化摄像头
  // useEffect(() => {
  //   const startCamera = async () => {
  //     try {
  //       const stream = await navigator.mediaDevices.getUserMedia({
  //         video: { facingMode: 'user' },
  //       });
  //       if (videoRef.current) {
  //         videoRef.current.srcObject = stream;
  //         setIsCameraActive(true);
  //       }
  //     } catch (err) {
  //       setError('无法访问摄像头，请检查权限或设备');
  //       console.error('Camera error:', err);
  //     }
  //   };
  //   startCamera();

  //   return () => {
  //     if (videoRef.current?.srcObject) {
  //       (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
  //     }
  //   };
  // }, []);
  // 初始化摄像头
  useEffect(() => {
    const videoElement = videoRef.current; // 保存初始引用

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });
        if (videoElement) {
          videoElement.srcObject = stream;
          setIsCameraActive(true);
        }
      } catch (err) {
        setError("无法访问摄像头，请检查权限或设备");
        console.error("Camera error:", err);
      }
    };
    startCamera();

    return () => {
      if (videoElement?.srcObject) {
        (videoElement.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  // 开始倒计时拍摄
  const startCountdown = () => {
    if (!isCameraActive || countdown > 0) return;

    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          captureImage();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // 捕获图像
  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(videoRef.current, 0, 0);

    const imageDataUrl = canvas.toDataURL("image/jpeg");
    setCapturedImage(imageDataUrl);
  };

  // 重置相机
  const resetCamera = () => {
    setCapturedImage(null);
    setError(null);
  };

  return {
    videoRef,
    canvasRef,
    isCameraActive,
    error,
    capturedImage,
    countdown,
    startCountdown,
    resetCamera,
  };
};
