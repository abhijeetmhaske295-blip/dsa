n = int(input("Number of parcels: "))
parcels = []
for i in range(n):
    weight, profit = map(float, input("Enter weight and profit: ").split())
    parcels.append((profit / weight, weight, profit))

capacity = float(input("Truck capacity: "))
parcels.sort(reverse=True)
total_profit = 0

for ratio, weight, profit in parcels:
    if capacity <= 0:
        break
    take = min(weight, capacity)
    total_profit += take * ratio
    capacity -= take

print("Maximum profit:", round(total_profit, 2))
