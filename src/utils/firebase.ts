import { firebaseConfig } from './firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Cancion } from '../types/Cancion.type';
import { CancionForm } from '../types/CancionForm.type';
import { Coleccion } from '../types/enums.type';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addCancion = async (cancion: CancionForm) => {
	try {
		const coleccion = collection(db, Coleccion.PLAYLIST);
		await addDoc(coleccion, cancion);
		console.log('se añadió con éxito', cancion);
	} catch (error) {
		console.error(error);
	}
};

export const updateCancion = async (cancion: Cancion) => {
	try {
		const coleccion = collection(db, Coleccion.PLAYLIST);
		const documento = doc(coleccion, cancion.id);
		await updateDoc(documento, cancion);
		console.log('se actualizó con éxito', cancion);
	} catch (error) {
		console.error(error);
	}
};

export const deleteCancion = async (id: string) => {
	try {
		const coleccion = collection(db, Coleccion.PLAYLIST);
		const documento = doc(coleccion, id);
		await deleteDoc(documento);
		console.log('se eliminó con éxito', id);
	} catch (error) {
		console.error(error);
	}
};

export const getCanciones = async (): Promise<Cancion[]> => {
	const coleccion = collection(db, Coleccion.PLAYLIST);
	const querySnapshot = await getDocs(coleccion);
	//const querySnapshot = await getDocs(collection(db, Coleccion.PLAYLIST));
	const cancionesArray: Array<Cancion> = [];

	querySnapshot.forEach((doc) => {
		const payload: CancionForm = doc.data() as CancionForm;
		cancionesArray.push({ id: doc.id, ...payload });
	});

	return cancionesArray;
};

/* export default {
	addCancion,
	getCanciones,
};
 */
