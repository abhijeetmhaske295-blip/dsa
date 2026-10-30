import heapq

maze = [
    [0, 0, 0, 0],
    [1, 1, 0, 1],
    [0, 0, 0, 0],
    [0, 1, 1, 0]
]
start = (0, 0)
goal = (3, 3)
rows, cols = len(maze), len(maze[0])

def heuristic(cell):
    return abs(cell[0] - goal[0]) + abs(cell[1] - goal[1])

pq = [(heuristic(start), 0, start)]
parent = {start: None}
cost = {start: 0}

while pq:
    _, g, current = heapq.heappop(pq)
    if g != cost[current]:
        continue
    if current == goal:
        break
    r, c = current
    for dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
        nr, nc = r + dr, c + dc
        nxt = (nr, nc)
        if (0 <= nr < rows and 0 <= nc < cols and maze[nr][nc] == 0):
            new_cost = g + 1
            if new_cost < cost.get(nxt, float("inf")):
                cost[nxt] = new_cost
                parent[nxt] = current
                heapq.heappush(pq, (new_cost + heuristic(nxt), new_cost, nxt))

if goal not in parent:
    print("No path exists")
else:
    path = []
    cell = goal
    while cell is not None:
        path.append(cell)
        cell = parent[cell]
    path.reverse()
    print("Path from start to goal:", path)
