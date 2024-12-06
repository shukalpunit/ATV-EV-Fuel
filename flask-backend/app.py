from flask import Flask, jsonify, request
from SPARQLWrapper import SPARQLWrapper, JSON

app = Flask(__name__)

@app.route("/")
def home():
    return "Welcome to Pitstop-Go API!"

@app.route("/stations", methods=["GET"])
def get_stations():
    sparql = SPARQLWrapper("http://dbpedia.org/sparql")  # Use DBpedia endpoint
    query = """
    SELECT DISTINCT ?station ?label
    WHERE {
        ?station a <http://dbpedia.org/ontology/ServiceStation> ;
                 rdfs:label ?label .
        FILTER (lang(?label) = 'en')
    }
    LIMIT 10
    """
    sparql.setQuery(query)
    sparql.setReturnFormat(JSON)

    try:
        results = sparql.query().convert()
        stations = []
        for result in results["results"]["bindings"]:
            station = {
                "uri": result["station"]["value"],
                "label": result["label"]["value"]
            }
            stations.append(station)
        return jsonify(stations)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
