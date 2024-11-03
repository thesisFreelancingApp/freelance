export interface Database {
  public: {
    Tables: {
      AuthUser: {
        Row: {
          id: string;
          email: string;
          role: "USER" | "ADMIN";
          name: string | null;
          username: string;
          createdAt: string;
          updatedAt: string;
        };
      };
      PersonalProfile: {
        Row: {
          id: string;
          firstName: string | null;
          lastName: string | null;
          profilePic: string | null;
          title: string | null;
          phoneNumber: string | null;
          address: string | null;
          bio: string | null;
          birthDate: string | null;
          userEmail: string;
          professionalProfileid: string | null;
          walletid: string | null;
          createdAt: string;
          updatedAt: string;
        };
      };
      Service: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          medias: string[] | null;
          tags: string[];
          creatorId: string;
          categoryId: number;
          createdAt: string;
          updatedAt: string;
        };
      };
      ServicePackage: {
        Row: {
          id: string;
          serviceId: string;
          name: string | null;
          description: string | null;
          deliveryTime: number | null;
          price: number | null;
          revisions: number | null;
          features: string[];
        };
      };
      Rating: {
        Row: {
          id: string;
          raterId: string;
          rateeId: string;
          serviceId: string | null;
          projectsId: string | null;
          rating: number;
          review: string | null;
          createdAt: string;
        };
      };
      MainCategories: {
        Row: {
          id: number;
          name: string;
          description: string | null;
          level: number;
          parentId: number | null;
          imageUrl: string | null;
          iconUrl: string | null;
          slug: string | null;
          createdAt: string;
          updatedAt: string;
        };
      };
    };
  };
}
