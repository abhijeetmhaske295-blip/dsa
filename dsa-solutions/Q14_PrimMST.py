n = int(input("Number of vertices: "))
print("Enter adjacency matrix (0 means no edge):")
graph = [list(map(int, input().split())) for _ in range(n)]

selected = [False] * n
selected[0] = True
edges = []
total = 0

for _ in range(n - 1):
    best = float("inf")
    u = v = -1
    for i in range(n):
        if selected[i]:
            for j in range(n):
                if not selected[j] and graph[i][j] != 0 and graph[i][j] < best:
                    best = graph[i][j]
                    u, v = i, j
    if v == -1:
        print("Graph is disconnected; no spanning tree exists.")
        break
    selected[v] = True
    edges.append((u, v, best))
    total += best
else:
    print("Selected MST edges:")
    for u, v, w in edges:
        print(u, "-", v, ":", w)
    print("Total weight:", total)
