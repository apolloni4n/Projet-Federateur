import re
import os
import sys
import xml.etree.ElementTree as ET
import sqlite3 

network = sys.argv[1]
print(network)
# Make a regular expression
# for validating an Ip-address
regex = "^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$"     
# Define a function for
# validate an Ip address
# pass the regular expression
# and the string in search() method
if(re.search(regex, network)):  
    print (1)
else:
   print("Invalid Ip address")
   sys.exit()
    
os.system('nikto -host ' + network + ' -o /home/aihpos/Downloads/projetfed/site/niktof -Format xml   > /home/aihpos/Downloads/projetfed/site/out.txt')
os.system('nmap -oX /home/aihpos/Downloads/projetfed/site/nmapf '+network + '> /home/aihpos/Downloads/projetfed/site/out2.txt')
with open('/home/aihpos/Downloads/projetfed/site/out.txt') as f:
    if 'No web server found on' in f.read():
        print("No web server found on " +network)
        f.close()
        sys.exit()

xmlfile = "/home/aihpos/Downloads/projetfed/site/niktof"
dbfile = "/home/aihpos/Downloads/projetfed/site/mabase.db"
  
tree = ET.parse(xmlfile)
root = tree.getroot()
try:
    conn = sqlite3.connect( dbfile )
    c = conn.cursor()
    print("Successfully Connected to SQLite")
# Create the DB with required Schema
    for x in root:
      attrib=x.attrib
      start_time=attrib['starttime']
      targetip=attrib['targetip']
      c.execute("select cara_id from caracteristics where cara_name='targetip'")
      re=c.fetchone()
      idip=re[0]
      targethostname=attrib['targethostname']
      c.execute("select cara_id from caracteristics where cara_name='targethostname'")
      re=c.fetchone()
      idhost=re[0]
      targetport=attrib['targetport']
      c.execute("select cara_id from caracteristics where cara_name='targetport'")
      re=c.fetchone()
      idport=re[0]
      targetbanner=attrib['targetbanner']
      c.execute("select cara_id from caracteristics where cara_name='targetbanner'")
      re=c.fetchone()
      idban=re[0]
      errors=attrib['errors']
      c.execute("select cara_id from caracteristics where cara_name='errors'")
      re=c.fetchone()
      iderr=re[0]
      c.execute("select cara_id from caracteristics where cara_name='vuln'")
      re=c.fetchone()
      idvul=re[0]
      c.execute( "INSERT INTO targets (start_time,targetip) VALUES (?,?)",(start_time,targetip,))
      conn.commit()
      c.execute("select target_id from targets where start_time = ?", (start_time,))
      record = c.fetchone()
      id=record[0]
      c.execute("Insert into cara_target_value values (?,?,?)",(id,idip,targetip,) )
      conn.commit()
      c.execute("Insert into cara_target_value values (?,?,?)",(id,idhost,targethostname,) )
      conn.commit()
      c.execute("Insert into cara_target_value values (?,?,?)",(id,idport,targetport,) )
      conn.commit()
      c.execute("Insert into cara_target_value values (?,?,?)",(id,idban,targetbanner,) )
      conn.commit()
      c.execute("Insert into cara_target_value values (?,?,?)",(id,iderr,errors,) )
      conn.commit()
      item = x.findall('item')
      for it in item:
        desc=it.find('description').text
        c.execute("Insert into cara_target_value values (?,?,?)",(id,idvul,desc,) )
        conn.commit()
except sqlite3.Error as error:
    print("Failed to insert data into sqlite table", error)
finally:
    if conn:
        conn.close()
        print("The SQLite connection is closed")
      
scanfile="/home/aihpos/Downloads/projetfed/site/nmapf"
database="/home/aihpos/Downloads/projetfed/site/mabase.db"
tree = ET.parse(scanfile)
root = tree.getroot()
for host in root.findall("host"):
    try:
        addr = host.find("address").get("addr")
        port = host.find("ports").find("port").get("portid")
        state = host.find("ports").find("port").find("state").get("state")
        if state=="open" :
          conn = sqlite3.connect(database)
          c = conn.cursor()
          c.execute('INSERT INTO cara_target_value VALUES (?,?,?)',(id,7,port,))
          conn.commit()
          conn.close()
    except AttributeError:
        continue
os.remove('/home/aihpos/Downloads/projetfed/site/niktof')
os.remove('/home/aihpos/Downloads/projetfed/site/nmapf')
os.remove('/home/aihpos/Downloads/projetfed/site/out.txt')
