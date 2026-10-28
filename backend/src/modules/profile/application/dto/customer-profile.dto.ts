export interface CustomerProfileDto {
  name: string;
  email: string;
  phone: string | null;
  createdAt: Date;
  profilePictureKey: string | null;
}