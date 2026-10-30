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

def inorder(root):
    if root:
        inorder(root.left)
        print(root.value, end=" ")
        inorder(root.right)

def preorder(root):
    if root:
        print(root.value, end=" ")
        preorder(root.left)
        preorder(root.right)

def postorder(root):
    if root:
        postorder(root.left)
        postorder(root.right)
        print(root.value, end=" ")

values = list(map(int, input("Enter integers: ").split()))
root = None
for value in values:
    root = insert(root, value)

print("Inorder:", end=" "); inorder(root)
print("\nPreorder:", end=" "); preorder(root)
print("\nPostorder:", end=" "); postorder(root)
print()
