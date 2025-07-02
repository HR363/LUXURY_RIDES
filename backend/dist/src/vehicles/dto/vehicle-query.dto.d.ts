export declare class VehicleQueryDto {
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    locationId?: number;
    isAvailable?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    order?: 'asc' | 'desc';
    make?: string;
}
