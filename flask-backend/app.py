from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/stations', methods=['GET'])
def get_stations():
    # Query parameters from frontend
    fuel_type = request.args.get('fuelType')
    zip_code = request.args.get('zipCode')
    vehicle_type = request.args.get('vehicleType')

    # Construct SPARQL query based on parameters
    sparql_query = f"""
    PREFIX dbo: <http://dbpedia.org/ontology/>
    SELECT ?label ?uri
    WHERE {{
        ?station a dbo:FuelStation ;
                 rdfs:label ?label ;
                 dbo:zipCode "{zip_code}"^^xsd:string .
        FILTER (lang(?label) = "en")
    }}
    LIMIT 10
    """

    # Send SPARQL query to DBpedia
    endpoint = "https://dbpedia.org/sparql"
    headers = {"Accept": "application/json"}
    response = requests.get(endpoint, params={"query": sparql_query, "format": "json"}, headers=headers)

    if response.status_code == 200:
        data = response.json()
        results = [
            {
                "label": result["label"]["value"],
                "uri": result["uri"]["value"],
            }
            for result in data["results"]["bindings"]
        ]
        return jsonify(results)
    else:
        return jsonify({"error": "Failed to fetch data from DBpedia"}), 500

if __name__ == "__main__":
    app.run(debug=True)
