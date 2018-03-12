interface Like {
  user: string;
  status: number;
}

export interface News {
  title: string;
  description: string;
  ownerId: string;
  date: number;
  location?: string;
  point: number;
  likeUsers?: Like[];
  key?: string;
}
