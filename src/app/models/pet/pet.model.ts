import { PetKind } from "../../enum/petKind/pet-kind.enum";

export interface Pet {
    id: number;           
    name: string;         
    kind: PetKind;         
    weight: number;       
    height: number;       
    length: number;       
    photo_url: string;    
    description: string;  
    number_of_lives?: number; 
    healthStatus?:  'unhealthy' | 'healthy' | 'very healthy' | 'unknown';
    additionalInfo?: Record<string, any>; 
}