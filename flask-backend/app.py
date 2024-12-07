from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

GRAPHDB_ENDPOINT = "http://104.40.75.98:7200/repositories/PitStopGo"

# Common fields across all fuel types
shared_fields = [
    "hasAccessCode",
    "hasZip",
    "locatedInCity",
    "locatedInState",
    "locatedInCountry",
    "hasPhone",
    "hasName",
    "hasStatusCode",
    "hasStreetAddress",
    "hasOwnerType",
    "hasAccessDayTime",
    "hasIntersectionDirections",
    "hasLatitude",
    "hasLongitude",
]

# Fuel type-specific optional fields
fuel_type_fields = {
    "Biodiesel": ["hasBDBlends"],
    "Electric": [
        "hasWorkPlaceCharging",
        "hasConnectorTypes",
        "hasEVPricing",
        "hasNetworkWeb",
        "numberOfDCChargers",
        "numberOfLevel1Chargers",
        "numberOfLevel2Chargers",
        "hasEVNetwork",
    ],
    "CNG": [
        "hasNumberOfDispensers",
        "hasPSI",
        "hasRNG",
        "hasTotalCompression",
        "hasVehicleClass",
        "hasFillTypeCode",
    ],
    "E85": [
        "hasBlenderPump",
        "hasOtherEthanolBlends",
    ],
    "LPG": [
        "hasNozzleTypes",
    ],
    "LNG": [
        "hasRNG",
        "hasVehicleClass",
    ],
    "RenewableDiesel": [
        "maxBiodieselLevel",
        "hasRDBlends",
    ],
    "Hydrogen": [
        "isRetail",
        "hasPressures",
        "hasStandards",
        "hasStatusLink",
    ],
}


@app.route('/stations', methods=["POST", "OPTIONS"])
def handle_stations():
    if request.method == "OPTIONS":
        return jsonify({}), 200

    # Parse request data
    data = request.get_json()
    fuel_type = data.get("fuelType")
    zip_code = data.get("zipCode")

    # Log input values
    print(f"Received request with fuelType: {fuel_type}, zipCode: {zip_code}")

    if not fuel_type or not zip_code:
        return jsonify({"error": "Fuel type and zip code are required"}), 400

    # Dynamically build query fields
    fields_to_query = shared_fields + fuel_type_fields.get(fuel_type, [])
    query_fields = " ".join([f"?{field}" for field in fields_to_query])

    # Dynamically map query structure with OPTIONAL fields
    sparql_query = f"""
    PREFIX alt: <http://www.semanticweb.org/dell/ontologies/2024/10/alternativeFuelStations>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

    SELECT {query_fields}
    WHERE {{
        ?station rdf:type alt:{fuel_type} ;
                 alt:hasZip "{zip_code}" .
        
        OPTIONAL {{ ?station alt:hasAccessCode ?hasAccessCode }}
        OPTIONAL {{ ?station alt:locatedInCity ?locatedInCity }}
        OPTIONAL {{ ?station alt:locatedInState ?locatedInState }}
        OPTIONAL {{ ?station alt:locatedInCountry ?locatedInCountry }}
        OPTIONAL {{ ?station alt:hasPhone ?hasPhone }}
        OPTIONAL {{ ?station alt:hasName ?hasName }}
        OPTIONAL {{ ?station alt:hasStatusCode ?hasStatusCode }}
        OPTIONAL {{ ?station alt:hasStreetAddress ?hasStreetAddress }}
        OPTIONAL {{ ?station alt:hasOwnerType ?hasOwnerType }}
        OPTIONAL {{ ?station alt:hasAccessDayTime ?hasAccessDayTime }}
        OPTIONAL {{ ?station alt:hasIntersectionDirections ?hasIntersectionDirections }}
        OPTIONAL {{ ?station alt:hasLatitude ?hasLatitude }}
        OPTIONAL {{ ?station alt:hasLongitude ?hasLongitude }}
    """

    # Add fuel type-specific optional fields
    if fuel_type == "Biodiesel":
        sparql_query += """
        OPTIONAL { ?station alt:hasBDBlends ?hasBDBlends }
        """
    elif fuel_type == "Electric":
        sparql_query += """
        OPTIONAL { ?station alt:hasWorkPlaceCharging ?hasWorkPlaceCharging }
        OPTIONAL { ?station alt:hasConnectorTypes ?hasConnectorTypes }
        OPTIONAL { ?station alt:hasEVPricing ?hasEVPricing }
        OPTIONAL { ?station alt:hasNetworkWeb ?hasNetworkWeb }
        OPTIONAL { ?station alt:numberOfDCChargers ?numberOfDCChargers }
        OPTIONAL { ?station alt:numberOfLevel1Chargers ?numberOfLevel1Chargers }
        OPTIONAL { ?station alt:numberOfLevel2Chargers ?numberOfLevel2Chargers }
        OPTIONAL { ?station alt:hasEVNetwork ?hasEVNetwork }
        """
    elif fuel_type == "CNG":
        sparql_query += """
        OPTIONAL { ?station alt:hasNumberOfDispensers ?hasNumberOfDispensers }
        OPTIONAL { ?station alt:hasPSI ?hasPSI }
        OPTIONAL { ?station alt:hasRNG ?hasRNG }
        OPTIONAL { ?station alt:hasTotalCompression ?hasTotalCompression }
        OPTIONAL { ?station alt:hasVehicleClass ?hasVehicleClass }
        OPTIONAL { ?station alt:hasFillTypeCode ?hasFillTypeCode }
        """
    elif fuel_type == "Hydrogen":
        sparql_query += """
        OPTIONAL { ?station alt:isRetail ?isRetail }
        OPTIONAL { ?station alt:hasPressures ?hasPressures }
        OPTIONAL { ?station alt:hasStandards ?hasStandards }
        OPTIONAL { ?station alt:hasStatusLink ?hasStatusLink }
        """
    sparql_query += "} LIMIT 100"

    # Log the query for debugging
    print("Generated SPARQL Query:")
    print(sparql_query)

    try:
        response = requests.post(
            GRAPHDB_ENDPOINT,
            data={"query": sparql_query},
            headers={"Accept": "application/sparql-results+json"},
        )

        # Log GraphDB response
        print("Response status code:", response.status_code)
        print("Response body:", response.json())

        if response.status_code == 200:
            if response.json().get('results', {}).get('bindings'):
                return jsonify(response.json()), 200
            else:
                print("No results found.")
                return jsonify({"error": "No results found"}), 404
        else:
            return jsonify({"error": "GraphDB query failed"}), 500

    except Exception as e:
        print("Error during request to GraphDB:", e)
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)
