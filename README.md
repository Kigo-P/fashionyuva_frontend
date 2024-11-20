# Fashionyuva

Fashionyuva is a modern, responsive fashion e-commerce web application built with React and Vite. This app allows users to browse through a wide selection of fashion items, create an account, and make purchases. Fashionyuva offers an intuitive, user-friendly interface for a seamless shopping experience.

## Features
- **Browse Fashion Collections:** Explore a variety of clothing, shoes, accessories, and more.
- **User Authentication:** Sign up, log in, and manage your account.
- **Shopping Cart:** Add items to your cart and proceed to checkout.
- **Responsive Design:** Optimized for mobile and desktop devices.
- **Fast Loading:** Built with Vite for fast performance and quick reload times.

## Tech Stack
- **React:** A JavaScript library for building user interfaces.
- **Vite:** A fast and modern build tool for web projects, offering fast development and optimized production builds.
- **React Router:** For client-side routing.
- **Tailwind CSS:** For styling the app with utility-first CSS.
- **Axios:** For making API requests.

## Installation

To get started with Fashionyuva locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Kigo-P/fashionyuva_frontend
Navigate to the project directory:

  * cd fashionyuva

2. **Install dependencies: Make sure you have Node.js and npm (or yarn) installed. Then, run:**

  * npm install

3. **Start the development server: Once the dependencies are installed, start the development server:**
# Docker Instructions

If you'd like to run the Fashionyuva app in a Docker container, follow these steps:

* Prerequisites

Make sure you have Docker installed on your system. You can download and install Docker from here.
Building the Docker Image

    Build the Docker image: In the root directory of the project (where your Dockerfile is located), build the Docker image using the following command:

    * sudo docker build -t fashionyuva-frontend .

    This will create a Docker image named fashionyuva-frontend.

Running the Docker Container

    Run the Docker container: To run the container and map port 8080 from the container to port 8080 on your local machine, use the following command:

    sudo docker run -p 8080:80 fashionyuva-frontend

    This will start the container and make the app accessible at http://localhost:8080.

Stopping the Docker Container

    Stop the running container: To stop the running container, you can either use Ctrl + C in the terminal, or run the following command to stop the container by its container ID or name:

sudo docker stop <**container_id_or_name**>

To get the container ID or name, you can list running containers with:

    sudo docker ps

Usage
Browse Items

You can browse various fashion items by navigating through different categories. Each item displays key details such as price, size, and description.
Authentication

Users can sign up, log in, and manage their profiles. This is powered by a JWT authentication system.
Shopping Cart

Add items to your cart by clicking the "Add to Cart" button, and review the cart contents before proceeding to checkout, which is integrated with the Daraja API for payment options.
Contributing

We welcome contributions to Fashionyuva! If you'd like to contribute, please follow these steps:

    Fork the repository.
    Create a new branch for your feature or fix.
    Make your changes and commit them.
    Open a pull request with a description of your changes.

Please make sure to follow the existing coding conventions and test your changes before submitting a pull request.
License

This project is licensed under the MIT License - see the LICENSE file for details.
Summary of Docker Commands:

    Build the Docker image:

sudo docker build -t fashionyuva-frontend .

Run the Docker container (map port 8080):

sudo docker run -p 8080:80 fashionyuva-frontend

Stop the Docker container:

sudo docker stop <**container_id_or_name**>