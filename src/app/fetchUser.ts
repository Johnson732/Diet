
export interface FetchUser {
  UserId: string;
  Firstname: string;
  Lastname: string;
  Dob: string; // Assuming date is in string format
  UserGender: number;
  Height: number;
  Weight: number;
  ExerciseLevel: number;
  UserGoal: number;
  UserGenderNavigation?: {
    GenderId: number;
    GenderValue: string;
  };
  ExerciseLevelNavigation?: {
    PalId: number;
    Exercise: string;
    PalValue: number;
  };
  UserGoalNavigation?: {
    GoalId: number;
    GoalValue: string;
  };
  //UserFoods: any[]; // You might want to define a proper interface for UserFoods
}
