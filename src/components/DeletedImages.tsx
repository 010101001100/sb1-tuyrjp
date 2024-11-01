import React from 'react';
import { DeletedImage } from '../types';
import { RotateCcw } from 'lucide-react';

interface Props {
  deletedImages: DeletedImage[];
  onRestore: (id: string) => void;
}

export const DeletedImages: React.FC<Props> = ({ deletedImages, onRestore }) => {
  if (deletedImages.length === 0) return null;

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">最近削除した画像</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {deletedImages.map((image) => (
          <div key={image.id} className="relative group">
            <div className="aspect-square overflow-hidden rounded-lg shadow-md">
              <img
                src={image.url}
                alt={image.name}
                className="w-full h-full object-cover opacity-50"
              />
            </div>
            <button
              onClick={() => onRestore(image.id)}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <RotateCcw className="w-8 h-8 text-white" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};