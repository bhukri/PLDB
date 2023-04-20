from flask import Flask, jsonify, render_template
from sqlalchemy import create_engine, inspect

from config import db_user, db_password, db_host, db_port, db_name
from etl import extract, transform, load

app = Flask(__name__)
engine = create_engine(f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}")


@app.route("/")
def index():
    return render_template("index.html"
    )

@app.route("/api/programming_language.json")
def programming_language():
    results = engine.execute("SELECT * FROM programming_language")
    return jsonify([dict(_) for _ in results])


if __name__ == '__main__':
    force = False
    if not force and "programming_language" in inspect(engine).get_table_names():
        print("'programming_language' table found, skipping ETL ⏩")
    else:
        extract()
        df = transform()
        load(df, "programming_language")
    print("Starting web server 🌎")
    app.run(debug=True)