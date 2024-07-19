
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  level?: number
  balance?: number;
  tank?: string;
  energyMax?: number;
  dropsAmount?: number;
}
