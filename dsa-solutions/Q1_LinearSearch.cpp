#include <iostream>
#include <string>
using namespace std;

struct Student {
    int id;
    string name;
    float cgpa;
};

int main() {
    int n;
    cout << "Number of students: ";
    cin >> n;
    Student* students = new Student[n];
    for (int i = 0; i < n; i++) {
        cout << "Enter ID, name and CGPA: ";
        cin >> students[i].id >> students[i].name >> students[i].cgpa;
    }
    int key;
    cout << "Enter ID to search: ";
    cin >> key;
    int i;
    for (i = 0; i < n; i++) {
        if (students[i].id == key) {
            cout << "Found: " << students[i].id << " "
                 << students[i].name << " " << students[i].cgpa << "\n";
            break;
        }
    }
    if (i == n) cout << "Student not found\n";
    delete[] students;
    return 0;
}
