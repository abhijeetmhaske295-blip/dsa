from collections import deque

maze = [
    [0, 0, 0, 0],
    [1, 1, 0, 1],
    [0, 0, 0, 0],
    [0, 1, 1, 0]
]
start = (0, 0)
goal = (3, 3)
rows, cols = len(maze), len(maze[0])
queue = deque([start])
parent = {start: None}

while queue:
    r, c = queue.popleft()
    if (r, c) == goal:
        break
    for dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
        nr, nc = r + dr, c + dc
        cell = (nr, nc)
        if (0 <= nr < rows and 0 <= nc < cols and
            maze[nr][nc] == 0 and cell not in parent):
            parent[cell] = (r, c)
            queue.append(cell)

if goal not in parent:
    print("No path exists")
else:
    path = []
    cell = goal
    while cell is not None:
        path.append(cell)
        cell = parent[cell]
    path.reverse()
    print("Shortest path:", path)
    print("Path length (moves):", len(path) - 1)
