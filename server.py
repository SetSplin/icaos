from flask import Flask, send_from_directory, request, jsonify
import json
import os

import subprocess


app = Flask(__name__)

@app.route('/')
def hello():
    return send_from_directory('static', 'index.html')

@app.route('/run', methods=['POST'])
def run():
    print(request.json)
    os.system('rm -rf tmp')
    os.system('mkdir tmp')

    with open('tmp/c.c', 'w+') as file:
        file.write(request.json['c'])

    with open('tmp/asm.S', 'w+') as file:
        file.write(request.json['asm'])

    gccOut = subprocess.Popen(
        "gcc -m32 -O2 -Wall -Werror tmp/c.c tmp/asm.S -o tmp/run && ./tmp/run",
        shell=True,
        stderr=subprocess.STDOUT,
        stdout=subprocess.PIPE
    )

    return b''.join(gccOut.stdout).decode('utf-8')
