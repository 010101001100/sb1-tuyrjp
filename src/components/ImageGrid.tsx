import React from 'react';
import { ImageItem } from '../types';
import { Download, Trash2, ExternalLink } from 'lucide-react';

interface Props {
  images: ImageItem[];
  onDelete: (id: string) => void;
  onView: (image: ImageItem) => void;
  onDownload: (image: ImageItem) => void;
}

export const ImageGrid: React.FC<Props> = ({ images, onDelete, onView, onDownload }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {images.map((image) => (
        <div key={image.id} className="relative group">
          <div 
            className="aspect-square overflow-hidden rounded-lg shadow-md cursor-pointer"
            onClick={() => onView(image)}
          >
            <img
              src={image.url}
              alt={image.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDownload(image);
                }}
                className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
              >
                <Download className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(image.id);
                }}
                className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
              >
                <Trash2 className="w-5 h-5 text-red-500" />
              </button>
              {image.type === 'twitter' && (
                <a
                  href={image.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-5 h-5 text-blue-500" />
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};