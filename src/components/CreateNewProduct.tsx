import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dog } from '../types';
import { useAuth } from '../context/GlobalAuthContext';
import '../styles/createNewProduct.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

interface DogFormProps {
    mode: 'create' | 'edit';
}

const DogForm = ({ mode }: DogFormProps) => {
    const { isLoggedIn } = useAuth(); // Get the logged-in status
    const loggedInUser = localStorage.getItem('loggedInUser'); // Fetch the username from localStorage
    const location = useLocation();
    const navigate = useNavigate();
    const [imgPreview, setImgPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const initialFormData = mode === 'edit' && location.state?.dog
        ? location.state.dog as Dog // Edit mode, use the passed dog data
        : {
            name: '',
            breed: '',
            sex: 'Male',
            img: '',
            age: 0,
            chipNumber: '',
            owner: {
                name: '',
                lastName: '',
                phoneNumber: '',
            },
            addedBy: loggedInUser || '', // Include the username of the logged-in user
        };

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        if (mode === 'edit' && location.state?.dog) {
            setFormData(location.state.dog as Dog); // Initialize formData with the dog data in edit mode
            setImgPreview(location.state.dog.img); // Initialize imgPreview with the existing image URL
        }
    }, [mode, location.state?.dog]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (mode === 'create') {
            // Create new dog logic
            if (!isLoggedIn || !loggedInUser) {
                console.error('No user is logged in!');
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/dogs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    const newDog = await response.json();
                    console.log('Dog added:', newDog);

                    // Navigate to MyDogsPage
                    navigate('/mydogs', { replace: true });
                } else {
                    console.error('Error adding dog');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else if (mode === 'edit') {
            // Edit existing dog logic
            try {
                const response = await fetch(`http://localhost:5000/dogs/${formData.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    const updatedDog = await response.json();
                    console.log('Dog updated:', updatedDog);

                    // Navigate to MyDogsPage
                    navigate('/mydogs', { replace: true });
                } else {
                    console.error('Error updating dog');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, img: reader.result as string });
                setImgPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name.startsWith('owner.')) {
            const ownerKey = name.split('.')[1];
            setFormData(prevState => ({
                ...prevState,
                owner: {
                    ...prevState.owner,
                    [ownerKey]: value
                }
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Trigger file input when the icon is clicked
    const handleIconClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation()
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <form onSubmit={handleSubmit} className={mode === 'create' ? 'add-dog-form' : 'edit-dog-form'}>
            <section className="dog-info">
                <div className="image-wrapper">
                    <input
                        type="file"
                        name="img"
                        className='file-input'
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        required
                    />
                    {/* Image preview or upload icon */}
                    <div className="image-preview" onClick={handleIconClick}>
                        {imgPreview ? (
                            <div className="image-container">
                                <img src={imgPreview} alt="Dog Preview" className="dog-image" />
                                <div className="icon-overlay" title='Choose File'>
                                    <FontAwesomeIcon icon={faCamera} size="2x" className="change-icon" />
                                </div>
                            </div>
                        ) : (
                            <div
                                className="icon-placeholder"
                                onClick={handleIconClick} 
                                style={{ cursor: 'pointer' }}
                                title='Choose File'
                            >
                                <FontAwesomeIcon icon={faCamera} size="3x" className="upload-icon" />
                            </div>
                        )}
                    </div>
                </div>
                <section className="info-sections">
                    <section className="dog-info-section">
                        <h3>Dog Information</h3>
                        <div className="info-item">
                            <p className="label"><strong>Name:</strong></p>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="info-item">
                            <p className="label"><strong>Breed:</strong></p>
                            <input type="text" name="breed" value={formData.breed} onChange={handleChange} required/>
                        </div>
                        <div className="info-item">
                            <p className="label"><strong>Gender:</strong></p>
                            <select name="sex" value={formData.sex} onChange={handleChange}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="info-item">
                            <p className="label"><strong>Age:</strong></p>
                            <input type="number" name="age" value={formData.age} onChange={handleChange} required />
                        </div>
                        <div className="info-item">
                            <p className="label"><strong>Chip Number:</strong></p>
                            <input type="text" name="chipNumber" value={formData.chipNumber} onChange={handleChange} required/>
                        </div>
                    </section>
                    <section className="owner-info-section">
                        <h3>Owner Information</h3>
                        <div className="info-item">
                            <p className="label"><strong>Name:</strong></p>
                            <input type="text" name="owner.name" value={formData.owner.name} onChange={handleChange} required />
                        </div>
                        <div className="info-item">
                            <p className="label"><strong>Last Name:</strong></p>
                            <input type="text" name="owner.lastName" value={formData.owner.lastName} onChange={handleChange} required/>
                        </div>
                        <div className="info-item">
                            <p className="label"><strong>Phone Number:</strong></p>
                            <input type="text" name="owner.phoneNumber" value={formData.owner.phoneNumber} onChange={handleChange} required />
                        </div>
                    </section>
                </section>
            </section>
            <button type="submit">{mode === 'create' ? 'Create' : 'Save'}</button>
        </form>
    );
};

export default DogForm;
