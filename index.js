// Get references to HTML elements
const cameraButton = document.getElementById('cameraButton');
const imageInput = document.getElementById('imageInput');
const previewImage = document.getElementById('previewImage');

// Add event listener to the camera button
cameraButton.addEventListener('click', () => {
    // Access the rear camera (if available)
    navigator.mediaDevices.enumerateDevices()
        .then(devices => {
            const rearCamera = devices.find(device => device.kind === 'videoinput' && device.label.includes('rear'));
            if (rearCamera) {
                navigator.mediaDevices.getUserMedia({ video: { deviceId: rearCamera.deviceId } })
                    .then((stream) => {
                        // Display the camera stream
                        previewImage.style.display = 'block';
                        previewImage.srcObject = stream;
                        
                        // Hide the camera button and show the image input
                        cameraButton.style.display = 'none';
                        imageInput.style.display = 'block';
                    })
                    .catch((error) => {
                        console.error('Error accessing rear camera:', error);
                    });
            } else {
                console.error('Rear camera not found.');
            }
        })
        .catch((error) => {
            console.error('Error enumerating devices:', error);
        });
});
