from flask import Flask, jsonify
from SPARQLWrapper import SPARQLWrapper, JSON

app = Flask(__name__)

@app.route('/')
def home():
    return "Welcome to Pitstop-Go Backend"

@app.route('/stations', methods=['GET'])
def get_stations():
    sparql = SPARQLWrapper("https://dbpedia.org/sparql")
    sparql.setQuery("""
        SELECT ?station ?fuelType WHERE {
            ?station rdf:type dbo:FuelStation .
            ?station dbo:fuelType ?fuelType .
        }
        LIMIT 10
    """)
    sparql.setReturnFormat(JSON)
    results = sparql.query().convert()
    return jsonify(results)
    
if __name__ == '__main__':
    app.run(debug=True)
