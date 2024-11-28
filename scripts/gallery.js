const searchInput = document.getElementById('searchInput');
const imageGallery = document.getElementById('imageGallery');
const apiKey = '47026731-e3c536074d0980f165db9ee4e';  // Your Pixabay API key

const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.getElementById('closeModal');

// Function to fetch images from Pixabay API based on user input
async function fetchImages(query) {
    if (query.trim() === "") {
        imageGallery.innerHTML = '';  // Clear the gallery if no input
        return;
    }

    // Clear the gallery before displaying new images
    imageGallery.innerHTML = '';

    const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Check if there are any results
        if (data.hits.length === 0) {
            imageGallery.innerHTML = '<p>No images found.</p>';
            return;
        }

        // Display images
        data.hits.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = image.webformatURL;  // The URL for the image
            imgElement.alt = image.tags || "Image";  // Image alt text (tags)
            imgElement.addEventListener('click', () => {
                openModal(image.largeImageURL);  // Open modal with the larger image
            });
            imageGallery.appendChild(imgElement);
        });
    } catch (error) {
        console.error('Error fetching images:', error);
        imageGallery.innerHTML = '<p>Failed to load images. Please try again later.</p>';
    }
}

// Event listener for the "Enter" key press to trigger the search
searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const query = searchInput.value;
        fetchImages(query);
    }
});

// Function to open the modal and display the clicked image
function openModal(imageSrc) {
    modal.style.display = 'flex';  // Show the modal
    modalImage.src = imageSrc;  // Set the source of the modal image
}

// Event listener to close the modal when the close button is clicked
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';  // Close the modal
});

// Close the modal when the user clicks anywhere outside of the image
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';  // Close the modal if clicked outside of it
    }
});

// Function to handle image clicks
function handleImageClick(imageId) {
    let searchQuery = "";
    if (imageId === 'driver') {
        searchQuery = "formula one drivers";  // Search for drivers
    } else if (imageId === 'car') {
        searchQuery = "formula one cars";  // Search for cars
    }
    else if (imageId === 'celebration') {
        searchQuery = "f1 celebration";  // Search for cars
    }
    else if (imageId === 'venue') {
        searchQuery = "f1 race";  // Search for cars
    }

    // Set the search input value and trigger the search
    searchInput.value = searchQuery;
    fetchImages(searchQuery);
}

// Add click event listeners to the images
document.getElementById('driver').addEventListener('click', () => handleImageClick('driver'));
document.getElementById('car').addEventListener('click', () => handleImageClick('car'));
document.getElementById('celebration').addEventListener('click', () => handleImageClick('celebration'));
document.getElementById('venue').addEventListener('click', () => handleImageClick('venue'));
