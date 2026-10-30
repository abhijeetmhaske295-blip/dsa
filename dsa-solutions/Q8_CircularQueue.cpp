#include <iostream>
using namespace std;

const int SIZE = 5;
int q[SIZE], front = -1, rear = -1;

void enqueue(int x) {
    if ((rear + 1) % SIZE == front) {
        cout << "Queue is full\n";
        return;
    }
    if (front == -1) front = 0;
    rear = (rear + 1) % SIZE;
    q[rear] = x;
}

void dequeue() {
    if (front == -1) {
        cout << "Queue is empty\n";
        return;
    }
    cout << "Removed: " << q[front] << "\n";
    if (front == rear) front = rear = -1;
    else front = (front + 1) % SIZE;
}

void display() {
    if (front == -1) { cout << "Queue is empty\n"; return; }
    cout << "Queue: ";
    int i = front;
    while (true) {
        cout << q[i] << " ";
        if (i == rear) break;
        i = (i + 1) % SIZE;
    }
    cout << "\n";
}

int main() {
    int choice, x;
    do {
        cout << "1.Enqueue 2.Dequeue 3.Display 0.Exit: ";
        cin >> choice;
        if (choice == 1) { cout << "Value: "; cin >> x; enqueue(x); }
        else if (choice == 2) dequeue();
        else if (choice == 3) display();
    } while (choice != 0);
    return 0;
}
