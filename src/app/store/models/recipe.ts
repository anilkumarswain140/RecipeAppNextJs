interface Recipe {
    title: string;
    ingredients: [];
    image: string;
    steps: [];
    author: {username: ''};
    ratings: number
    averageRating: number;
    comments: comment[];
    preparationTime: number;
    _id: number;
  }