import { FederativeUnityDTO } from "./federative_unity.dto";

export interface CityDTO {
    id: string;
    name: string;
    federativeUnity?: FederativeUnityDTO;
}