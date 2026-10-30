def find(parent, x):
    if parent[x] != x:
        parent[x] = find(parent, parent[x])
    return parent[x]

def union(parent, rank, a, b):
    ra, rb = find(parent, a), find(parent, b)
    if ra == rb:
        return False
    if rank[ra] < rank[rb]:
        parent[ra] = rb
    elif rank[ra] > rank[rb]:
        parent[rb] = ra
    else:
        parent[rb] = ra
        rank[ra] += 1
    return True

n = int(input("Number of vertices: "))
names = input("Enter vertex names: ").split()
graph = {name: [] for name in names}
m = int(input("Number of edges: "))
edges = []
for _ in range(m):
    u, v, w = input("Enter edge (u v weight): ").split()
    w = int(w)
    graph[u].append((v, w))
    graph[v].append((u, w))
    edges.append((w, u, v))

parent = {name: name for name in names}
rank = {name: 0 for name in names}
total = 0
selected = []

for w, u, v in sorted(edges):
    if union(parent, rank, u, v):
        selected.append((u, v, w))
        total += w

if len(selected) != n - 1:
    print("Graph is disconnected; no spanning tree exists.")
else:
    print("Selected MST edges:")
    for u, v, w in selected:
        print(u, "-", v, ":", w)
    print("Total weight:", total)
