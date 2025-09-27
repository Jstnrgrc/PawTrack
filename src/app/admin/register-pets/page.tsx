'use client'; // ✅ Next.js 13+ app directory: this tells Next.js this component will run on the client side

import { useState, useEffect } from 'react'; // ✅ React hooks: useState for state, useEffect for side effects

// ✅ Mock owner data (you can replace this with API data later)
const ownersData = [
  { id: 1, first_name: 'John', last_name: 'Doe', email: 'john@example.com', photo: '/placeholder-owner.png' },
  { id: 2, first_name: 'Jane', last_name: 'Smith', email: 'jane@example.com', photo: '/placeholder-owner.png' },
];

export default function RegisterPetPage() {
  // ✅ State to hold all owners
  const [owners, setOwners] = useState(ownersData);

  // ✅ State to hold which owner is currently selected
  const [selectedOwner, setSelectedOwner] = useState<any>(null);

  // ✅ State to hold the form data for the pet being registered
  const [petForm, setPetForm] = useState({ name: '', species: '', breed: '', age: '' });

  // ✅ Function to handle selecting an owner
  // When the user clicks "Select Owner" button, we store the owner object in state
  const handleSelectOwner = (owner: any) => {
    setSelectedOwner(owner); // This triggers the component to re-render and show the pet registration form
  };

  // ✅ Function to handle typing in the pet form inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    // Update the petForm object dynamically based on input name
    setPetForm({ ...petForm, [e.target.name]: e.target.value });
  };

  // ✅ Function to handle form submission
  const handleSubmit = () => {
    // Here we just log the form data and owner ID (in real app, you'd send to backend API)
    console.log('Register Pet:', { ...petForm, ownerId: selectedOwner.id });

    // Show an alert with owner and pet info
    alert(`Pet ${petForm.name} registered for ${selectedOwner.first_name} ${selectedOwner.last_name}`);

    // ✅ Reset the form and go back to owner selection
    setPetForm({ name: '', species: '', breed: '', age: '' });
    setSelectedOwner(null);
  };

  return (
    <div className="p-6">
      {/* ✅ If no owner is selected, show the owner selection grid */}
      {!selectedOwner ? (
        <>
          <h2 className="text-2xl font-semibold mb-4">Select Owner</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {owners.map((owner) => (
              <div
                key={owner.id}
                className="bg-white p-4 rounded shadow flex flex-col items-center"
              >
                {/* ✅ Owner photo placeholder */}
                <img
                  src={owner.photo}
                  alt="Owner"
                  className="w-24 h-24 rounded-full mb-2 object-cover"
                />
                {/* ✅ Owner name */}
                <p className="font-medium">{owner.first_name} {owner.last_name}</p>
                {/* ✅ Owner email */}
                <p className="text-gray-500 text-sm">{owner.email}</p>
                {/* ✅ Button to select this owner */}
                <button
                  className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
                  onClick={() => handleSelectOwner(owner)}
                >
                  Select Owner
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        // ✅ If an owner is selected, show the pet registration form
        <>
          <h2 className="text-2xl font-semibold mb-4">
            Register Pet for {selectedOwner.first_name} {selectedOwner.last_name}
          </h2>
          <div className="max-w-md bg-white p-6 rounded shadow space-y-4">
            {/* ✅ Pet Name Input */}
            <div>
              <label className="block mb-1 font-medium">Pet Name</label>
              <input
                type="text"
                name="name"
                value={petForm.name}
                onChange={handleChange} // updates state dynamically
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            {/* ✅ Species Input */}
            <div>
              <label className="block mb-1 font-medium">Species</label>
              <input
                type="text"
                name="species"
                value={petForm.species}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            {/* ✅ Breed Input */}
            <div>
              <label className="block mb-1 font-medium">Breed</label>
              <input
                type="text"
                name="breed"
                value={petForm.breed}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            {/* ✅ Age Input */}
            <div>
              <label className="block mb-1 font-medium">Age</label>
              <input
                type="number"
                name="age"
                value={petForm.age}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            {/* ✅ Buttons: Back to owner selection or submit */}
            <div className="flex justify-between">
              <button
                onClick={() => setSelectedOwner(null)} // go back to owner selection
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
              >
                Back
              </button>
              <button
                onClick={handleSubmit} // submit the pet form
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Register Pet
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
