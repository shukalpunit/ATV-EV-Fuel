🚗 Alternative Fuel Stations Finder 🔋
Our team has developed a system to integrate Alternative Fuel Station Data into a Knowledge Graph to provide sustainable transportation insights and a user-friendly interface for searching nearby stations.
________________________________________
📊 Overview
The project combines React.js for the frontend, Flask for the backend, and GraphDB for handling SPARQL queries related to fuel station information. This allows users to search for fuel stations by fuel type and zip code, with responses dynamically visualized in a intuitive UI.
________________________________________
⚙️ System Architecture
•	Frontend: React.js
•	Backend: Flask with SPARQL integration
•	Knowledge Graph: Hosted via GraphDB
•	Deployment: Azure for enhanced scalability
________________________________________
🛠️ Prerequisites
Ensure the following software is installed:
•	Python 3.8+
•	Node.js 16+ (for React.js frontend)
•	npm (Node Package Manager)
•	Flask (pip install flask) for backend services
•	GraphDB (Graph Database backend for SPARQL query support)
•	Azure Subscription (Optional for deployment)
________________________________________
🛠️ Backend Configuration
1. Clone the Repository
2. Setup Flask Backend
Navigate to the backend/ directory:
cd backend/

Create a Virtual Environment
python -m venv venv

Activate the virtual environment:
•	Mac/Linux: 
source venv/bin/activate
•	Windows: 
venv\Scripts\activate

Install Dependencies
pip install -r requirements.txt

Configure Environment Variables
Create a .env file in the backend/ directory with the following content:
GRAPHDB_ENDPOINT=http://104.40.75.98:7200/repositories/PitStopGo
FLASK_ENV=development

Start the Backend Server
python app.py

The backend server will now be running on:
http://localhost:5000
________________________________________
🚀 Frontend Setup Instructions
Navigate to the frontend/ directory

Install React Dependencies
npm install

Start the Frontend Development Server
npm start

The frontend UI will now run at:
http://localhost:3000
________________________________________
📊 Running the Full System
1.	Start the backend server.
2.	http://localhost:5000
3.	Start the frontend development.
4.	http://localhost:3000
The system should now allow users to query fuel stations by selecting fuel type and entering a zip code.
________________________________________
🖥️ Key Features
1.	Dynamic Search: Search for fuel stations based on user-defined fuel types and location.
2.	Aesthetic UI: Modern user-friendly interface with cards displaying the station information dynamically.
3.	Error Handling: Displays clear error messages if a search fails or no data is found.
4.	SPARQL Integration: Fetch real-time data from GraphDB with faster response times.
5.	Deployment Ready: Backend and frontend are optimized for Azure deployment.
________________________________________
✏️ Changes Made After Deliverable 2
1.	New API Endpoint: Added /stations endpoint to fetch fuel station data dynamically based on user input.
2.	Enhanced SPARQL Queries: Optimized queries for better response speeds and data retrieval.
3.	React Forms: Updated UI workflows for intuitive fuel type and location input.
4.	Improved Error Handling: Clear messaging for cases like no results found or server failures.
5.	Deployment: Backend migrated to Azure for better performance and scalability.
________________________________________
🖥️ Supported Systems
This application works seamlessly on:
•	Windows
•	macOS
________________________________________
👥 Team Members
•	Harshil Dave
•	Poojan Dave
•	Siddesh Shetty
•	Punit Shukal
________________________________________
🏆 Acknowledgments
Special thanks to Dr. Srividya Bansal.
YouTube Video for walkthrough: https://youtu.be/h5NaBv66T7A
________________________________________
🤝 Contributing
We welcome contributions! If you have improvements, bug fixes, or feature requests:
1.	Fork the repository.
2.	Create a branch.
3.	Make your changes and push them.
4.	Submit a pull request.
________________________________________
