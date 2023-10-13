from apps.home import blueprint
from apps import db
from apps.authentication.forms import CreateNodeDataForm
from apps.authentication.models import Node
from flask import render_template, request
from flask_login import login_required
from paho.mqtt import client as mqtt_client
from jinja2 import TemplateNotFound
import random
import time
import json
import threading
import logging
import sqlite3
broker = 'localhost'
port = 1883
topic = "values3"
# generate client ID with pub prefix randomly
client_id = f'python-mqtt-{random.randint(0, 1000)}'
username = 'emqx'
password = '**********'
def connect_mqtt():
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)
   
    client = mqtt_client.Client(client_id)
    # client.tls_set(ca_certs='./server-ca.crt')
    client.username_pw_set(username, password)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client
def subscribe(client: mqtt_client):
    def on_message(client, userdata, msg):
        print(f"Received `{msg.payload.decode()}` from `{msg.topic}` topic")
        x=msg.payload.decode()
        '''float(y["nodeId"]),float(y["rssi"]),float(y["snr"]),float(y["data"])'''
        y=json.loads(x)
        a=[float(y["nodeId"]),float(y["rssi"]),float(y["snr"]),float(y["data"])]
        con = sqlite3.connect("./apps/db.sqlite3")
        cur = con.cursor()
        cur.execute(f"INSERT INTO node(nodeId,rssi,snr,data) VALUES ({a[0]},{a[1]},{a[2]},{a[3]})")
        con.commit()
        con.close()
    client.subscribe(topic)
    client.on_message = on_message
def thread_function(name):
    client = connect_mqtt()
    subscribe(client)
    client.loop_forever()
@blueprint.route('/index')
@login_required
def index():
    format = "%(asctime)s: %(message)s"
    logging.basicConfig(format=format, level=logging.INFO,

                        datefmt="%H:%M:%S")
    logging.info("Main    : before creating thread")
    x = threading.Thread(target=thread_function, args=(1,))
    logging.info("Main    : before running thread")
    x.start()
    logging.info("Main    : wait for the thread to finish")
    '''dictNode={}
    dictNode['nodeId']=2
    dictNode['rssi']=3
    dictNode['snr']=14
    dictNode['data']=3.14
    print(dictNode)
    node = Node(**dictNode)
    db.session.add(node)
    db.session.commit()'''
    '''b=Node.query.order_by(Node.id).all()
    rssiValues=[]
    for i in range(len(b)):
        rssiValues.append(b[i].rssi)
    print(rssiValues)'''
    return render_template('home/index.html', segment='index')
@blueprint.route('/<template>')
@login_required
def route_template(template):
    try:

        if not template.endswith('.html'):
            template += '.html'
        segment = get_segment(request)
        return render_template("home/" + template, segment=segment)

    except TemplateNotFound:
        return render_template('home/page-404.html'), 404

    except:
        return render_template('home/page-500.html'), 500
def get_segment(request):
    try:
        segment = request.path.split('/')[-1]

        if segment == '':
            segment = 'index'

        return segment

    except:
        return None
