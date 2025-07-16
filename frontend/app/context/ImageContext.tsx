'use client';
// 创建 ImageContext.tsx
import { createContext, useContext, useState } from 'react';

const ImageContext = createContext<{
  imageDataUrl: string | null;
  setImageDataUrl: (url: string | null) => void;
}>({
  imageDataUrl: null,
  setImageDataUrl: () => {},
});

export const ImageProvider = ({ children }: { children: React.ReactNode }) => {
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  
  return (
    <ImageContext.Provider value={{ imageDataUrl, setImageDataUrl }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => useContext(ImageContext);