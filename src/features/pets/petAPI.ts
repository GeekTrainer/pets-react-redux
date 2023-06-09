// import pets interface
import { Pet } from './petsSlice';

// A mock function to mimic making an async request for data
export function fetchAllPets() {
    const pets: Pet[] = [
        { id: 1, name: 'Bella' },
        { id: 2, name: 'Luna' },
        { id: 3, name: 'Lucy' },
    ];
    return new Promise<Pet[]>((resolve) =>
      setTimeout(() => resolve(pets), 5000)
    );
  }
  