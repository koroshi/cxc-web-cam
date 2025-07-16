"use client";
import { useEffect, useState } from "react";
// import { useSearchParams } from 'next/navigation';
import { uploadImage } from "../api/uploadImage";
import LoadingSpinner from "../components/LoadingSpinner";
import { useImageContext } from "../context/ImageContext";
import Image from "next/image";

export default function ResultPage() {
  const { imageDataUrl } = useImageContext();
  //   const searchParams = useSearchParams();
  //   const imageDataUrl = searchParams.get('image') as string;
  const [uploadStatus, setUploadStatus] = useState("等待上传...");
  const [isLoading, setIsLoading] = useState(true);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [jwtToken, setJwtToken] = useState(""); // 实际项目中应从安全存储获取

  // 模拟获取 JWT Token（实际项目中应从登录状态获取）
  useEffect(() => {
    // 示例：从 localStorage 获取 token
    const token = localStorage.getItem('jwt_token');
    console.log("Retrieved JWT Token:", token);
    // localStorage.setItem('jwt_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0X3VzZXJfMTIzIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTI1MDQxNDQsImV4cCI6MTc1MjU5MDU0NH0.nWIYgL1Hdq0c4QXSkdP4hKLEXbDbZDjk9yA2jMMqv8Q'); // 清除 token，避免重复使用
    if (token) setJwtToken(token);

    // 为演示，使用硬编码的测试 token
    // setJwtToken(
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0X3VzZXJfMTIzIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTI1MDQxNDQsImV4cCI6MTc1MjU5MDU0NH0.nWIYgL1Hdq0c4QXSkdP4hKLEXbDbZDjk9yA2jMMqv8Q"
    // );
  }, []);

  // 自动上传图像到后端
  useEffect(() => {
    if (!imageDataUrl) return;

    const upload = async () => {
      try {
        setUploadStatus("正在上传...");
        const result = await uploadImage(imageDataUrl, jwtToken);
        setUploadStatus("上传成功！");
        console.log("Upload result:", result);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setUploadError(err.message);
        } else {
          setUploadError("上传失败");
        }
      } finally {
        setIsLoading(false);
      }
    };

    upload();
  }, [imageDataUrl, jwtToken]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">自拍结果</h1>

      {isLoading && <LoadingSpinner />}

      <div className="camera-container mb-8">
        {/* <img
          src={imageDataUrl}
          alt="自拍照片"
          className="w-full h-full object-cover"
        /> */}
        {imageDataUrl && (
          <Image
            src={imageDataUrl}
            alt="自拍照片"
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {uploadStatus && (
        <p
          className={`text-lg ${
            uploadStatus === "上传成功！" ? "text-green-600" : "text-gray-600"
          }`}
        >
          {uploadStatus}
        </p>
      )}

      {uploadError && <p className="text-red-500 mt-2">{uploadError}</p>}

      <button
        onClick={() => (window.location.href = "/")}
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
      >
        再拍一张
      </button>
    </div>
  );
}
