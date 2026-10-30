class Node:
    def __init__(self, value):
        self.value = value
        self.left = self.right = None

def insert(root, value):
    if root is None:
        return Node(value)
    if value < root.value:
        root.left = insert(root.left, value)
    elif value > root.value:
        root.right = insert(root.right, value)
    return root

def search(root, key):
    if root is None or root.value == key:
        return root is not None
    if key < root.value:
        return search(root.left, key)
    return search(root.right, key)

values = list(map(int, input("Enter BST values: ").split()))
root = None
for value in values:
    root = insert(root, value)

key = int(input("Enter key to search: "))
print("Key is present" if search(root, key) else "Key is not present")
