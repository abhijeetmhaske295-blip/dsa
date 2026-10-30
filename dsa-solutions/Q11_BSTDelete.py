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

def delete(root, key):
    if root is None:
        return None
    if key < root.value:
        root.left = delete(root.left, key)
    elif key > root.value:
        root.right = delete(root.right, key)
    else:
        if root.left is None:
            return root.right
        if root.right is None:
            return root.left
        successor = root.right
        while successor.left:
            successor = successor.left
        root.value = successor.value
        root.right = delete(root.right, successor.value)
    return root

def inorder(root):
    if root:
        inorder(root.left)
        print(root.value, end=" ")
        inorder(root.right)

values = list(map(int, input("Enter BST values: ").split()))
root = None
for value in values:
    root = insert(root, value)

key = int(input("Enter key to delete: "))
root = delete(root, key)
print("BST after deletion:", end=" ")
inorder(root)
print()
