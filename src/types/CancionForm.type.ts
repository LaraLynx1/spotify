import { Cancion } from './Cancion.type';

export type CancionForm = Omit<Cancion, 'id'>;
