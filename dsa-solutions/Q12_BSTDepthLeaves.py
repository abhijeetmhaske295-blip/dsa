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

def depth(root):
    if root is None:
        return 0
    return 1 + max(depth(root.left), depth(root.right))

def leaves(root):
    if root:
        if root.left is None and root.right is None:
            print(root.value, end=" ")
        leaves(root.left)
        leaves(root.right)

values = list(map(int, input("Enter BST values: ").split()))
root = None
for value in values:
    root = insert(root, value)

print("Depth (number of levels):", depth(root))
print("Leaf nodes:", end=" ")
leaves(root)
print()
