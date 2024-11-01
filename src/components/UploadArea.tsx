import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Link } from 'lucide-react';

interface Props {
  onFilesDrop: (files: File[]) => void;
  onUrlAdd: (url: string) => void;
  onTwitterUrlAdd: (url: string) => void;
}

export const UploadArea: React.FC<Props> = ({ onFilesDrop, onUrlAdd, onTwitterUrlAdd }) => {
  const [url, setUrl] = React.useState('');
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    },
    onDrop: onFilesDrop
  });

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.includes('twitter.com') || url.includes('x.com')) {
      onTwitterUrlAdd(url);
    } else {
      onUrlAdd(url);
    }
    setUrl('');
  };

  return (
    <div className="space-y-4 p-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          ドラッグ＆ドロップで画像をアップロード、またはクリックして選択
        </p>
      </div>

      <form onSubmit={handleUrlSubmit} className="flex gap-2">
        <div className="flex-1">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="画像URLまたはTwitterのURL"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Link className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};