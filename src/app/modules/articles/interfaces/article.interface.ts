export interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  // user?: {
  //   people?: {
  //     firstName: string;
  //     lastName: string;
  //   };
  // };
  author?: {
    firstName?: string;
    lastName?: string;
  };
  theme?: {
    catalogType?: string;
  };
}
