# coding: utf8
import random
userList = ["达达", "xiaoqing1555","潞瑶", "皓皓妈咪", "蔺小妞", "Domi"]
userList = ["\"" + name + "\"" for name in userList]

def main():
	inf = open("data.csv", "r")
	outf = open("data.txt","w")
	outf.write("{ \"username\": [" + ",".join(userList) + "], \"data\": [" )
	baseTime = 0
	dataItem = []
	for line in inf.readlines():
		l = line.replace("\n", "").split("\t")
		if len(l) == 1:
			l.append("")
		baseTime += random.randint(1, 1800)	

		dataItem.append("{"+"\"picnum\": "+str(l[0]) + ","
			"\"comment\": \""+str(l[1]) + "\","
			"\"time\": \""+timeGenerater(baseTime) + "\","
			"\"time\": \""+timeGenerater(baseTime) + "\","
			"\"usernum\":"+str(random.randint(0, 5)) + ","
			"\"likenum\":"+ str(random.randint(0, 20)) + ","
			"\"cmtnum\":"+str(random.randint(0, 10)) + ","
			"\"collectnum\":"+str(random.randint(0, 5)) + "}")
	outf.write(",".join(dataItem))
	outf.write("]}")	
	inf.close()
	outf.close()


def timeGenerater(t): 
	if t > 86400:
		return str(t/86400)+"天前"
	if t > 3600:
		return str(t/3600)+"小时前"
	if t > 60:
		return str(t/60)+"分钟前"
	return str(t)+"秒前"

main()
