export type UserProfile = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string | null;
  created_at: string;
  updated_at: string;
};

export type SignUpData = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
};

export type LoginData = {
  email: string;
  password: string;
};
