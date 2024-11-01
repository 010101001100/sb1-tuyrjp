export interface ImageItem {
  id: string;
  url: string;
  type: 'url' | 'file' | 'twitter';
  name: string;
  createdAt: Date;
}

export interface DeletedImage extends ImageItem {
  deletedAt: Date;
}