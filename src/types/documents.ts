export interface Document {
  id: string;
  name: string;
  link: string;
}

export interface DocumentCategory {
  title: string;
  documents: Document[];
}

export type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';