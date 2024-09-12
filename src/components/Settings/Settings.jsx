import { useEffect, useState } from 'react';

import './Settings.css';

function Settings() {
    const [materials, setMaterials] = useState([]);
    const [sizes, setSizes] = useState([]);

    const [newMaterial, setNewMaterial] = useState('');
    const [selectedMaterial, setSelectedMaterial] = useState('');
    const [newSize, setNewSize] = useState('');

    // useEffect(() => {
    //     fetch('/api/materials')
    //     .then((response) => {
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         return response.json();
    //     })
    //     .then((data) => {
    //         setMaterials(data);
    //     })
    //     .catch((error) => {
    //         console.error('Error fetching materials:', error);
    //     });
    // }, []);
    
    useEffect(() => {
        fetch('/api/materials')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setMaterials(data);
        });
    }, []);

    function showSizes(event) {
        setSizes(materials[event.target.textContent]
            .map((sizes) => {
                return <li key={sizes}>{sizes}</li>
            }));
    }

    function handleAddMaterial() {
        if (newMaterial) {
            const updatedMaterials = {
                ...materials,
                [newMaterial]: [],
            };
            setMaterials(updatedMaterials);
            setNewMaterial('');

            fetch('/api/materials', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedMaterials),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    }

    const materialList = Object.keys(materials)
        .map((materials) => {
            return <li key={materials} onClick={showSizes}>{materials}</li>
        })

    return (
        <div className="settings">
            <div>
                <input 
                    type="text" 
                    className="new-material" 
                    placeholder={`Add size for ${selectedMaterial || 'material'}`} 
                    value={newSize} 
                    onChange={(e) => setNewSize(e.target.value)} 
                    disabled={!selectedMaterial}
                />
                <button onClick={handleAddMaterial}>Add Material</button>
                <ul className='materials'>{materialList}</ul>
            </div>
            <div>
                <input type="text" className="new-size" />
                <ul className='sizes'>{sizes}</ul>
            </div>
        </div>
    );
}

export default Settings;