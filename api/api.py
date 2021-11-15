import os
from flask import Flask, send_from_directory

app = Flask(__name__)


@app.route("/")
@app.route("/typing")
def home():
    return send_from_directory('../client/public', 'index.html')


@app.route("/<path:path>")
def static_files(path):
    """
    Path for all the static files (compiled JS/CSS, etc.)
    :param path: user's url path from frontend app
    :return: requested static files
    """
    return send_from_directory('../client/public', path)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
