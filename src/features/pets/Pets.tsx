import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
// import fetchAllPetsAsync and selectAllPets
import { fetchAllPetsAsync, selectAllPets } from './petsSlice';

export function Pets() {
    // display all pets as readonly
    const pets = useAppSelector(selectAllPets);
    // dispatch actions
    const dispatch = useAppDispatch();
    
    // get pet status
    const status = useAppSelector(state => state.pets.status);

    // fetch pets on mount
    React.useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAllPetsAsync());
        }
    }, [status, dispatch]);

    return (
        <div>
            <h2>Pets</h2>
            <div>{ status }</div>
            <ul>
                {pets.map(pet => (
                    <li key={pet.id}>
                        {pet.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}