import React, { useState } from 'react';
import { ImageGrid } from './components/ImageGrid';
import { ImageModal } from './components/ImageModal';
import { UploadArea } from './components/UploadArea';
import { DeletedImages } from './components/DeletedImages';
import { ImageItem, DeletedImage } from './types';
import toast, { Toaster } from 'react-hot-toast';
import { Gallery } from 'lucide-react';

function App() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [deletedImages, setDeletedImages] = useState<DeletedImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  const handleFilesDrop = (files: File[]) => {
    const newImages = files.map((file) => ({
      id: crypto.randomUUID(),
      url: URL.createObjectURL(file),
      type: 'file' as const,
      name: file.name,
      createdAt: new Date(),
    }));
    setImages((prev) => [...newImages, ...prev]);
    toast.success(`${files.length}枚の画像をアップロードしました`);
  };

  const handleUrlAdd = (url: string) => {
    try {
      new URL(url);
      const newImage: ImageItem = {
        id: crypto.randomUUID(),
        url,
        type: 'url',
        name: url.split('/').pop() || 'image',
        createdAt: new Date(),
      };
      setImages((prev) => [newImage, ...prev]);
      toast.success('画像を追加しました');
    } catch {
      toast.error('無効なURLです');
    }
  };

  const handleTwitterUrlAdd = async (url: string) => {
    // Note: In a real application, you would need to implement Twitter API integration
    toast.error('Twitter画像の取得は現在実装されていません');
  };

  const handleDelete = (id: string) => {
    const imageToDelete = images.find((img) => img.id === id);
    if (imageToDelete) {
      setImages((prev) => prev.filter((img) => img.id !== id));
      setDeletedImages((prev) => [{
        ...imageToDelete,
        deletedAt: new Date(),
      }, ...prev.slice(0, 9)]);
      toast.success('画像を削除しました');
    }
  };

  const handleRestore = (id: string) => {
    const imageToRestore = deletedImages.find((img) => img.id === id);
    if (imageToRestore) {
      const { deletedAt, ...restoredImage } = imageToRestore;
      setImages((prev) => [restoredImage, ...prev]);
      setDeletedImages((prev) => prev.filter((img) => img.id !== id));
      toast.success('画像を復元しました');
    }
  };

  const handleDownload = async (image: ImageItem) => {
    try {
      const response = await fetch(image.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = image.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success('ダウンロードを開始しました');
    } catch {
      toast.error('ダウンロードに失敗しました');
    }
  };

  const currentIndex = selectedImage ? images.findIndex(img => img.id === selectedImage.id) : -1;

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setSelectedImage(images[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setSelectedImage(images[currentIndex + 1]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex items-center">
          <Gallery className="w-8 h-8 text-blue-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">画像ギャラリー</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <UploadArea
            onFilesDrop={handleFilesDrop}
            onUrlAdd={handleUrlAdd}
            onTwitterUrlAdd={handleTwitterUrlAdd}
          />
          
          <ImageGrid
            images={images}
            onDelete={handleDelete}
            onView={setSelectedImage}
            onDownload={handleDownload}
          />

          <DeletedImages
            deletedImages={deletedImages}
            onRestore={handleRestore}
          />
        </div>
      </main>

      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />

      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;