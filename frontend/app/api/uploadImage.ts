// 后端 API 调用
export const uploadImage = async (imageDataUrl: string, token: string) => {
  try {
    // 从 DataURL 提取 Base64 数据
    const base64Data = imageDataUrl.replace(/^data:image\/jpeg;base64,/, '');
    
    // 转换为 Blob
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/jpeg' });
    
    // 创建 FormData
    const formData = new FormData();
    formData.append('image', blob, 'selfie.jpg');
    
    // 发送请求到后端
    const response = await fetch('http://localhost:3001/images', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('上传失败');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Upload error:', error);
    throw new Error('上传到服务器失败');
  }
};