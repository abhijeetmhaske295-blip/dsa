#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
};

Node* topNode = nullptr;

void push(int x) {
    Node* p = new Node{x, topNode};
    topNode = p;
}

void pop() {
    if (topNode == nullptr) {
        cout << "Stack underflow\n";
        return;
    }
    cout << "Popped: " << topNode->data << "\n";
    Node* temp = topNode;
    topNode = topNode->next;
    delete temp;
}

void display() {
    if (topNode == nullptr) {
        cout << "Stack is empty\n";
        return;
    }
    cout << "Stack: ";
    for (Node* p = topNode; p != nullptr; p = p->next)
        cout << p->data << " ";
    cout << "\n";
}

int main() {
    int choice, x;
    do {
        cout << "1.Push 2.Pop 3.Display 0.Exit: ";
        cin >> choice;
        if (choice == 1) { cout << "Value: "; cin >> x; push(x); }
        else if (choice == 2) pop();
        else if (choice == 3) display();
    } while (choice != 0);
    while (topNode != nullptr) pop();
    return 0;
}
