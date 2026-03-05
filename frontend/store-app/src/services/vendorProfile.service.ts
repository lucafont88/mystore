import { api } from './api';

export interface VendorProfileData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender?: string;
  fiscalCode: string;
  businessName: string;
  vatNumber?: string;
  contactEmail: string;
  phoneNumber: string;
  address: {
    street?: string;
    city?: string;
    postalCode?: string;
    country?: string;
  };
}

export interface VendorProfile extends VendorProfileData {
  id: string;
  userId: string;
  status: 'PENDING' | 'COMPLETE';
  createdAt: string;
  updatedAt: string;
}

export const vendorProfileService = {
  getProfile: () => api.get<VendorProfile>('/user-data/vendor/profile'),

  saveProfile: (data: VendorProfileData) =>
    api.put<VendorProfile>('/user-data/vendor/profile', data),
};
