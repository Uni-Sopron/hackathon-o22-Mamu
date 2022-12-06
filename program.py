helyes = 0 # tunder pontja
hibas = 0 # mumus pontja
alommano = 0
almodo = 0
max = 0
min = 0
visszamondta = 0
szavak = []
random_szavak = [] # ezeket generalja

for i in range(4):
    beirt_szo = input("Add meg a szot: ")
    keresett_szo = "alma" # keresett kep
    random_szavak.append(keresett_szo)
    #Hibas vs Helyes
    if beirt_szo == keresett_szo:
        helyes += 1
        szavak.append(beirt_szo)
    else:
        hibas += 1

    #Melyik a nagyobb/kisebb
    if helyes < hibas:
        min = helyes
        max = hibas
    else:
        min = hibas
        max = helyes

    #Alommano pont
    if helyes == hibas:
        alommano += helyes+2
    elif max-min == 1:
        alommano = max
    else:
        alommano = min

for i in range(len(szavak)):
    if random_szavak[i] in szavak:
        visszamondta += 1
    
almodo = helyes
if visszamondta == 4:
    almodo += 2

print("Tunder pontja:",helyes)
print("Mumus pontja:",hibas)
print("Alommano pontja:",alommano)
print("Almodo pontja:",almodo)