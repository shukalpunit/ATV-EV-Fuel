# SER-531-Team-3

#Alternative Fuel Stations 


Our team has developed a Integrating Alternative Fuel Station Data into a Knowledge Graph for
Sustainable Transportation Insights .


## Prerequisites  

Ensure the following software and tools are installed:  
1. Python 3.8+  
2. Node.js 16+ (for the React.js frontend)  
3. npm (Node Package Manager)  
4. Flask (Python framework)  
5. GraphDB (for the backend data)  
6. Azure 

##High-Level Ontology 

PREFIX alt: <http://www.semanticweb.org/dell/ontologies/2024/10/alternativeFuelStations>
PREFIX : <http://www.semanticweb.org/dell/ontologies/2024/10/alternativeFuelStations/>
PREFIX schema: <http://schema.org/>

INSERT DATA {
  alt:Station a schema:GasStation .
}



#Step-by-Step instructions on how to set up our system
1. Clone the Repository:
  Download this repository and unzip the files.

2. Setup Backend:(Flask)
  -Navigate to the backend directory
  -Create and activate a virtual environment(vm) 
   python -m venv venv
   source venv/bin/activate  # For Mac/Linux
   venv\Scripts\activate     # For Windows

  -Install dependencies:
   bash
   
   pip install -r requirements.txt 

  -Configure environment variables:
    Create a .env file in the backend directory with:
    GRAPHDB_ENDPOINT=<your_graphdb_endpoint>
    FLASK_ENV=development

  -Start the Flask server:
   python app.py

  -Confirm the backend is running by visiting:
   arduino
   http://localhost:5000


3. Frontend Setup (React.js)

  - Navigate to the frontend directory
    cd ../frontend

  - Install dependencies:
    npm install

  - Start the React development server
    npm start

  - Confirm the frontend is running by visiting:
    http://localhost:3000


4. Run the Full System
   - Frontend: Runs on http://localhost:3000
   - Backend: Runs on http://localhost:5000


##Changes Made After Deliverable 2
Backend
New API Endpoint:
Added /stations endpoint to fetch fuel station data dynamically based on user input.


Improved SPARQL Queries:
Enhanced query logic for faster data retrieval.


Frontend
Dynamic Forms:
Updated the UI to allow users to search stations by location and fuel type.


Error Handling:
Added error messages for cases like no results found or API issues.
Deployment
Migrated the backend to Azure for better scalability and performance.

##Testing the System
Access the frontend at http://localhost:3000.
Perform a search for fuel stations using the provided form.

## Supported Systems
- Windows
- macOs

## Team Members
- Harshil  Dave
- Poojan  Dave
- Siddesh Shetty
- Punit Shukal

## Acknowledgment
- Dr. Srividya Bansal

## Youtube Video Link
