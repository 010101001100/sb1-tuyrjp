import React from 'react';
import { ImageItem } from '../types';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  image: ImageItem | null;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export const ImageModal: React.FC<Props> = ({ image, onClose, onPrevious, onNext }) => {
  if (!image) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300"
      >
        <X className="w-8 h-8" />
      </button>
      <button
        onClick={onPrevious}
        className="absolute left-4 text-white hover:text-gray-300"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        onClick={onNext}
        className="absolute right-4 text-white hover:text-gray-300"
      >
        <ChevronRight className="w-8 h-8" />
      </button>
      <img
        src={image.url}
        alt={image.name}
        className="max-h-[90vh] max-w-[90vw] object-contain"
      />
    </div>
  );
};