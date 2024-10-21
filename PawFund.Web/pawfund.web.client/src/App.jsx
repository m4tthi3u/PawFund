import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [pets, setPets] = useState();
    const [error, setError] = useState(null);

    useEffect(() => {
        populatePetData();
    }, []);

    const contents = error
        ? <p><em>{error}</em></p>
        : pets === undefined
            ? <p><em>Loading... Please refresh once the ASP.NET backend has started.</em></p>
            : <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Breed</th>
                        <th>Age</th>
                        <th>Adoption Status</th>
                    </tr>
                </thead>
                <tbody>
                    {pets.map(pet =>
                        <tr key={pet.id}>
                            <td>{pet.name}</td>
                            <td>{pet.breed}</td>
                            <td>{pet.age}</td>
                            <td>{pet.status}</td>
                        </tr>
                    )}
                </tbody>
            </table>;

    return (
        <div>
            <h1 id="tableLabel">Pet List</h1>
            <p>This component demonstrates fetching pet data from the server.</p>
            {contents}
        </div>
    );

    async function populatePetData() {
        try {
            const response = await fetch('https://localhost:7292/api/Pets/GetPets');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setPets(data);
        } catch (error) {
            setError(`Failed to fetch pet data: ${error.message}`);
        }
    }
}

export default App;