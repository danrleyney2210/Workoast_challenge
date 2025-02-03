export interface SearchParams {
  startTime: string;
  endTime: string;
  page: number;
  limit: number;
  passengerCount: number;
  classification: string[];
  make: string[];
  priceMin: number;
  priceMax: number;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  classification: string;
  max_passengers: number;
  hourly_rate_cents: number;
  thumbnail_url: string | null;
}

export interface CreateReservationParams {
  vehicleId: string;
  startTime: string;
  endTime: string;
}

export interface Quote {
  totalPriceCents: number;
}

export * from "./trpc";
