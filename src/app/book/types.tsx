interface Metadata {
  title: string;
  author: string;
  language: string;
}

export interface Book {
  id: number
  external_id: string;
  metadata: Metadata;
}